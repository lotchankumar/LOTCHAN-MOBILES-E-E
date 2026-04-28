"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postChatMessage = exports.createCommunityPost = exports.getCommunityPosts = exports.createBooking = exports.getBookings = exports.getProfile = exports.getProducts = exports.getCategories = exports.getBanners = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const existing = await prisma.customer.findFirst({
            where: { OR: [{ email }, { phone }] }
        });
        if (existing) {
            return res.status(400).json({ error: 'Email or phone already exists' });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await bcrypt_1.default.hash(password, salt);
        const customer = await prisma.customer.create({
            data: { name, email, phone, passwordHash }
        });
        const token = jsonwebtoken_1.default.sign({ id: customer.id, role: 'CUSTOMER' }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ token, user: { id: customer.id, name: customer.name, email: customer.email, role: 'CUSTOMER' } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await prisma.customer.findUnique({ where: { email } });
        if (!customer || !customer.passwordHash) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const valid = await bcrypt_1.default.compare(password, customer.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: customer.id, role: 'CUSTOMER' }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token, user: { id: customer.id, name: customer.name, email: customer.email, role: 'CUSTOMER' } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.login = login;
const getBanners = async (req, res) => {
    try {
        const banners = await prisma.banner.findMany({
            where: { isActive: true },
            orderBy: { displayOrder: 'asc' }
        });
        res.json(banners);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getBanners = getBanners;
const getCategories = async (req, res) => {
    try {
        const productCategories = await prisma.productCategory.findMany({ orderBy: { displayOrder: 'asc' } });
        const repairCategories = await prisma.repairCategory.findMany();
        res.json({ products: productCategories, repairs: repairCategories });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getCategories = getCategories;
const getProducts = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const whereClause = { isAvailable: true };
        if (categoryId) {
            whereClause.categoryId = String(categoryId);
        }
        const products = await prisma.product.findMany({
            where: whereClause,
            include: { category: true }
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getProducts = getProducts;
const getProfile = async (req, res) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: { id: req.user.id },
            include: {
                walletTransactions: { orderBy: { createdAt: 'desc' }, take: 10 },
                referrals: true
            }
        });
        if (!customer)
            return res.status(404).json({ error: 'Not found' });
        res.json({
            id: customer.id,
            full_name: customer.name,
            email: customer.email,
            phone: customer.phone,
            wallet_balance: customer.walletBalance,
            referral_code: customer.referralCode,
            wallet_transactions: customer.walletTransactions,
            referrals: customer.referrals
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getProfile = getProfile;
const getBookings = async (req, res) => {
    try {
        const bookings = await prisma.repairJob.findMany({
            where: { customerId: req.user.id },
            include: { repairCategory: true },
            orderBy: { createdAt: 'desc' }
        });
        const formatted = bookings.map(b => ({
            id: b.id,
            device_model: b.deviceModel,
            issue_description: b.issueDescription,
            status: b.status,
            final_price: b.finalCost || b.estimatedCost,
            repair_categories: b.repairCategory ? { name: b.repairCategory.name } : null,
            created_at: b.createdAt
        }));
        res.json(formatted);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getBookings = getBookings;
const createBooking = async (req, res) => {
    try {
        const { repairCategoryId, deviceModel, issueDescription, location } = req.body;
        const count = await prisma.repairJob.count();
        const ticketNumber = `REP${new Date().getFullYear()}${String(count + 1).padStart(4, '0')}`;
        const booking = await prisma.repairJob.create({
            data: {
                ticketNumber,
                customerId: req.user.id,
                repairCategoryId,
                deviceModel,
                issueDescription,
                location,
                status: 'RECEIVED'
            }
        });
        res.status(201).json(booking);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createBooking = createBooking;
const getCommunityPosts = async (req, res) => {
    try {
        const posts = await prisma.communityPost.findMany({
            include: { customer: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        });
        const formatted = posts.map(p => ({
            id: p.id,
            title: p.title,
            content: p.content,
            post_type: p.postType,
            likes_count: p.likesCount,
            created_at: p.createdAt,
            profiles: { full_name: p.customer.name }
        }));
        res.json(formatted);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getCommunityPosts = getCommunityPosts;
const createCommunityPost = async (req, res) => {
    try {
        const { title, content, type } = req.body;
        const post = await prisma.communityPost.create({
            data: {
                userId: req.user.id,
                title,
                content,
                postType: type
            }
        });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createCommunityPost = createCommunityPost;
const postChatMessage = async (req, res) => {
    try {
        const { message, isUser } = req.body;
        await prisma.chatMessage.create({
            data: {
                userId: req.user.id,
                message,
                isUser
            }
        });
        res.status(201).json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.postChatMessage = postChatMessage;
//# sourceMappingURL=customer.controller.js.map