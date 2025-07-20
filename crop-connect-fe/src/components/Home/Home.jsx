import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import CartModal from '../commons/CartModal';
import images from '../../Images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faTrash, faShoppingBag,faLeaf } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Footer from '../commons/Footer';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const navigate = useNavigate();
    const { cartItems, addToCart, changeQuantity, removeItem, clearCart } = useContext(CartContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [bestSellers, setBestSellers] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    // Toggle modal visibility
    const toggleModal = () => {
        setModalVisible(prev => !prev);
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/`);
                const filteredBestSellers = response.data.filter(product => product.tag === 'best');
                setBestSellers(filteredBestSellers);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);


    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // Make scrolling smooth
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
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

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
                                <button className="btn nav-item" onClick={() => { navigate('/') }}>Home</button>
                                <li className="nav-item"><a href="#products" className="nav-link text-black">Categories</a></li>
                                <li className="nav-item"><a href="#benefits" className="nav-link text-black">Features</a></li>
                                <li className="nav-item"><a href="#contact" className="nav-link text-black">Contact Us</a></li>
                            </ul>
                        </nav>

                        <div className="icon d-flex align-items-center">
                            <a href="#" onClick={toggleModal} className="position-relative me-3" >
                                <FontAwesomeIcon icon={faShoppingCart} id='cart-btn' style={{ cursor: 'pointer' }} />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            </a>
                            <CartModal
                                visible={modalVisible}
                                onClose={toggleModal}
                            />
                            <button className="btn nav-item" onClick={() => { navigate('/login') }}>
                                <FontAwesomeIcon icon={faUser} id="login-btn" style={{ cursor: 'pointer' }} />
                            </button>
                            <button className="btn nav-item" onClick={() => { navigate('/weather') }}>
                                <FontAwesomeIcon icon={faCloudSun} />
                            </button>

                            <button className="btn nav-item" onClick={() => { navigate('/plant-detector') }}>
                                <FontAwesomeIcon icon={faLeaf} /> {/* You can also use faMicroscope or faBug */}
                            </button>


                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero text-center">
                <div>
                    <h1>Quality Seeds, Fertilizers, and Tools for Your Farming Needs</h1>
                    <h2>From Seed To Success, We Have Got You Covered</h2>
                    <a href="#best" className="btn btn-warning btn-lg">Shop Now</a>
                </div>
            </section>

            {/* Product Categories Section */}
            <section className="container py-5" id="products">
                <h2 className="text-center">Product Categories</h2>
                <br />
                <div className="row text-center d-flex justify-content-between">
                    <div className="category">
                        <img src={images['seeds']} alt="Seeds" className="img-fluid" />
                        <h3>Seeds</h3>
                        <p>Explore our high-quality organic seeds.</p>
                        <button className="btn btn-secondary" onClick={() => { navigate('/seeds') }}>Shop Seeds</button>
                    </div>
                    <div className="category">
                        <img src={images['fert']} alt="Chemicals" className="img-fluid" />
                        <h3>Chemicals</h3>
                        <p>Buy the best Fertilizers for your crops.</p>
                        <button className="btn btn-secondary" onClick={() => { navigate('/fer') }}>Shop Fertilizers</button>
                    </div>
                    <div className="category">
                        <img src={images['tools']} alt="Tools" className="img-fluid" />
                        <h3>Tools</h3>
                        <p>Find durable tools for your farming operations.</p>
                        <button className="btn btn-secondary" onClick={() => { navigate('/tools') }}>Shop Tools</button>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="container py-5" id="best">
                <h2 className="text-center">Best Sellers</h2>
                <br />

                <div className="row">
                    {bestSellers.map((product) => (
                        <div className="col-md-4" key={product._id}>
                            <div className="product" data-id={product._id}>
                                <img
                                    src={images[product.image]}
                                    className="img-fluid"
                                    alt={product.name}
                                    onClick={() => navigateToProductDetail(product)}
                                />
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p className="price">{product.price}</p>
                                <button className="addCart btn btn-secondary me-2" onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <button
                className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>

            {/* Benefits Section */}
            <section className="container py-5" id="benefits">
                <h2 className="text-center">Our Features</h2>
                <br />
                <div className="row text-center d-flex justify-content-between">
                    <div className="category col-md-4">
                        <img src={images['images']} alt="Fresh Products" className="img-fluid" />
                        <h3>Fresh and Quality Products</h3>
                        <p>We offer the best quality products sourced directly from farmers.</p>
                    </div>
                    <div className="category col-md-4">
                        <img src={images['delivery']} alt="Free Shipping" className="img-fluid" />
                        <h3>Free Shipping on Orders</h3>
                        <p>Get your products delivered to your doorstep for free.</p>
                    </div>
                    <div className="category col-md-4">
                        <img src={images['customer-support']} alt="Customer Support" className="img-fluid" />
                        <h3>Customer Support 24/7</h3>
                        <p>We are here to assist you anytime, day or night.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonial-section py-5" id="rev">
                <div className="container">
                    <h2 className="text-center mb-5">What Our Customers Say</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="testimonial-box shadow p-4 mb-4">
                                <img src={images['av']} alt="Customer Photo" className="rounded-circle mb-3" width="80" height="80" />
                                <p className="testimonial-text">"Great quality seeds! My crops have been healthier!"</p>
                                <span className="testimonial-rating">★★★★★</span>
                                <p className="testimonial-name mt-2">- Srikar Y</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="testimonial-box shadow p-4 mb-4">
                                <img src={images['av']} alt="Customer Photo" className="rounded-circle mb-3" width="80" height="80" />
                                <p className="testimonial-text">"Fast shipping and excellent customer service."</p>
                                <span className="testimonial-rating">★★★★☆</span>
                                <p className="testimonial-name mt-2">- Sagar Reddy</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="testimonial-box shadow p-4 mb-4">
                                <img src={images['av']} alt="Customer Photo" className="rounded-circle mb-3" width="80" height="80" />
                                <p className="testimonial-text">"Affordable tools that get the job done!"</p>
                                <span className="testimonial-rating">★★★★★</span>
                                <p className="testimonial-name mt-2">- Sravan P</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
};


export default Home;
