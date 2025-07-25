const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// WhatsApp Number (Twilio WhatsApp sandbox number or purchased number)
const fromWhatsAppNumber = '+12544544109';

// Endpoint to send WhatsApp message
router.post('/send-whatsapp', async (req, res) => {
    try {
        console.log(req.body);
        const { phoneNumber, orderId, orderDate, deliveryDate, orderItems } = req.body;

        // Construct the order items list
        let itemsList = orderItems.map(item => `${item.name} - ${item.quantity} x ${item.price}`).join('\n');
        // Construct the message body
       // const messageBody = `\nOrder conformation from Crop Connect\nOrder ID: ${orderId}\nOrder Date: ${orderDate}\nExpected Delivery Date: ${deliveryDate}\n\nItems:\n${itemsList}\n\nThank you for your purchase!`;
       const messageBody = `\nOrder conformation from Crop Connect\n\nExpected Delivery Date: ${deliveryDate}\nItems:\n${itemsList}\nThank you for your purchase!`;
        // Sending message
        const message = await client.messages.create({
            body: messageBody,
            from: fromWhatsAppNumber,
            to: `+91${phoneNumber}`
        });

        res.status(200).json({ success: true, message: 'message sent', sid: message.sid });
    } catch (error) {
        console.error('Error sending  message:', error);
        res.status(500).json({ success: false, message: 'Failed to send WhatsApp message', error: error.message });
    }
});



module.exports = router;