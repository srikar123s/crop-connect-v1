import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const mapUrl = "https://www.google.com/maps?q=VIT+Vellore";
    return (
        <footer className="footer-section">
            <div className="container" id="contact">
                {/* Contact Information */}
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: info@example.com</p>
                    <p>Phone: +91 12345 67890</p>
                    <p>Address: VIT University, Vellore, Tamil Nadu, India</p>
                </div>

                {/* Social Media Icons */}
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>

                {/* Newsletter Subscription Form */}
                <div className="footer-newsletter">
                    <h4>Subscribe to our Newsletter</h4>
                    <form action="#" method="post">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                {/* Embedded Google Map */}
                <div className="footer-map" >
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white'  }}>
                <h4>Our Location</h4>


                      <iframe
                            src={`https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=whPX3G7QEWtqSJqH4DQWTmM3_PgZk7aRR39hIH1GyIc&c=12.9716,79.1589&z=16`}
                            width="100%"
                            height="250"
                            style={{

                                border: 'none',
                                borderRadius: '10px',
                                objectFit: 'contain',
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
               </a>
                </div>

            </div>

            <br />

            <div className="footer-copyright">
                <p>&copy; 2024 Crop Connect. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
