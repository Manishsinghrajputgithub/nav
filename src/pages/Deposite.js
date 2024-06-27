import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Deposite = () => {
  const navigate = useNavigate();
  const [upiDropdown, setUpiDropdown] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [depositHistory, setDepositHistory] = useState([]);

  useEffect(() => {
    // Load deposit history from localStorage
    const history = JSON.parse(localStorage.getItem('depositHistory')) || [];
    setDepositHistory(history);
  }, []);

  const handleDeposit = () => {
    const depositData = { paymentMethod, amount, phoneNumber, date: new Date().toLocaleString() };
    const updatedHistory = [...depositHistory, depositData];
    setDepositHistory(updatedHistory);
    localStorage.setItem('depositHistory', JSON.stringify(updatedHistory));
  
  };

  return (
    <div className="p-10 md:p-20 text-center relative font-serif bg-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl mb-10 font-bold text-red-700">Deposit</h2>
      <div className="flex justify-between items-center ">
        <div className="flex font-bold text-sm cursor-pointer space-x-1">
          <div className="py-2.5 px-5 bg-red-600 rounded text-white text-center hover:bg-red-700 transition" onClick={() => navigate('/payroom')}>Payroom</div>
          <div className="py-2.5 px-5 bg-yellow-400 rounded text-black text-center">Deposit</div>
          <div className="py-2.5 px-5 bg-red-600 rounded text-white text-center hover:bg-red-700 transition" onClick={() => navigate('/deposite-history')}>Deposit History</div>
        </div>
        <button className="bg-red-600 text-white border-none px-5 py-2 cursor-pointer rounded hover:bg-red-700 transition" onClick={() => navigate('/login')}>Logout</button>
      </div>
      <table className="w-full border-collapse bg-white shadow-lg rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-2 border-gray-400 p-2">Payment</th>
            <th className="border-2 border-gray-400 p-2">Amount</th>
            <th className="border-2 border-gray-400 p-2">GooglePay | PhonePay</th>
            <th className="border-2 border-gray-400 p-2">Payment By</th>
            <th className="border-2 border-gray-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-gray-400 text-center p-3 relative">
              <div className="cursor-pointer flex items-center justify-center" onClick={() => setUpiDropdown(!upiDropdown)}>
                {paymentMethod} {upiDropdown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </div>
              {upiDropdown && (
                <div className="absolute bg-white border border-gray-400 mt-2 rounded shadow-lg w-full z-10">
                  <div className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { setPaymentMethod('UPI'); setUpiDropdown(false); }}>UPI</div>
                  <div className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { setPaymentMethod('Card'); setUpiDropdown(false); }}>Card</div>
                  <div className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { setPaymentMethod('Net Banking'); setUpiDropdown(false); }}>Net Banking</div>
                </div>
              )}
            </td>
            <td className="border-2 border-gray-400 p-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 rounded outline-none "
                placeholder="Enter Amount (Min 1000)"
              />
            </td>
            <td className="border-2 border-gray-400 p-2">9**8@ybl</td>
            <td className="border-2 border-gray-400 p-2">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 rounded outline-none "
                placeholder="Enter Your Phone Number"
              />
            </td>
            <td className="border-2 border-gray-400 ">
              <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition" onClick={handleDeposit}>Deposit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Deposite;
