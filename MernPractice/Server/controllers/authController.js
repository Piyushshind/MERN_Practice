const User = require('../models/User');
const { signAccessToken } = require('../utils/jwt');

const setTokenCookie = (res, token) => {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie(process.env.COOKIE_NAME || 'access_token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24, // 1 day cookie (token inside still expires per JWT)
    });
};

// POST /api/auth/register
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, role }); // role optional; only admins should create admins in real apps
    const token = signAccessToken({ sub: user._id, role: user.role });
    setTokenCookie(res, token);
    res.status(201).json({ user });
};
 
// POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signAccessToken({ sub: user._id, role: user.role });
    setTokenCookie(res, token);
    res.json({ user });
};

// GET /api/auth/me
const me = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ user });
};

// POST /api/auth/logout
const logout = async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME || 'access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.json({ message: 'Logged out' });
};

module.exports = { register, login, me, logout };
