import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { AppError } from '../middleware/error.middleware';
import { sendOTPEmail, generateOTP } from '../utils/email';

// ==================== SEED ADMIN ====================
export const seedAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = "lotchansm1612@gmail.com";
    const password = "MSLMlk$2402";
    const name = "Lotchan Mobiles";
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await prisma.user.upsert({
      where: { email },
      update: { passwordHash: hashedPassword, role: 'ADMIN', name },
      create: { email, passwordHash: hashedPassword, name, role: 'ADMIN' }
    });
    
    res.json({ message: 'Admin seeded successfully', admin: { email, role: 'ADMIN' } });
  } catch (error) {
    next(error);
  }
};

// ==================== CUSTOMER REGISTER ====================
export const customerRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, phone } = req.body;
    
    const existing = await prisma.customer.findFirst({
      where: { OR: [{ email }, { phone }] }
    });
    
    if (existing) {
      throw new AppError('Customer with email or phone already exists', 400);
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Generate unique referral code
    let referralCode = '';
    let exists = true;
    while (exists) {
      referralCode = 'LOT' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const existing = await prisma.customer.findUnique({
        where: { referralCode }
      });
      exists = !!existing;
    }
    
    const customer = await prisma.customer.create({
      data: { email, phone, name, passwordHash, referralCode }
    });
    
    const token = jwt.sign(
      { id: customer.id, email: customer.email, role: 'CUSTOMER' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'Customer registered successfully',
      token,
      user: { id: customer.id, email: customer.email, name: customer.name, role: 'CUSTOMER' }
    });
  } catch (error) {
    next(error);
  }
};

// ==================== CUSTOMER LOGIN ====================
export const customerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer || !customer.passwordHash) {
      throw new AppError('Invalid email or password', 401);
    }
    
    const isValid = await bcrypt.compare(password, customer.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid email or password', 401);
    }
    
    const token = jwt.sign(
      { id: customer.id, email: customer.email, role: 'CUSTOMER' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: { id: customer.id, email: customer.email, name: customer.name, role: 'CUSTOMER' }
    });
  } catch (error) {
    next(error);
  }
};

// ==================== STAFF LOGIN ====================
export const staffLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      throw new AppError('Invalid email or password', 401);
    }
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid email or password', 401);
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

// ==================== GET PROFILE ====================
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = (req as any).user;
    
    if (role === 'CUSTOMER') {
      const customer = await prisma.customer.findUnique({
        where: { id },
        select: { id: true, email: true, name: true, phone: true, walletBalance: true }
      });
      res.json({ ...customer, role: 'CUSTOMER' });
    } else {
      const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, name: true, role: true }
      });
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

// ==================== ADMIN PASSWORD RESET - REQUEST OTP ====================
export const requestAdminPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required', 400);
    }

    // Verify that the email belongs to an admin user
    const admin = await prisma.user.findUnique({
      where: { email }
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new AppError('Admin user not found', 400);
    }

    // Generate OTP (6 digits)
    const otp = generateOTP(6);
    
    // Calculate expiration time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Store OTP in database
    await prisma.passwordResetToken.create({
      data: {
        email,
        otp,
        expiresAt
      }
    });

    // Send OTP via email
    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // In development mode, we'll still allow the reset process
      if (process.env.NODE_ENV === 'production') {
        throw new AppError('Failed to send OTP email. Please try again.', 500);
      }
    }

    res.json({
      message: 'OTP sent successfully to your email',
      email: email,
      expiresIn: '15 minutes'
    });
  } catch (error) {
    next(error);
  }
};

// ==================== ADMIN PASSWORD RESET - VERIFY OTP ====================
export const verifyAdminOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new AppError('Email and OTP are required', 400);
    }

    // Find the OTP token
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
        otp,
        isUsed: false
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!resetToken) {
      throw new AppError('Invalid OTP', 400);
    }

    // Check if OTP has expired
    if (new Date() > resetToken.expiresAt) {
      throw new AppError('OTP has expired. Please request a new one.', 400);
    }

    // Mark OTP as used
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { isUsed: true }
    });

    // Generate a temporary reset token (valid for 10 minutes)
    const resetToken_jwt = jwt.sign(
      { email, purpose: 'password-reset' },
      process.env.JWT_SECRET!,
      { expiresIn: '10m' }
    );

    res.json({
      message: 'OTP verified successfully',
      resetToken: resetToken_jwt,
      expiresIn: '10 minutes'
    });
  } catch (error) {
    next(error);
  }
};

// ==================== ADMIN PASSWORD RESET - SET NEW PASSWORD ====================
export const resetAdminPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const resetToken = req.headers.authorization?.split(' ')[1];

    if (!resetToken) {
      throw new AppError('Reset token is required', 401);
    }

    if (!email || !newPassword || !confirmPassword) {
      throw new AppError('Email, new password, and confirm password are required', 400);
    }

    if (newPassword !== confirmPassword) {
      throw new AppError('Passwords do not match', 400);
    }

    // Validate password strength
    if (newPassword.length < 8) {
      throw new AppError('Password must be at least 8 characters long', 400);
    }

    try {
      // Verify the reset token
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET!) as any;
      
      if (decoded.email !== email || decoded.purpose !== 'password-reset') {
        throw new AppError('Invalid reset token', 401);
      }
    } catch (err) {
      throw new AppError('Invalid or expired reset token', 401);
    }

    // Verify that the email belongs to an admin user
    const admin = await prisma.user.findUnique({
      where: { email }
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new AppError('Admin user not found', 400);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await prisma.user.update({
      where: { email },
      data: { passwordHash: hashedPassword }
    });

    // Clean up old reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email }
    });

    res.json({
      message: 'Password reset successfully',
      email
    });
  } catch (error) {
    next(error);
  }
};
