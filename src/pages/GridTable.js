import React, { useState } from 'react';
import axios from 'axios';

const GridTable = () => {
  const [inputs, setInputs] = useState(
    Array(4).fill().map(() => Array(10).fill(''))
  );
  const [balancePoints, setBalancePoints] = useState(10);

  const handleInputChange = (row, col, value) => {
    const newInputs = inputs.map((inputRow, i) => 
      i === row ? inputRow.map((input, j) => j === col ? value : input) : inputRow
    );
    setInputs(newInputs);
  };

  const handleBuy = async () => {
    const quantities = inputs.map(row => row.reduce((acc, val) => acc + (val === '1' ? 1 : 0), 0));
    const amounts = quantities.map(qty => qty * 11);

    const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);
    setBalancePoints(balancePoints + totalAmount);

    // API call can be added here
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        quantities,
        amounts
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div className="p-4 text-center relative bg-gray-100">
      <button
        className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        onClick={() => window.location.href = '/logout'}
      >
        Logout
      </button>

      <div className="mt-4 text-left">
        <h2 className="text-sm font-bold">Welcome : 8541039703</h2>
        <h3 className="text-sm">Balance Points: {balancePoints}</h3>
      </div>

      <div className="flex justify-start mt-8">
        <div className="flex">
          <div className="m-0 p-2 bg-purple-800 rounded-lg text-white mr-2">RESULT ANDAR {'{A}'}</div>
          <div className="m-0 p-2 bg-purple-800 rounded-lg text-white mr-2">RESULT BAHAR {'{B}'}</div>
          <div className="m-0 p-2 bg-purple-800 rounded-lg text-white">JODI {'{B}'}</div>
        </div>
      </div>

      <table className="w-full mt-8 table-auto">
        <thead>
          <tr className="bg-yellow-200">
            <th className="border-2 border-gray-400 px-4 py-2">Game Name</th>
            <th className="border-2 border-gray-400 px-4 py-2">Win</th>
            {[...Array(10)].map((_, i) => (
              <th key={i} className="border-2 border-gray-400 px-4 py-2">{i}</th>
            ))}
            <th className="border-2 border-gray-400 px-4 py-2">Qty</th>
            <th className="border-2 border-gray-400 px-4 py-2">Amount</th>
            <th className="border-2 border-gray-400 px-4 py-2">07:30</th>
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
              <td className="border-2 border-gray-400 px-4 py-2">{inputs[i].filter(val => val === '1').length}</td>
              <td className="border-2 border-gray-400 px-4 py-2">{inputs[i].filter(val => val === '1').length * 11}</td>
              <td className="border-2 border-gray-400 px-4 py-2">-</td>
            </tr>
          ))}
          <tr className="border-2 border-gray-400">
            <td colSpan={12} className="border-2 border-gray-400 px-4 py-2 text-center font-bold">Total:</td>
            <td className="border-2 border-gray-400 px-4 py-2">{
              inputs.reduce((acc, row) => acc + row.filter(val => val === '1').length, 0)
            }</td>
            <td className="border-2 border-gray-400 px-4 py-2">{
              inputs.reduce((acc, row) => acc + row.filter(val => val === '1').length * 11, 0)
            }</td>
            <td className="border-2 border-gray-400 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center mt-8 space-x-4">
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">ADVANCE</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={handleBuy}>BUY</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">CLEAR</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">DEPOSIT</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">WITHDRAW</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">REPORTS</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">RESULTS</button>
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
