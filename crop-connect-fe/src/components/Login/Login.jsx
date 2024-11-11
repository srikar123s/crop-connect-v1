import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Login.css';
import { useGoogleLogin, GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';
import images from '../../Images'

function Login() {
    const { login } = useContext(AuthContext);
    const navigateTo = useNavigate();
    const [isPanelSwitched, setPanelSwitched] = useState(false);
    const [signupData, setSignupData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    // Switch between sign-in and sign-up panels
    const switchToSignUp = () => setPanelSwitched(true);
    const switchToSignIn = () => setPanelSwitched(false);

    // Handle signup form changes
    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    // Handle login form changes
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Signup request
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            console.log(signupData)
            const response = await axios.post('http://localhost:5000/api/auth/signup', signupData);
            setErrorMessage('');
            alert(response.data.message);
            switchToSignIn();
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Signup failed');
        }
    };

    // Login request
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user',response.data.user);
            login();  // Set user as authenticated
            navigateTo('/');
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Login failed');
        }
    };

    const handleGoogleLogin = async (gtoken) =>{
        try{
            const resp = await axios.post('http://localhost:5000/api/auth/google', {"token": gtoken?.credential});
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('user',resp.data.user);
            console.log(resp.data.token);
            login();  
            navigateTo('/');
        }
        catch(error){
            setErrorMessage(error.response?.data?.error  || 'Google login failed');
        }
    }

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
                        <form onSubmit={handleSignupSubmit}>
                            <h3>Create Account</h3>
                            <div className="social-icons" style={{ alignItems: "center" }}>
                                <a href="#" className="social-icon" aria-label="Sign in with Facebook">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                              
                                <a href="#" className="social-icon" aria-label="Sign in with LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                            </div>
                            <GoogleOAuthProvider clientId="116503084132-c3o43ssvu22obvl6grptaoj004pfonkq.apps.googleusercontent.com">
                                    <GoogleLogin
                                     text="signup_with"
                                        onSuccess={credentialResponse => {
                                            console.log("here: ")
                                            console.log(credentialResponse);
                                            handleGoogleLogin();
                                            navigateTo('/');
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}

                                    />
                                </GoogleOAuthProvider>
                            <br />
                            <span>or use your account</span>
                            <br />
                            <input type="text" name="username" placeholder="User Name" value={signupData.username} onChange={handleSignupChange} required />
                            <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
                            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleSignupChange} required />
                            <input type="hidden" name="method" value="form" />
                            <button type="submit">Sign Up</button>
                            {errorMessage && <p className="error">{errorMessage}</p>}
                        </form>
                    </div>

                    <div className="form-container sign-in-section">
                        <form onSubmit={handleLoginSubmit}>
                            <h3>Sign In</h3>
                            <div className="social-icons" style={{ alignItems: "center" }}>
                                <a href="#" className="social-icon" aria-label="Sign in with Facebook">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                                
                                <a href="#" className="social-icon" aria-label="Sign in with LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                            </div>
                            <GoogleOAuthProvider clientId="116503084132-c3o43ssvu22obvl6grptaoj004pfonkq.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log("here: ")
                                            console.log(credentialResponse);
                                            handleGoogleLogin(credentialResponse);
                                            navigateTo('/');
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}

                                    />
                                </GoogleOAuthProvider>
                            <br />
                            <span>or use your account</span>
                            <br />
                            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                            <button type="submit">Sign In</button>
                            {errorMessage && <p className="error">{errorMessage}</p>}
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
