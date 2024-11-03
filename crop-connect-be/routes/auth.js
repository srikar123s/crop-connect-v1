const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';  // Replace with your own secret

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
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

        res.status(200).json({ token:  token, user: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/google', async(req,res)=>{
    const {token}=req.body;
    console.log(token)
    const decoded = jwt.decode(token);
    console.log(decoded);
    console.log(decoded.name);
    const {name, email} =  decoded;
    const user = await User.findOne({email});
    if(!user){
        let user = new User({
            username: name, 
            email, 
            password: token,
            method: 'google' // Adding method field as required by User schema
        });
        user = await user.save();
    }
    const jwt_token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'1h'});
    res.status(200).json({token:jwt_token,user:email});
})

module.exports = router;
