import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; // Make sure this path is correct
import '@fortawesome/fontawesome-free/css/all.min.css';

const ConfirmationModal = ({ visible, onClose }) => {
    const [orderNumber, setOrderNumber] = useState('');
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext); // Get clearCart function from CartContext

    // Function to generate a random order number
    const generateOrderNumber = () => {
        return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
    };

    // Function to format date as DD MMM YYYY (e.g., 15 Jun 2023)
    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Set a random order number when the component mounts
    useEffect(() => {
        setOrderNumber(generateOrderNumber());
    }, []);

    const handleClose = () => {
        clearCart(); // Clear the cart
        onClose();   // Close the modal
        navigate('/'); // Navigate to home page
    };

    if (!visible) return null;

    const currentDate = new Date();
    const estimatedDelivery = new Date(currentDate);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h4 className="modal-title w-100 text-center text-success">
                            Order Confirmed!
                        </h4>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <div className="mb-4">
                            <i className="fas fa-check-circle text-success" style={{ fontSize: '48px' }}></i>
                            <h3 className="mt-3">Thank you for your order!</h3>
                            <p className="text-muted">Your order has been placed successfully.</p>
                        </div>

                        <div className="order-details p-4 bg-light rounded">
                            <div className="row">
                                <div className="col-md-6 text-start">
                                    <h5 className="mb-3">Order Details:</h5>
                                    <p><strong>Order Number:</strong> #{orderNumber}</p>
                                    <p><strong>Order Date:</strong> {formatDate(currentDate)}</p>
                                    <p><strong>Estimated Delivery:</strong> {formatDate(estimatedDelivery)}</p>
                                </div>
                                <div className="col-md-6 text-start">
                                    <h5 className="mb-3">Delivery Information:</h5>
                                    <p>You will receive an email confirmation with tracking details shortly.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button 
                                className="btn btn-success me-2" 
                                onClick={handleClose(orderNumber)}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;