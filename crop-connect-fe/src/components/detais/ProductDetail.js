import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartModal from '../commons/CartModal';  // Your modal component
import images from '../../Images';
import './ProductDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';

function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, addToCart } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);  // Store similar products here
  const [randomSimilarProducts, setRandomSimilarProducts] = useState([]); // State for random similar products
  const product = location.state?.product;

  // Fetch similar products only once when the product is loaded
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (product) {
        try {
          const response = await axios.get("http://localhost:5000/api/products/");
          // Filter products based on category and exclude the current product
          const similar = response.data.filter(item =>
            item.category === product?.category && item._id !== product?._id
          );
          setSimilarProducts(similar);  // Set the similar products once
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchSimilarProducts(); // Fetch once when the product is available
  }, [product]); // Depend only on `product`

  // Generate random similar products only when similarProducts changes
  useEffect(() => {
    const getRandomProducts = (products, num) => {
      const shuffled = [...products].sort(() => Math.random() - 0.5);  // Shuffle the array
      return shuffled.slice(0, num);  // Return the first `num` products
    };

    if (similarProducts.length > 0) {
      const randomProducts = getRandomProducts(similarProducts, 6); // Get random products
      setRandomSimilarProducts(randomProducts); // Set the random similar products
    }
  }, [similarProducts]); // Depend on `similarProducts`

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(prev => !prev);
  };

  // If product is not available, show the modal
  if (!product) {
    return <CartModal visible={modalVisible} onClose={toggleModal} />;
  }

  return (
    <div>
      <header className="p-3 bg-light text-black">
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
                <button className="btn nav-item" onClick={() => {
                  navigate('/#contact');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}>Contact Us</button>
              </ul>
            </nav>
            <div className="icon d-flex align-items-center">
              <button onClick={toggleModal} className="btn position-relative me-3" >
                <FontAwesomeIcon icon={faShoppingCart} id='cart-btn' style={{ cursor: 'pointer' }} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </button>
              <CartModal visible={modalVisible} onClose={toggleModal} />
            </div>
          </div>
        </div>
      </header>

      <div className="product-detail">
        <div className="mcontainer">
          <div className="back">
            <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
          </div>
          <div className="dcontainer">
            <div className="product-info">
              <img src={images[product.image]} className="img-fluid" alt={product.name} />
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price">{product.price}</p>
                <button className="addCart btn btn-secondary me-2" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="similar-products">
  <h3>Similar Products</h3>
  <div className="row">
    {randomSimilarProducts.map((similarProduct) => (
      <div 
        className="product" 
        data-id={similarProduct._id} 
        key={similarProduct._id}
        onClick={() => navigate(`/product/${product._id}`, { state: { product: similarProduct } })}
        style={{ cursor: 'pointer' }}
      >
        <img src={images[similarProduct.image]} className="img-fluid" alt={similarProduct.name} />
        <h2>{similarProduct.name}</h2>
        <p>{similarProduct.description}</p>
        <p className="price">{similarProduct.price}</p>
        <button className="addCart btn btn-secondary" onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the navigate on button click
          addToCart(similarProduct);
        }}>
          Add to Cart
        </button>
      </div>
    ))}
  </div>
</section>

        <footer className="bg-light text-black text-center py-3">
          <p>&copy; 2024 Crop Connect. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default ProductDetail;