import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartModal from '../commons/CartModal';
import images from '../../Images';
import '../Seeds/pro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faTrash, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
function Fer() {
    const navigate = useNavigate();
    const { cartItems, addToCart, changeQuantity, removeItem, clearCart } = useContext(CartContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [fer, setFer] = useState([]); // Added seeds state


    // Toggle modal visibility
    const toggleModal = () => {
        setModalVisible(prev => !prev);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const navigateToProductDetail = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
        scrollToTop();
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products/");
                const filteredFer = response.data.filter(product => product.category === 'Fertilizers');
                setFer(filteredFer);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

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
                            <button onClick={toggleModal} className="btn position-relative me-3">
                                <FontAwesomeIcon icon={faShoppingCart} id='cart-btn' style={{ cursor: 'pointer' }} />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            </button>
                            <CartModal
                                visible={modalVisible}
                                onClose={toggleModal}

                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="rowse">
                {fer.map((product) => (
                    <div className="productse" data-id={product.id} key={product.id}>
                        <img
                            src={images[product.image]}
                            className="img-fluid"
                            alt={product.name}
                            onClick={() => navigateToProductDetail(product)}
                        />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="price">{product.price}</p>
                        <button className="addCart btn btn-secondary me-2" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <footer class="bg-light text-black text-center py-3">
                <p>&copy; 2024 Crop Connect. All Rights Reserved.</p>
            </footer>

        </div>
    );
}

export default Fer;