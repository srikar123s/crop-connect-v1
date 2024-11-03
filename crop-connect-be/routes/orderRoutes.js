const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

