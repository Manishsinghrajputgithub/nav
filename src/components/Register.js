import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Assuming firebase.js is where you exported `auth` and initialized Firebase
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (registerPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, `${phoneNumber}@example.com`, registerPassword);
      const user = userCredential.user;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(registerPassword, 10);

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        password: hashedPassword,
      });

      console.log("User Registered Successfully");
      toast.success("User Registered Successfully", {
        position: 'top-center',
      });

      setTimeout(() => {
        navigate('/login');
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
        <button onClick={() => navigate('/login')}>LOGIN NOW</button>
      </div>
      <div className="register-container">
        <div className="register-form">
          <h2>~ REGISTRATION ~</h2>
          <form onSubmit={handleRegister}>
            <div className="user">
              <input
                type="text"
                placeholder="Your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
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
                placeholder="Enter Your Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="user">
              <input
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? 'REGISTERING...' : 'REGISTER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
