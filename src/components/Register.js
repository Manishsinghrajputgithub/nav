import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Assuming firebase.js is where you exported `auth` and initialized Firebase
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

const Register = () => {
  // State variables
  const [fullName, setFullName] = useState('');
  const [registerUserId, setRegisterUserId] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null); // State to store registered user data

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to handle registration form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (registerPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading
    setErrorMessage(''); // Clear any previous errors

    try {
      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerUserId,
        registerPassword
      );

      // If registration is successful, set registered user data
      const user = userCredential.user;
      setRegisteredUser(user);

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(registerPassword, 10);

      // Store user information in Firestore
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName,
          email: user.email,
          password: hashedPassword, // Store the hashed password
        });
      }

      console.log("User Registered Successfully", user);
      toast.success("User Registered Successfully", {
        position: 'top-center',
      });

      setTimeout(() => {
        navigate('/login'); // Redirect to login page after showing success message
      }, 2000); // Show success message for 2 seconds before redirecting

    } catch (error) {
      // Handle errors during registration
      setErrorMessage(error.message);
      console.error(error.message);
      toast.error(error.message, {
        position: 'bottom-center',
      });
    } finally {
      setLoading(false); // Stop loading
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
                type="text"
                placeholder="User ID - Email Address"
                value={registerUserId}
                onChange={(e) => setRegisterUserId(e.target.value)}
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
            {registeredUser && (
              <div className="success-message">
                Registered Successfully! User: {registeredUser.email}
              </div>
            )}
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