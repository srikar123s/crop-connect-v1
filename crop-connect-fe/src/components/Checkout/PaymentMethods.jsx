import React from 'react';

const PaymentMethods = ({ handlePaymentSelection, images }) => {
  return (
    <div className="payment-methods">
      <h2>Payment Method</h2>

      <div className="payment-method">
        <input 
          type="radio" 
          id="credit-debit" 
          name="payment" 
          value="credit-debit" 
          onChange={handlePaymentSelection} 
        />
        <label htmlFor="credit-debit">
          Credit or debit card <br />
          <img src={images['visa']} alt="Visa" width="30" />
          <img src={images['master']} alt="MasterCard" width="30" />
          <img src={images['rupay']} alt="RuPay" width="30" />
        </label>
      </div>

      <div className="payment-method">
        <input 
          type="radio" 
          id="net-banking" 
          name="payment" 
          value="net-banking" 
          onChange={handlePaymentSelection} 
        />
        <label htmlFor="net-banking">
          Net Banking <br />
          <img src={images['ic']} alt="ICICI Bank" width="30" />
          <img src={images['hd']} alt="HDFC Bank" width="30" />
          <img src={images['ax']} alt="Axis Bank" width="30" />
          <img src={images['sbi']} alt="SBI" width="30" />
        </label>
      </div>

      <div className="payment-method">
        <input 
          type="radio" 
          id="wallet" 
          name="payment" 
          value="wallet" 
          onChange={handlePaymentSelection} 
        />
        <label htmlFor="wallet">
          Wallet <br />
          <img src={images['pap']} alt="Paytm" width="30" />
          <img src={images['pp']} alt="PhonePe" width="30" />
          <img src={images['gp']} alt="Google Pay" width="30" />
        </label>
      </div>

      <div className="payment-method">
        <input 
          type="radio" 
          id="cod" 
          name="payment" 
          value="cod" 
          onChange={handlePaymentSelection} 
        />
        <label htmlFor="cod">
          Cash On Delivery <br />
          <img src={images['cod']} alt="cod" width="30" />
        </label>
      </div>
    </div>
  );
};

export default PaymentMethods;