const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';  // Replace with your own secret

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword, method } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword, method: 'google' });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error); // Log the error details
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token: token, user: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/google', async (req, res) => {
    const { token } = req.body;
    const decoded = jwt.decode(token);
    const { name, email } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
        let user_google = new User({
            username: name,
            email,
            password: token,
            method: 'google'
        });
        user_google = await user_google.save();
        const jwt_token = jwt.sign({ userId: user_google._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token: jwt_token, user: email });
    }
    else {
        const jwt_token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: jwt_token, user: email });
    }
})

module.exports = router;
