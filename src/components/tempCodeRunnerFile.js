import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { auth } from './firebase'; // Assuming firebase.js is where you exported `auth` and initialized Firebase
import { toast } from 'react-toastify';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'; // Import RecaptchaVerifier and signInWithPhoneNumber from firebase/auth

const Login = () => {
  const [captcha, setCaptcha] = useState('MI0F2');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [enteredCaptcha, setEnteredCaptcha] = useState('');
  const [verificationId, setVerificationId] = useState(null); // State to store the verification ID
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptcha(newCaptcha);
  };

  const sendVerificationCode = async (event) => {
    event.preventDefault();

    // Validation
    if (phoneNumber === '' || enteredCaptcha === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    } else if (enteredCaptcha !== captcha) {
      setErrorMessage('Captcha does not match.');
      return;
    }

    setLoading(true); // Start loading
    setErrorMessage(''); // Clear any previous errors

    try {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      }, auth);

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);

      toast.success("Verification code sent", {
        position: 'top-center',
      });
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error.message);
      toast.error(error.message, {
        position: 'bottom-center',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validation
    if (verificationId === null || password === '') {
      setErrorMessage('Please complete phone verification and fill in all fields.');
      return;
    }

    setLoading(true); // Start loading
    setErrorMessage(''); // Clear any previous errors

    try {
      const credential = await auth.signInWithPhoneNumber(verificationId, password);
      const user = auth.currentUser;

      if (user) {
        console.log("User logged in Successfully", user);
        toast.success("User logged in Successfully", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate('/next-page'); // Navigate to the next page after successful login
        }, 2000); // Show success message for 2 seconds before redirecting
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false); // Stop loading
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
            <form onSubmit={verificationId ? handleLogin : sendVerificationCode}>
              <div className="user">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              {verificationId && (
                <div className="user">
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationId}
                    onChange={(e) => setVerificationId(e.target.value)}
                  />
                </div>
              )}
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
              <div id="recaptcha-container"></div>
              <div className="actions">
                <button type="submit" disabled={loading}>
                  {loading ? (verificationId ? 'LOGGING IN...' : 'SENDING...') : (verificationId ? 'LOGIN' : 'SEND CODE')}
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
