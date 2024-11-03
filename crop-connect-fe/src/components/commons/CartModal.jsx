// CartModal.js
import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import images from '../../Images'
import './CartModal.css';
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext';

const CartModal = ({ visible, onClose }) => {
    const navigate =  useNavigate();
    const {authenticated} = useContext(AuthContext)
    const { cartItems, changeQuantity, removeItem, clearCart } = useContext(CartContext);

    const totalAmount = cartItems.reduce((total, item) => {
        const priceMatch = item.price.match(/₹(\d+)/);
        const price = priceMatch ? parseInt(priceMatch[1], 10) : null;
        return total + price * item.quantity;
    }, 0);

    const handleCheckout =  () => {
        if(!authenticated){
            navigate('/login');
        }
        else if(cartItems.length>0){
            navigate('/check');
        }
        else{
            onClose();
        }
    }

    if (!visible) return null; // If not visible, don't render anything

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <FontAwesomeIcon icon={faShoppingCart}/> Shopping Cart
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            <FontAwesomeIcon icon={faShoppingCart} className="fa-3x mb-3 text-muted" />
                                            <p className="text-muted">Your cart is empty</p>
                                        </td>
                                    </tr>
                                ) : (
                                    cartItems.map((item) => (
                                        <tr key={item._id}>
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
                                                    <button className="btn btn-sm btn-secondary me-2" onClick={() => changeQuantity(item._id, -1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => changeQuantity(item._id, 1)}>+</button>
                                                </div>
                                            </td>
                                            <td className="align-middle">₹{item.price.match(/₹(\d+)/) ? parseFloat(item.price.match(/₹(\d+)/)[1], 10) : null}</td>
                                            <td className="align-middle">₹{(item.price.match(/₹(\d+)/) ? parseFloat(item.price.match(/₹(\d+)/)[1], 10) : null) * item.quantity}</td>
                                            <td className="align-middle">
                                                <button className="btn btn-sm btn-danger" onClick={() => removeItem(item._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-danger" onClick={clearCart}>
                            <FontAwesomeIcon icon={faTrash} className="me-2" /> Clear Cart
                        </button>
                        <div>
                            <h5 className="me-3 d-inline-block">Total: ₹{totalAmount}</h5>
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCheckout}>
                                <FontAwesomeIcon icon={faShoppingBag} className="me-2" /> Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
