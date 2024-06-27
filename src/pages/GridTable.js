import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const GridTable = () => {
  const [inputs, setInputs] = useState(
    Array(4).fill().map(() => Array(10).fill(''))
  );
  const [balancePoints, setBalancePoints] = useState(10);
  const [currentTime, setCurrentTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(900);
  const { state } = useLocation(); // Access location state to get username

  const username = state ? state.username : ''; // Retrieve username from location state

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (!firstLogin) {
      localStorage.setItem('firstLogin', 'true');
      setBalancePoints(10);
    } else {
      // Load balance points from persistent storage if needed
    }

    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const strTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      setCurrentTime(strTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // Clear timeout if the component is unmounted or timeLeft is 0
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format the time into MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleInputChange = (row, col, value) => {
    if (value === '-' || value.includes('-')) {
      return;
    }
    if (/[a-zA-Z]/.test(value)) {
      // If it contains alphabetic characters, do not update inputs
      return;
    }
    if (!/^\d*$/.test(value)) {
      // If it contains non-numeric characters, do not update inputs
      return;
    }

    const newInputs = inputs.map((inputRow, i) =>
      i === row ? inputRow.map((input, j) => j === col ? value : input) : inputRow
    );
    setInputs(newInputs);
  };

  const handleBuy = async () => {
    try {
      // Fetch new token from backend
      const responseToken = await axios.get('https://api.klubbl.in/panaboard/newToken');
      const token = responseToken.data.token;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const quantities = inputs.map(row => row.reduce((acc, val) => acc + (parseInt(val) || 0), 0));
      const amounts = quantities.map(qty => qty * 11);

      const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);
      setBalancePoints(totalAmount);

      const response = await axios.post('https://api.klubbl.in/panaboard/submitBid', {
        quantities,
        amounts
      }, config);

      console.log('API Response:', response.data);
      alert('Bid submitted successfully!');
    } catch (error) {
      console.error('API Error:', error.response); // Log the detailed error response
      if (error.response && error.response.status === 401) {
        alert('Unauthorized: Please check your credentials or login status.');
      } else {
        alert('Failed to submit bid. Please try again later.');
      }
    }
  };

  const handleClear = () => {
    setInputs(Array(4).fill().map(() => Array(10).fill('')));
  };

  return (
    <div className="p-1 md:p-1 lg:p-1 mr-20 ml-20 mt-5 text-center">
      <div className="flex flex-col md:flex-row justify-between items-center mt-5">
        <div className="text-left mb-4 md:mb-0 md:text-start">
          <h2 className="text-sm text-black font-times font-bold">Welcome: 7264894678</h2>
          <h3 className="text-sm text-black font-times font-semibold">Balance Points: {balancePoints}</h3>
        </div>
        <div className="text-right">
          <div className="mt-4 mb-2 flex text-right justify-end">
            <button
              className="bg-gradient-to-t from-red-900 to-red-500 text-white px-6 py-1 font-semibold rounded text-lg font-times md:w-auto"
              onClick={() => window.location.href = '/login'}>
              LogOut
            </button>
          </div>
          <h2 className="text-sm font-times font-bold">Gift Event Code: 14:30</h2>
          <h3 className="text-sm font-times font-semibold">Countdown: {formattedTime}</h3>
        </div>
      </div>
      <div className="flex justify-start space-x-1">
        <div className="px-2 py-2 bg-customBlue rounded text-white font-times">RESULT ANDAR {'{A}'}</div>
        <div className="px-2 py-2 bg-customBlue rounded text-white font-times">RESULT BAHAR {'{B}'}</div>
        <div className="px-2 py-2 bg-customBlue rounded text-white font-times">JODI {'{B}'}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-customPink">
              <th className="border border-black px-4 py-2 font-times">Game Name</th>
              <th className="border border-black px-4 py-2 font-times">Win</th>
              {[...Array(10)].map((_, i) => (
                <th key={i} className="border border-black px-4 py-2">{i}</th>
              ))}
              <th className="border border-black px-4 py-2 font-times">Qty</th>
              <th className="border border-black px-4 py-2 font-times">Amount</th>
              <th className="border border-black px-4 py-2 font-times">{currentTime}</th>
            </tr>
          </thead>
          <tbody>
            {['YANTRA GROUP-NV', 'YANTRA GROUP-RR', 'YANTRA GROUP-RV', 'YANTRA GROUP-CH'].map((name, i) => (
              <tr key={i} className={i % 2 === 0 ? "" : ""}>
                <td className="border border-black px-4 py-2 font-times">{name}</td>
                <td className="border border-black px-4 py-2 font-times">100</td>
                {inputs[i].map((input, j) => (
                  <td key={j} className="border border-black px-4 py-2">
                    <input
                      type="text"
                      className="w-full md:w-12 h-10 border border-black text-center"
                      value={input}
                      onChange={(e) => handleInputChange(i, j, e.target.value)}
                    />
                  </td>
                ))}
                <td className="border border-black px-4 py-2 font-times">{inputs[i].reduce((acc, val) => acc + (parseInt(val) || 0), 0)}</td>
                <td className="border border-black px-4 py-2 font-times">{inputs[i].reduce((acc, val) => acc + (parseInt(val) || 0) * 11, 0)}</td>
                <td className="border border-black px-4 py-2 font-times">{i === 0 ? 'NV25' : i === 1 ? 'RR66' : i === 2 ? 'RY82' : i === 3 ? 'CH63' : ''}</td>
              </tr>
            ))}
            <tr className="border border-black">
              <td colSpan={12} className="border border-black px-4 py-2 text-end font-bold font-times">Total:</td>
              <td className="border border-black px-4 py-2 font-times">
                {inputs.reduce((acc, row) => acc + row.reduce((acc, val) => acc + (parseInt(val) || 0), 0), 0)}
              </td>
              <td className="border border-black px-4 py-2 font-times">
                {inputs.reduce((acc, row) => acc + row.reduce((acc, val) => acc + (parseInt(val) || 0) * 11, 0), 0)}
              </td>
              <td className="border border-black px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">

        <button className="bg-gradient-to-t from-red-900 to-red-500 text-white px-5  py-2 font-semibold rounded-lg text-sm font-times md:w-auto">
          ADVANCE
        </button>

        <button className="bg-gradient-to-t from-red-900 to-red-500 text-white px-5  py-2 font-semibold rounded-lg text-sm font-times md:w-auto" onClick={handleBuy}>
          BUY
        </button>
        <button className="bg-gradient-to-t from-red-900 to-red-500 text-white px-5  py-2 font-semibold rounded-lg text-sm font-times md:w-auto" onClick={handleClear}>
          CLEAR
        </button>
        <Link to="/deposite">
          <button className="bg-gradient-to-t from-red-900 to-red-500 text-white px-5  py-2 font-semibold rounded-lg text-sm font-times md:w-auto">
            DEPOSIT
          </button>
        </Link>
        <Link to="/withdraw">
          <button className="bg-gradient-to-t from-red-900 to-red-500 text-white px-5  py-2 font-semibold rounded-lg text-sm font-times md:w-auto">
            WITHDRAW
          </button>
        </Link>
        <Link to="/report">
          <button className="bg-gradient-to-t from-red-900 to-red-500 text-white px-5  py-2 font-semibold rounded-lg text-sm font-times md:w-auto">
            REPORTS
          </button>
        </Link>
        <Link to="/results">
          <button className="bg-gradient-to-t from-red-900 to-red-500 text-white px-5  py-2 font-semibold rounded-lg text-sm font-times md:w-auto">
            RESULTS
          </button>
        </Link>
      </div>

      <div className="mt-4">
        <h4 className="text-xs text-blue-700">
          NavratnaCoupon.Com | NavratnaYantra.com | GoldeNavratnaCoupon.com
        </h4>
      </div>
    </div>
  );
};

export default GridTable;
