const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();
const port = 5000;

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

// Twilio credentials

// Replace with your Twilio Account SID
 // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// WhatsApp Number (Twilio WhatsApp sandbox number or purchased number)
const fromWhatsAppNumber = 'whatsapp:+12523084794'; // Replace with your Twilio WhatsApp number

// Endpoint to send WhatsApp message
app.post('/api/send-whatsapp', async (req, res) => {
    try {
        const { phoneNumber, orderId, orderDate, deliveryDate, orderItems } = req.body;

        // Construct the order items list
        let itemsList = orderItems.map(item => `${item.name} - ${item.quantity} x $${item.price}`).join('\n');

        // Construct the message body
        const messageBody = `Order ID: ${orderId}\nOrder Date: ${orderDate}\nExpected Delivery Date: ${deliveryDate}\n\nItems:\n${itemsList}\n\nThank you for your purchase!`;

        // Sending WhatsApp message
        const message = await client.messages.create({
            body: messageBody,
            from: fromWhatsAppNumber,
            to: `whatsapp:+${phoneNumber}` // The customer's phone number with country code
        });

        res.status(200).json({ success: true, message: 'WhatsApp message sent', sid: message.sid });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).json({ success: false, message: 'Failed to send WhatsApp message', error: error.message });
    }
});



module.exports = router;