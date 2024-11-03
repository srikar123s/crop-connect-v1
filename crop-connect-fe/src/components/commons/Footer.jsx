import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'; 

const Footer = () => {
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
                    <forms action="#" method="post">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </forms>
                </div>

                {/* Embedded Google Map */}
                <div className="footer-map">
                    <h4>Our Location</h4>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.795738720547!2d79.15595941526065!3d12.971598618589975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad4734c5b14965%3A0xcbe9f12fb7f67148!2sVIT%20Vellore%2C%20Tamil%20Nadu%20632014!5e0!3m2!1sen!2sin!4v1696600984567!5m2!1sen!2sin" 
                        width="100%" 
                        height="250" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy">
                    </iframe>
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
