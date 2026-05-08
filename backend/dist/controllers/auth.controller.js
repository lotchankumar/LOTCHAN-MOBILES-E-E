"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyPasswordResetOTP = exports.requestPasswordReset = exports.resetAdminPassword = exports.verifyAdminOTP = exports.requestAdminPasswordReset = exports.getProfile = exports.staffLogin = exports.customerLogin = exports.customerRegister = exports.seedAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
const email_1 = require("../utils/email");
const auditLog_service_1 = require("../services/auditLog.service");
// ==================== SEED ADMIN ====================
const seedAdmin = async (req, res, next) => {
    try {
        const email = process.env.ADMIN_EMAIL || "admin@example.com";
        const password = process.env.ADMIN_PASSWORD || "admin123";
        const name = "Lotchan Mobiles";
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await client_1.default.user.upsert({
            where: { email },
            update: { passwordHash: hashedPassword, role: 'ADMIN', name },
            create: { email, passwordHash: hashedPassword, name, role: 'ADMIN' }
        });
        res.json({ message: 'Admin seeded successfully', admin: { email, role: 'ADMIN' } });
    }
    catch (error) {
        next(error);
    }
};
exports.seedAdmin = seedAdmin;
// ==================== CUSTOMER REGISTER ====================
const customerRegister = async (req, res, next) => {
    try {
        const { email, password, name, phone } = req.body;
        const existing = await client_1.default.customer.findFirst({
            where: { OR: [{ email }, { phone }] }
        });
        if (existing) {
            throw new error_middleware_1.AppError('Customer with email or phone already exists', 400);
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        // Generate unique referral code
        let referralCode = '';
        let exists = true;
        while (exists) {
            referralCode = 'LOT' + Math.random().toString(36).substring(2, 8).toUpperCase();
            const existing = await client_1.default.customer.findUnique({
                where: { referralCode }
            });
            exists = !!existing;
        }
        const customer = await client_1.default.customer.create({
            data: { email, phone, name, passwordHash, referralCode }
        });
        const token = jsonwebtoken_1.default.sign({ id: customer.id, email: customer.email, role: 'CUSTOMER' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            message: 'Customer registered successfully',
            token,
            user: { id: customer.id, email: customer.email, name: customer.name, role: 'CUSTOMER' }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.customerRegister = customerRegister;
// ==================== CUSTOMER LOGIN ====================
const customerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const customer = await client_1.default.customer.findUnique({ where: { email } });
        if (!customer || !customer.passwordHash) {
            throw new error_middleware_1.AppError('Invalid email or password', 401);
        }
        const isValid = await bcryptjs_1.default.compare(password, customer.passwordHash);
        if (!isValid) {
            throw new error_middleware_1.AppError('Invalid email or password', 401);
        }
        const token = jsonwebtoken_1.default.sign({ id: customer.id, email: customer.email, role: 'CUSTOMER' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            token,
            user: { id: customer.id, email: customer.email, name: customer.name, role: 'CUSTOMER' }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.customerLogin = customerLogin;
// ==================== STAFF LOGIN ====================
const staffLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await client_1.default.user.findUnique({
            where: { email },
            include: { branch: true }
        });
        if (!user || !user.passwordHash) {
            throw new error_middleware_1.AppError('Invalid email or password', 401);
        }
        const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            // Log failed login attempt
            auditLog_service_1.auditLogService.logAction({
                userId: user.id,
                action: 'LOGIN_FAILED',
                entity: 'User',
                entityId: user.id,
                details: JSON.stringify({ email, reason: 'Invalid password' }),
                branchId: user.branchId || undefined,
                ipAddress: req.ip,
            });
            throw new error_middleware_1.AppError('Invalid email or password', 401);
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        // Log successful login
        auditLog_service_1.auditLogService.logAction({
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
    }
    catch (error) {
        next(error);
    }
};
exports.staffLogin = staffLogin;
// ==================== GET PROFILE ====================
const getProfile = async (req, res, next) => {
    try {
        const { id, role } = req.user;
        if (role === 'CUSTOMER') {
            const customer = await client_1.default.customer.findUnique({
                where: { id },
                select: { id: true, email: true, name: true, phone: true, walletBalance: true }
            });
            res.json({ ...customer, role: 'CUSTOMER' });
        }
        else {
            const user = await client_1.default.user.findUnique({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
// ==================== ADMIN PASSWORD RESET - REQUEST OTP ====================
const requestAdminPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new error_middleware_1.AppError('Email is required', 400);
        }
        // Verify that the email belongs to an admin user
        const admin = await client_1.default.user.findUnique({
            where: { email }
        });
        if (!admin || admin.role !== 'ADMIN') {
            throw new error_middleware_1.AppError('Admin user not found', 400);
        }
        // Generate OTP (6 digits)
        const otp = (0, email_1.generateOTP)(6);
        // Calculate expiration time (15 minutes from now)
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        // Store OTP in database
        await client_1.default.passwordResetToken.create({
            data: {
                email,
                otp,
                expiresAt
            }
        });
        // Send OTP via email
        try {
            await (0, email_1.sendOTPEmail)(email, otp);
        }
        catch (emailError) {
            console.error('Email sending failed:', emailError);
            // In development mode, we'll still allow the reset process
            if (process.env.NODE_ENV === 'production') {
                throw new error_middleware_1.AppError('Failed to send OTP email. Please try again.', 500);
            }
        }
        res.json({
            message: 'OTP sent successfully to your email',
            email: email,
            expiresIn: '15 minutes'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.requestAdminPasswordReset = requestAdminPasswordReset;
// ==================== ADMIN PASSWORD RESET - VERIFY OTP ====================
const verifyAdminOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            throw new error_middleware_1.AppError('Email and OTP are required', 400);
        }
        // Find the OTP token
        const resetToken = await client_1.default.passwordResetToken.findFirst({
            where: {
                email,
                otp,
                isUsed: false
            },
            orderBy: { createdAt: 'desc' }
        });
        if (!resetToken) {
            throw new error_middleware_1.AppError('Invalid OTP', 400);
        }
        // Check if OTP has expired
        if (new Date() > resetToken.expiresAt) {
            throw new error_middleware_1.AppError('OTP has expired. Please request a new one.', 400);
        }
        // Mark OTP as used
        await client_1.default.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { isUsed: true }
        });
        // Generate a temporary reset token (valid for 10 minutes)
        const resetToken_jwt = jsonwebtoken_1.default.sign({ email, purpose: 'password-reset' }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.json({
            message: 'OTP verified successfully',
            resetToken: resetToken_jwt,
            expiresIn: '10 minutes'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyAdminOTP = verifyAdminOTP;
// ==================== ADMIN PASSWORD RESET - SET NEW PASSWORD ====================
const resetAdminPassword = async (req, res, next) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        const resetToken = req.headers.authorization?.split(' ')[1];
        if (!resetToken) {
            throw new error_middleware_1.AppError('Reset token is required', 401);
        }
        if (!email || !newPassword || !confirmPassword) {
            throw new error_middleware_1.AppError('Email, new password, and confirm password are required', 400);
        }
        if (newPassword !== confirmPassword) {
            throw new error_middleware_1.AppError('Passwords do not match', 400);
        }
        // Validate password strength
        if (newPassword.length < 8) {
            throw new error_middleware_1.AppError('Password must be at least 8 characters long', 400);
        }
        try {
            // Verify the reset token
            const decoded = jsonwebtoken_1.default.verify(resetToken, process.env.JWT_SECRET);
            if (decoded.email !== email || decoded.purpose !== 'password-reset') {
                throw new error_middleware_1.AppError('Invalid reset token', 401);
            }
        }
        catch (err) {
            throw new error_middleware_1.AppError('Invalid or expired reset token', 401);
        }
        // Verify that the email belongs to an admin user
        const admin = await client_1.default.user.findUnique({
            where: { email }
        });
        if (!admin || admin.role !== 'ADMIN') {
            throw new error_middleware_1.AppError('Admin user not found', 400);
        }
        // Hash the new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update the password
        await client_1.default.user.update({
            where: { email },
            data: { passwordHash: hashedPassword }
        });
        // Clean up old reset tokens for this email
        await client_1.default.passwordResetToken.deleteMany({
            where: { email }
        });
        res.json({
            message: 'Password reset successfully',
            email
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetAdminPassword = resetAdminPassword;
// ==================== UNIVERSAL FORGOT PASSWORD - REQUEST OTP ====================
// Staff/Technician → OTP sent to their branch manager
// Manager → OTP sent to the admin
const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            throw new error_middleware_1.AppError('Email is required', 400);
        const user = await client_1.default.user.findUnique({
            where: { email },
            include: {
                manager: { select: { id: true, name: true, email: true } },
                branch: { select: { name: true } },
            }
        });
        if (!user)
            throw new error_middleware_1.AppError('No account found with this email', 404);
        if (!user.isActive)
            throw new error_middleware_1.AppError('Your account is deactivated. Contact your manager.', 403);
        const otp = (0, email_1.generateOTP)(6);
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        // Store OTP against the requesting user's email
        await client_1.default.passwordResetToken.create({ data: { email, otp, expiresAt } });
        let otpSentTo = '';
        let authorityLabel = '';
        if (user.role === 'STAFF' || user.role === 'TECHNICIAN') {
            // Find branch manager
            if (!user.manager) {
                // Fallback: try to find any manager in the same branch
                const branchManager = user.branchId
                    ? await client_1.default.user.findFirst({
                        where: { branchId: user.branchId, role: 'MANAGER' },
                        select: { name: true, email: true }
                    })
                    : null;
                if (!branchManager) {
                    throw new error_middleware_1.AppError('No manager assigned to your account. Contact your admin.', 400);
                }
                try {
                    await (0, email_1.sendOTPToAuthority)({
                        authorityEmail: branchManager.email,
                        authorityName: branchManager.name,
                        requesterEmail: user.email,
                        requesterName: user.name,
                        requesterRole: user.role,
                        otp,
                    });
                }
                catch (e) {
                    console.error('Email send failed:', e);
                    if (process.env.NODE_ENV !== 'production')
                        console.log(`[DEV] OTP for ${email}: ${otp}`);
                }
                otpSentTo = branchManager.email;
                authorityLabel = 'your branch manager';
            }
            else {
                try {
                    await (0, email_1.sendOTPToAuthority)({
                        authorityEmail: user.manager.email,
                        authorityName: user.manager.name,
                        requesterEmail: user.email,
                        requesterName: user.name,
                        requesterRole: user.role,
                        otp,
                    });
                }
                catch (e) {
                    console.error('Email send failed:', e);
                    if (process.env.NODE_ENV !== 'production')
                        console.log(`[DEV] OTP for ${email}: ${otp}`);
                }
                otpSentTo = user.manager.email;
                authorityLabel = 'your branch manager';
            }
        }
        else if (user.role === 'MANAGER') {
            // Find admin
            const admin = await client_1.default.user.findFirst({
                where: { role: 'ADMIN' },
                select: { name: true, email: true }
            });
            if (!admin)
                throw new error_middleware_1.AppError('No admin account found. Contact support.', 500);
            try {
                await (0, email_1.sendOTPToAuthority)({
                    authorityEmail: admin.email,
                    authorityName: admin.name,
                    requesterEmail: user.email,
                    requesterName: user.name,
                    requesterRole: 'Manager',
                    otp,
                });
            }
            catch (e) {
                console.error('Email send failed:', e);
                if (process.env.NODE_ENV !== 'production')
                    console.log(`[DEV] OTP for ${email}: ${otp}`);
            }
            otpSentTo = admin.email;
            authorityLabel = 'the admin';
        }
        else if (user.role === 'ADMIN') {
            // Admin resets their own password — OTP goes to themselves
            try {
                await (0, email_1.sendOTPEmail)(email, otp);
            }
            catch (e) {
                console.error('Email send failed:', e);
                if (process.env.NODE_ENV !== 'production')
                    console.log(`[DEV] OTP for ${email}: ${otp}`);
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
    }
    catch (error) {
        next(error);
    }
};
exports.requestPasswordReset = requestPasswordReset;
// ==================== UNIVERSAL VERIFY OTP ====================
const verifyPasswordResetOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp)
            throw new error_middleware_1.AppError('Email and OTP are required', 400);
        const resetToken = await client_1.default.passwordResetToken.findFirst({
            where: { email, otp, isUsed: false },
            orderBy: { createdAt: 'desc' }
        });
        if (!resetToken)
            throw new error_middleware_1.AppError('Invalid OTP. Please check and try again.', 400);
        if (new Date() > resetToken.expiresAt)
            throw new error_middleware_1.AppError('OTP has expired. Please request a new one.', 400);
        await client_1.default.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { isUsed: true }
        });
        const resetJwt = jsonwebtoken_1.default.sign({ email, purpose: 'password-reset' }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.json({ message: 'OTP verified. You may now set a new password.', resetToken: resetJwt, expiresIn: '10 minutes' });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyPasswordResetOTP = verifyPasswordResetOTP;
// ==================== UNIVERSAL RESET PASSWORD ====================
const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            throw new error_middleware_1.AppError('Reset token is required', 401);
        if (!email || !newPassword || !confirmPassword)
            throw new error_middleware_1.AppError('All fields are required', 400);
        if (newPassword !== confirmPassword)
            throw new error_middleware_1.AppError('Passwords do not match', 400);
        if (newPassword.length < 8)
            throw new error_middleware_1.AppError('Password must be at least 8 characters', 400);
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch {
            throw new error_middleware_1.AppError('Reset link has expired. Please request a new OTP.', 401);
        }
        if (decoded.email !== email || decoded.purpose !== 'password-reset') {
            throw new error_middleware_1.AppError('Invalid reset token', 401);
        }
        const user = await client_1.default.user.findUnique({ where: { email } });
        if (!user)
            throw new error_middleware_1.AppError('Account not found', 404);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await client_1.default.user.update({ where: { email }, data: { passwordHash: hashedPassword } });
        await client_1.default.passwordResetToken.deleteMany({ where: { email } });
        // Log password reset
        auditLog_service_1.auditLogService.logAction({
            userId: user.id,
            action: 'PASSWORD_RESET',
            entity: 'User',
            entityId: user.id,
            details: JSON.stringify({ email, role: user.role }),
            branchId: user.branchId || undefined,
            ipAddress: req.ip,
        });
        res.json({ message: 'Password updated successfully. You can now log in with your new password.' });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.controller.js.map