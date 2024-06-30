import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Assuming firebase.js is where you exported `auth` and initialized Firebase
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [captcha, setCaptcha] = useState('MI0F2');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [enteredCaptcha, setEnteredCaptcha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptcha(newCaptcha);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      // Sign in user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, `${phoneNumber}@example.com`, password);
      const user = userCredential.user;

      console.log('User logged in successfully');
      toast.success('User logged in successfully', {
        position: 'top-center',
      });

      setTimeout(() => {
        navigate('/next-page', { state: { phoneNumber } }); // Pass phoneNumber to next page
      }, 2000);

    } catch (error) {
      setErrorMessage(error.message);
      console.error(error.message);
      toast.error(error.message, {
        position: 'bottom-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="left-panel">
        <button onClick={() => navigate('/register')}>Register Now</button>
      </div>
      <div className="login-container">
        <div>
          <div className="login-form">
            <h2>~ PLEASE LOGIN ~</h2>
            <form onSubmit={handleLogin}>
              <div className="user">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="user">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="captcha">
                <span>{captcha}</span>
                <button type="button" onClick={handleChangeCaptcha}>CHANGE</button>
              </div>
              <div className="user">
                <input
                  type="text"
                  placeholder="Enter The Above Captcha"
                  value={enteredCaptcha}
                  onChange={(e) => setEnteredCaptcha(e.target.value)}
                />
              </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <div className="actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'LOGGING IN...' : 'LOGIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
