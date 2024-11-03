const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    orderId: {type:String, required:true},
    orderDate: {type:String, required:true},
    deliveryDate: {type:String, required:true},
    orderStatus: {type:String, required:true},
    orderItems: {type:Array, required:true},

});

module.exports = mongoose.model('Order', orderSchema);
