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
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                        <h4>Our Location</h4>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3890.506227445828!2d79.1589!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1712299650000!5m2!1sen!2sin"
                            width="100%"
                            height="250"
                            style={{
                                border: 'none',
                                borderRadius: '10px',
                                objectFit: 'contain',
                                transition: 'transform 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            allowFullScreen
                            loading="lazy"
                        />

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
