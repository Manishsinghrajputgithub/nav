import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Assuming firebase.js is where you exported `auth` and initialized Firebase
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [captcha, setCaptcha] = useState('MI0F2');
  const [userId, setUserId] = useState('');
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

    // Validation
    if (userId === '' || password === '' || enteredCaptcha === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    } else if (!/\S+@\S+\.\S+/.test(userId)) { // Email validation regex
      setErrorMessage('Please enter a valid email address.');
      return;
    } else if (enteredCaptcha !== captcha) {
      setErrorMessage('Captcha does not match.');
      return;
    }

    setLoading(true); // Start loading
    setErrorMessage(''); // Clear any previous errors

    try {
      // Hash the password before attempting to log in (for demonstration purposes)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Firebase authentication using email and password
      await signInWithEmailAndPassword(auth, userId, password);
      console.log("User logged in Successfully", userId, "Hashed Password:", hashedPassword);
      toast.success("User logged in Successfully", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate('/next-page'); // Navigate to the next page after successful login
      }, 2000); // Show success message for 2 seconds before redirecting

    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleResultChart = () => {
    navigate('/next-page'); // Use navigate instead of window.location.href
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
                  type="text"
                  placeholder="User ID - Email Address"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
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
              <div className="result">
                <button type="button" onClick={handleResultChart}>RESULT CHART</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
