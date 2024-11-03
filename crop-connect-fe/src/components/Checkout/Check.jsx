// Checkout.js
import React, { useState, useEffect, useContext } from 'react';
import './Check.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import products from '../data/products.json';
import { Link } from 'react-router-dom';
import CartModal from '../commons/CartModal';
import { CartContext } from '../../context/CartContext';
import images from '../../Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faTrash, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from './ConfirmationModal';


function Check() {
    const navigate = useNavigate();
    const { cartItems, addToCart, changeQuantity, removeItem, clearCart } = useContext(CartContext);
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(prev => !prev);
    };
    const totalAmount = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return total + price * item.quantity;
    }, 0);
    const deliveryCharge = totalAmount>=1000 || cartItems.length<1 ? 0 : 50;
    useEffect(() => {
        if(cartItems.length<=0){
            navigate('/');
        }
    }, [cartItems]);

    function validateForm() {
        let isValid = true;
    
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            clearError(name);
        }
    
        const mobile = document.getElementById('mobile');
        if (!/^[0-9]{10}$/.test(mobile.value)) {
            showError(mobile, 'Please enter a valid 10-digit mobile number');
            isValid = false;
        } else {
            clearError(mobile);
        }
    
        const pincode = document.getElementById('pincode');
        if (!/^[0-9]{6}$/.test(pincode.value)) {
            showError(pincode, 'Please enter a valid 6-digit pincode');
            isValid = false;
        } else {
            clearError(pincode);
        }
    
        const address = document.getElementById('address');
        if (address.value.trim() === '') {
            showError(address, 'Address is required');
            isValid = false;
        } else {
            clearError(address);
        }
    
        const area = document.getElementById('area');
        if (area.value.trim() === '') {
            showError(area, 'Area is required');
            isValid = false;
        } else {
            clearError(area);
        }
    
        const town = document.getElementById('town');
        if (town.value.trim() === '') {
            showError(town, 'Town is required');
            isValid = false;
        } else {
            clearError(town);
        }
    
        const state = document.getElementById('state');
        if (state.value.trim() === '') {
            showError(state, 'State is required');
            isValid = false;
        } else {
            clearError(state);
        }
    
        return isValid;
    }
    
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        input.className = 'form-control is-invalid';
    }
    
    // Function to clear error messages
    function clearError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
        input.className = 'form-control';
    }

    const [showCheckoutLayout, setShowCheckoutLayout] = useState(true);
const [showPaymentMethods, setShowPaymentMethods] = useState(false);
const [showReviewSection, setShowReviewSection] = useState(false);

// Then update the functions like this:
function proceedToPayment() {
    if (validateForm()) {
        setShowCheckoutLayout(false);
        setShowPaymentMethods(true);
    } else {
        alert('Please fill in all required fields correctly.');
    }
}

function makePayment() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert('Please select a payment method.');
        return;
    }
    setShowPaymentMethods(false);
    setShowReviewSection(true);
}

    function proceedToPayment() {
        if (validateForm()) {
            // Hide checkout form section
            const checkoutLayout = document.querySelector('.checkout-layout');
            if (checkoutLayout) {
                checkoutLayout.style.display = 'none';
            }
    
            // Show payment methods section
            const paymentMethods = document.getElementById('payment-methods');
            if (paymentMethods) {
                paymentMethods.style.display = 'block';
            }
    
            // Update progress steps
            const steps = document.querySelectorAll('.checkout-progress .step');
            steps.forEach((step, index) => {
                if (index === 0) {
                    step.classList.remove('active');
                }
                if (index === 1) {
                    step.classList.add('active');
                }
            });
        } else {
            alert('Please fill in all required fields correctly.');
        }
    }

    function makePayment() {
        // Verify payment method is selected
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            alert('Please select a payment method.');
            return;
        }
    
        // Hide payment methods section
        const paymentMethods = document.getElementById('payment-methods');
        if (paymentMethods) {
            paymentMethods.style.display = 'none';
        }
    
        // Show review section
        const reviewSection = document.getElementById('review-section');
        if (reviewSection) {
            reviewSection.style.display = 'block';
        }
    
        // Populate order summary with images
        const orderSummaryItems = document.getElementById('order-summary-items');
        orderSummaryItems.innerHTML = ''; // Clear previous items
        // Update progress steps
        const steps = document.querySelectorAll('.checkout-progress .step');
            steps.forEach((step, index) => {
                if (index === 1) {
                    step.classList.remove('active');
                }
                if (index === 2) {
                    step.classList.add('active');
                }
            });
    }
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    
    return (
        <div>
            {/* Header Section */}
            <header className="py-3 bg-light text-black">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/" className="navbar-brand">
                            <img src={images['logo']} alt="Crop Connect Logo" width="50" /> <b>Crop Connect</b>
                        </Link>
                        <nav>
                            <ul className="nav">
                                <button className="btn nav-item" onClick={() => navigate('/')}>Home</button>
                                <button className="btn nav-item" onClick={() => { navigate('/seeds') }}>Seeds</button>
                                <button className="btn nav-item" onClick={() => navigate('/fer')}>Fertilizers</button>
                                <button className="btn nav-item" onClick={() => navigate('/tools')}>Tools</button>
                            </ul>
                        </nav>

                        <div className="icon d-flex align-items-center">
                            <a href="#" className="position-relative me-3" >
                                <FontAwesomeIcon icon={faShoppingCart} id='cart-btn' style={{ cursor: 'pointer' }} />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            </a>

                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div class="pcontainer">
                    <div class="checkout-progress">
                        <div class="step active">1. Shipping Info</div>
                        <div class="step">2. Payment</div>
                        <div class="step">3. Review</div>
                    </div>

                    <div class="checkout-layout">
                        <div class="checkout-form">
                            <h2>Shipping Information</h2>
                            <form id="checkout-form">
                                <label for="country">Country/Region</label>
                                <select id="country" required>
                                    <option value="India" selected>India</option>
                                </select>

                                <label for="name">Full Name (First and Last Name)</label>
                                <input type="text" id="name" required />

                                <label for="mobile">Mobile Number</label>
                                <input type="tel" id="mobile" required placeholder="10-digit number" title="Please enter a 10-digit mobile number" />

                                <label for="pincode">Pincode</label>
                                <input type="text" id="pincode" required placeholder="6-digit PIN code" title="Please enter a 6-digit PIN code" />

                                <label for="address">Flat, House no., Building, Company, Apartment</label>
                                <input type="text" id="address" required />

                                <label for="area">Area, Street, Sector, Village</label>
                                <input type="text" id="area" required />

                                <label for="landmark">Landmark</label>
                                <input type="text" id="landmark" placeholder="E.g. near Apollo Hospital" />

                                <label for="town">Town/City</label>
                                <input type="text" id="town" required />

                                <label for="state">State</label>
                                <select id="state" required>
                                    <option value="" disabled selected>Choose a state</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                </select>

                                <button type="button" id="proceed-button" onClick={() => proceedToPayment()}>Proceed to Payment</button>

                            </form>
                        </div>

                        <div class="order-summary">
                            <h2>Order Summary</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="cart-items"></tbody>
                                {
                                    cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={images[item.image]}
                                                        alt={item.name}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                                    />
                                                    <span>{item.name}</span>
                                                </div>

                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center">
                                                    <button className="btn btn-sm btn-secondary me-2" onClick={() => changeQuantity(item.id, -1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => changeQuantity(item.id, 1)}>+</button>
                                                </div>
                                            </td>
                                            <td className="align-middle">₹{parseFloat(item.price.replace(/[^\d.]/g, ''))}</td>
                                            <td className="align-middle">₹{parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity}</td>
                                            <td className="align-middle">
                                                <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td>
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Subtotal :</td>
                                    <td id="cart-total">₹{totalAmount}</td>
                                </tr>
                                <tr>
                                    <td>Delivery Charge :</td>
                                    <td id="delivery-charge">₹{deliveryCharge}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Amount :</strong></td>
                                    <td id="final-amount"><strong>₹{totalAmount+deliveryCharge}</strong></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="payment-methods" id="payment-methods">
                <h2> Payment Method</h2>

                <div class="payment-method">
                    <input type="radio" id="credit-debit" name="payment" value="credit-debit" />
                    <label for="credit-debit">Credit or debit card <br />
                        <img src={images['visa']} alt="Visa" width="30" /> 
                        <img src={images['master']} alt="MasterCard" width="30" />                         
                        <img src={images['rupay']} alt="RuPay" width="30" />
                    </label>
                </div>
<br />
                <div class="payment-method">
                    <input type="radio" id="net-banking" name="payment" value="net-banking" />
                    <label for="net-banking">Net Banking <br />
                        <img src={images['ic']} alt="ICICI Bank" width="30" /> 
                        <img src={images['hd']} alt="HDFC Bank" width="30" /> 
                        <img src={images['ax']} alt="Axis Bank" width="30" /> 
                        <img src={images['sbi']} alt="SBI" width="30" />
                    </label>
                </div>
<br />
                <div class="payment-method">
                    <input type="radio" id="wallet" name="payment" value="wallet" />
                    <label for="wallet">Wallet <br/>
                        <img src={images['pap']} alt="Paytm" width="30" /> 
                        <img src={images['pp']} alt="PhonePe" width="30" /> 
                        <img src={images['gp']} alt="Google Pay" width="30" />
                    </label>
                </div>
<br/>
                <div class="payment-method">
                    <input type="radio" id="cod" name="payment" value="cod" />
                    <label for="net-banking">Cash On Delivery <br/>
                        <img src={images['cod']} alt="cod" width="30" />
                        
                    </label>
                </div>

                <button class="use-payment" id="proceed-payment" onClick={() => makePayment()}>use this Payment Method</button>
            </div>

               <div class="review-section" id="review-section" style={{"display":'none'}}>
                <h2>Review Your Order</h2>
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>                                
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id="order-summary-items"></tbody>
                        {
                                    cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={images[item.image]}
                                                        alt={item.name}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                                    />
                                                    <span>{item.name}</span>
                                                </div>

                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center">
                                                   
                                                    <span>{item.quantity}</span>
                                                    
                                                </div>
                                            </td>
                                            <td className="align-middle">₹{parseFloat(item.price.replace(/[^\d.]/g, ''))}</td>
                                            <td className="align-middle">₹{parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity}</td>
                                            
                                        </tr>
                                    ))
                                }
                    </table>
                    <h5>Delivery Date: <strong id="delivery-date">{deliveryDate.toDateString()}</strong></h5>
                    <h5>Total Amount: <b id="final-amount-review">₹{totalAmount+deliveryCharge}</b></h5>
                </div>
                <br/>
                <button id="confirm-order" onClick={toggleModal}>Confirm Order and Pay</button>
                <ConfirmationModal visible={modalVisible}
                                onClose={toggleModal} />

            </div>

            <div class="customer-support">
                <div id ="support-text">Need help? Contact our customer support team.</div>
                <button id="support-btn">Support</button>
            </div>


                </div>
            </main>
        </div>
    )
};

export default Check;
