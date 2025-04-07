const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes =  require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const whatRoutes = require('./routes/whatRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth',  userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/twilio',whatRoutes);




module.exports = app;
