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

      const totalAmount = amounts.reduce((acc, amount) =>amount, 0);
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
    <div className="p-4 text-center relative bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="text-left">
          <h2 className="text-sm font-bold">Welcome: 7264894678</h2>
          <h3 className="text-sm">Balance Points: {balancePoints}</h3>
        </div>
        <div className="text-right">
          <div className="mt-8 mb-4 flex text-right justify-end">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              onClick={() => window.location.href = '/login'}
            >
              Logout
            </button>
          </div>
          <h2 className="text-sm font-bold">Gift Event Code: 14:30</h2>
          <h3 className="text-sm">Countdown: {formattedTime}</h3>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="flex">
          <div className="m-0 p-2 bg-purple-800 rounded-lg text-white mr-2">RESULT ANDAR {'{A}'}</div>
          <div className="m-0 p-2 bg-purple-800 rounded-lg text-white mr-2">RESULT BAHAR {'{B}'}</div>
          <div className="m-0 p-2 bg-purple-800 rounded-lg text-white">JODI {'{B}'}</div>
        </div>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-yellow-200">
            <th className="border-2 border-gray-400 px-4 py-2">Game Name</th>
            <th className="border-2 border-gray-400 px-4 py-2">Win</th>
            {[...Array(10)].map((_, i) => (
              <th key={i} className="border-2 border-gray-400 px-4 py-2">{i}</th>
            ))}
            <th className="border-2 border-gray-400 px-4 py-2">Qty</th>
            <th className="border-2 border-gray-400 px-4 py-2">Amount</th>
            <th className="border-2 border-gray-400 px-4 py-2">{currentTime}</th>
          </tr>
        </thead>
        <tbody>
          {['YANTRA GROUP-NV', 'YANTRA GROUP-RR', 'YANTRA GROUP-RV', 'YANTRA GROUP-CH'].map((name, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-gray-200" : ""}>
              <td className="border-2 border-gray-400 px-4 py-2">{name}</td>
              <td className="border-2 border-gray-400 px-4 py-2">100</td>
              {inputs[i].map((input, j) => (
                <td key={j} className="border-2 border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    className="w-16 h-8 border-2 border-gray-400 text-center"
                    value={input}
                    onChange={(e) => handleInputChange(i, j, e.target.value)}
                  />
                </td>
              ))}
              <td className="border-2 border-gray-400 px-4 py-2">{inputs[i].reduce((acc, val) => acc + (parseInt(val) || 0), 0)}</td>
              <td className="border-2 border-gray-400 px-4 py-2">{inputs[i].reduce((acc, val) => acc + (parseInt(val) || 0) * 11, 0)}</td>
              <td className="border-2 border-gray-400 px-4 py-2">NV28</td>
            </tr>
          ))}
          <tr className="border-2 border-gray-400">
            <td colSpan={12} className="border-2 border-gray-400 px-4 py-2 text-center font-bold">Total:</td>
            <td className="border-2 border-gray-400 px-4 py-2">{
              inputs.reduce((acc, row) => acc + row.reduce((acc, val) => acc + (parseInt(val) || 0), 0), 0)
            }</td>
            <td className="border-2 border-gray-400 px-4 py-2">{
              inputs.reduce((acc, row) => acc + row.reduce((acc, val) => acc + (parseInt(val) || 0) * 11, 0), 0)
            }</td>
            <td className="border-2 border-gray-400 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center mt-8 space-x-4">
        <Link to="/advance">
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">ADVANCE</button>
        </Link>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={handleBuy}>BUY</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={handleClear}>CLEAR</button>
        <Link to="/deposit">
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">DEPOSIT</button>
        </Link>
        <Link to="/withdraw">
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">WITHDRAW</button>
        </Link>
        <Link to="/report">
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">REPORTS</button>
        </Link>
        <Link to="/results">
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">RESULTS</button>
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

