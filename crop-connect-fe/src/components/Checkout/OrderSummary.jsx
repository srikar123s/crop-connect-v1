import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OrderSummary = ({ cartItems, images, changeQuantity, removeItem, totalAmount, deliveryCharge, isReview = false }) => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            {!isReview && <th></th>}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
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
                  {!isReview && (
                    <>
                      <button className="btn btn-sm btn-secondary me-2" onClick={() => changeQuantity(item._id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-sm btn-secondary ms-2" onClick={() => changeQuantity(item._id, 1)}>+</button>
                    </>
                  )}
                  {isReview && <span>{item.quantity}</span>}
                </div>
              </td>
              <td className="align-middle">₹{item.price.match(/₹(\d+)/) ? parseFloat(item.price.match(/₹(\d+)/)[1], 10) : null}</td>
              <td className="align-middle">₹{(item.price.match(/₹(\d+)/) ? parseFloat(item.price.match(/₹(\d+)/)[1], 10) : null) * item.quantity}</td>
              {!isReview && (
                <td className="align-middle">
                  <button className="btn btn-sm btn-danger" onClick={() => removeItem(item._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              )}
            </tr>
          ))}
          <tr><td><br /></td></tr>
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
            <td id="final-amount"><strong>₹{totalAmount + deliveryCharge}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;