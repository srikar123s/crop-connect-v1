const mongoose = require('mongoose');
require("dotenv").config(); // Ensure .env is loaded

const connectDB = async () => {
    try {
        console.log("MONGO_URI from .env:", process.env.MONGO_URI); // Debugging

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is undefined! Check your .env file.");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
