import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = ({ images, cartItems }) => {
  const navigate = useNavigate();

  return (
    <header className="py-3 bg-light text-black">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand">
            <img src={images['logo']} alt="Crop Connect Logo" width="50" /> <b>Crop Connect</b>
          </Link>
          
          <nav>
            <ul className="nav">
              <button className="btn nav-item" onClick={() => navigate('/')}>Home</button>
              <button className="btn nav-item" onClick={() => navigate('/seeds')}>Seeds</button>
              <button className="btn nav-item" onClick={() => navigate('/fer')}>Fertilizers</button>
              <button className="btn nav-item" onClick={() => navigate('/tools')}>Tools</button>
            </ul>
          </nav>

          <div className="icon d-flex align-items-center">
            <a href="#" className="position-relative me-3">
              <FontAwesomeIcon icon={faShoppingCart} id='cart-btn' style={{ cursor: 'pointer' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;