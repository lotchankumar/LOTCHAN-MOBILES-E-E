import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { AppError } from '../middleware/error.middleware';
import { sendOTPEmail, sendOTPToAuthority, generateOTP } from '../utils/email';
import { auditLogService } from '../services/auditLog.service';

// ==================== SEED ADMIN ====================
export const seedAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "admin123";
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
    
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { branch: true } 
    });
    if (!user || !user.passwordHash) {
      throw new AppError('Invalid email or password', 401);
    }
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      // Log failed login attempt
      auditLogService.logAction({
        userId: user.id,
        action: 'LOGIN_FAILED',
        entity: 'User',
        entityId: user.id,
        details: JSON.stringify({ email, reason: 'Invalid password' }),
        branchId: user.branchId || undefined,
        ipAddress: req.ip,
      });
      throw new AppError('Invalid email or password', 401);
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Log successful login
    auditLogService.logAction({
      userId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      details: JSON.stringify({ email, role: user.role, branch: user.branch?.name }),
      branchId: user.branchId || undefined,
      ipAddress: req.ip,
    });
    
    res.json({
      token,
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role,
        branchId: user.branchId,
        branchName: user.branch?.name
      }
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
        select: { 
          id: true, 
          email: true, 
          name: true, 
          role: true,
          branchId: true,
          branch: { select: { name: true } }
        }
      });
      res.json({
        ...user,
        branchName: user?.branch?.name
      });
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
// ==================== UNIVERSAL FORGOT PASSWORD - REQUEST OTP ====================
// Staff/Technician → OTP sent to their branch manager
// Manager → OTP sent to the admin
export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) throw new AppError('Email is required', 400);

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        manager: { select: { id: true, name: true, email: true } },
        branch: { select: { name: true } },
      }
    });

    if (!user) throw new AppError('No account found with this email', 404);
    if (!user.isActive) throw new AppError('Your account is deactivated. Contact your manager.', 403);

    const otp = generateOTP(6);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Store OTP against the requesting user's email
    await prisma.passwordResetToken.create({ data: { email, otp, expiresAt } });

    let otpSentTo = '';
    let authorityLabel = '';

    if (user.role === 'STAFF' || user.role === 'TECHNICIAN') {
      // Find branch manager
      if (!user.manager) {
        // Fallback: try to find any manager in the same branch
        const branchManager = user.branchId
          ? await prisma.user.findFirst({
              where: { branchId: user.branchId, role: 'MANAGER' },
              select: { name: true, email: true }
            })
          : null;
        if (!branchManager) {
          throw new AppError('No manager assigned to your account. Contact your admin.', 400);
        }
        try {
          await sendOTPToAuthority({
            authorityEmail: branchManager.email,
            authorityName: branchManager.name,
            requesterEmail: user.email,
            requesterName: user.name,
            requesterRole: user.role,
            otp,
          });
        } catch (e) {
          console.error('Email send failed:', e);
          if (process.env.NODE_ENV !== 'production') console.log(`[DEV] OTP for ${email}: ${otp}`);
        }
        otpSentTo = branchManager.email;
        authorityLabel = 'your branch manager';
      } else {
        try {
          await sendOTPToAuthority({
            authorityEmail: user.manager.email,
            authorityName: user.manager.name,
            requesterEmail: user.email,
            requesterName: user.name,
            requesterRole: user.role,
            otp,
          });
        } catch (e) {
          console.error('Email send failed:', e);
          if (process.env.NODE_ENV !== 'production') console.log(`[DEV] OTP for ${email}: ${otp}`);
        }
        otpSentTo = user.manager.email;
        authorityLabel = 'your branch manager';
      }
    } else if (user.role === 'MANAGER') {
      // Find admin
      const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
        select: { name: true, email: true }
      });
      if (!admin) throw new AppError('No admin account found. Contact support.', 500);
      try {
        await sendOTPToAuthority({
          authorityEmail: admin.email,
          authorityName: admin.name,
          requesterEmail: user.email,
          requesterName: user.name,
          requesterRole: 'Manager',
          otp,
        });
      } catch (e) {
        console.error('Email send failed:', e);
        if (process.env.NODE_ENV !== 'production') console.log(`[DEV] OTP for ${email}: ${otp}`);
      }
      otpSentTo = admin.email;
      authorityLabel = 'the admin';
    } else if (user.role === 'ADMIN') {
      // Admin resets their own password — OTP goes to themselves
      try {
        await sendOTPEmail(email, otp);
      } catch (e) {
        console.error('Email send failed:', e);
        if (process.env.NODE_ENV !== 'production') console.log(`[DEV] OTP for ${email}: ${otp}`);
      }
      otpSentTo = email;
      authorityLabel = 'your email';
    }

    res.json({
      message: `OTP sent to ${authorityLabel}. Ask them for the code to continue.`,
      otpSentTo: otpSentTo.replace(/(.{3}).*(@.*)/, '$1***$2'), // partial mask
      role: user.role,
      expiresIn: '15 minutes'
    });
  } catch (error) {
    next(error);
  }
};

// ==================== UNIVERSAL VERIFY OTP ====================
export const verifyPasswordResetOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw new AppError('Email and OTP are required', 400);

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: { email, otp, isUsed: false },
      orderBy: { createdAt: 'desc' }
    });

    if (!resetToken) throw new AppError('Invalid OTP. Please check and try again.', 400);
    if (new Date() > resetToken.expiresAt) throw new AppError('OTP has expired. Please request a new one.', 400);

    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { isUsed: true }
    });

    const resetJwt = jwt.sign(
      { email, purpose: 'password-reset' },
      process.env.JWT_SECRET!,
      { expiresIn: '10m' }
    );

    res.json({ message: 'OTP verified. You may now set a new password.', resetToken: resetJwt, expiresIn: '10 minutes' });
  } catch (error) {
    next(error);
  }
};

// ==================== UNIVERSAL RESET PASSWORD ====================
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new AppError('Reset token is required', 401);
    if (!email || !newPassword || !confirmPassword) throw new AppError('All fields are required', 400);
    if (newPassword !== confirmPassword) throw new AppError('Passwords do not match', 400);
    if (newPassword.length < 8) throw new AppError('Password must be at least 8 characters', 400);

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      throw new AppError('Reset link has expired. Please request a new OTP.', 401);
    }

    if (decoded.email !== email || decoded.purpose !== 'password-reset') {
      throw new AppError('Invalid reset token', 401);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError('Account not found', 404);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { email }, data: { passwordHash: hashedPassword } });
    await prisma.passwordResetToken.deleteMany({ where: { email } });

    // Log password reset
    auditLogService.logAction({
      userId: user.id,
      action: 'PASSWORD_RESET',
      entity: 'User',
      entityId: user.id,
      details: JSON.stringify({ email, role: user.role }),
      branchId: user.branchId || undefined,
      ipAddress: req.ip,
    });

    res.json({ message: 'Password updated successfully. You can now log in with your new password.' });
  } catch (error) {
    next(error);
  }
};
