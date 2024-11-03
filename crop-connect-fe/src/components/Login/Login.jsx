import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../Images';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css';
import { useGoogleLogin, GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext'

function Login() {
    const { authenticated, login, logout } = useContext(AuthContext)
    const navigateTo = useNavigate();
    const [isPanelSwitched, setPanelSwitched] = useState(false);

    const switchToSignUp = () => {
        setPanelSwitched(true);
    };

    const switchToSignIn = () => {
        setPanelSwitched(false);
    };

    return (
        <div>
            <header className="py-2 bg-light text-black">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        <img src={images['logo']} alt="Crop Connect Logo" width="50" /> <b>Crop Connect</b>
                    </Link>
                    <nav>
                        <ul className="nav">
                            <button className="btn nav-item" onClick={() => { navigateTo('/') }}>Home</button>

                            <button className="btn nav-item" onClick={() => {
                                navigateTo('/#products');
                                setTimeout(() => {
                                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}>Categories</button>

                            <button className="btn nav-item" onClick={() => {
                                navigateTo('/#benefits');
                                setTimeout(() => {
                                    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}>Features</button>
                            <button className="btn nav-item" onClick={() => {
                                navigateTo('/#contact');
                                setTimeout(() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}>Contact Us</button>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='ncontainer'>
                <div className={`auth-container ${isPanelSwitched ? 'right-panel-active' : ''}`} id="auth-container">
                    <div className="form-container sign-up-section">
                        <form action="https://formsubmit.co/el/vadezu" method="POST">
                            <h3>Create Account</h3>
                            <div className="social-icons" style={{ alignItems: "center" }}>
                                <a href="#" className="social-icon" aria-label="Sign in with Facebook">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                                <GoogleOAuthProvider clientId="116503084132-c3o43ssvu22obvl6grptaoj004pfonkq.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log("here: ")
                                            console.log(credentialResponse);
                                            login();
                                            navigateTo('/');
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                            logout();
                                        }}

                                    />
                                </GoogleOAuthProvider>
                                <a href="#" className="social-icon" aria-label="Sign in with LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>



                            </div>
                            <br />
                            <span>or use your email for registration</span><br />
                            <input type="text" placeholder="User Name" required />
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <input type="password" placeholder="Confirm Password" required />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>

                    <div className="form-container sign-in-section">
                        <form action="#">
                            <h3>Sign In</h3>
                            <div className="social-icons" style={{ alignItems: "center" }}>
                                <a href="#" className="social-icon" aria-label="Sign in with Facebook">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                                <GoogleOAuthProvider clientId="116503084132-c3o43ssvu22obvl6grptaoj004pfonkq.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log("here: ")
                                            console.log(credentialResponse);
                                            login();
                                            navigateTo('/');
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}

                                    />
                                </GoogleOAuthProvider>
                                <a href="#" className="social-icon" aria-label="Sign in with LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                            </div>
                            <br />
                            <span>or use your account</span>
                            <br />
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <a href="#">Forgot your password?</a>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>

                    <div className="overlay-section">
                        <div className="overlay">
                            <div className="overlay-panel left-panel">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" onClick={switchToSignIn}>Sign In</button>
                            </div>
                            <div className="overlay-panel right-panel">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start your journey with us</p>
                                <button className="ghost" onClick={switchToSignUp}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
