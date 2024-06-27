import React from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const WithdrawHistory = () => {
  const navigate = useNavigate();
  return (
    <div className="p-20 text-center relative font-serif bg-gray-100 min-h-screen">
      <h2 className="text-4xl mb-10 font-bold text-red-700">Withdraw History</h2>
      <div className="flex justify-center mb-5">
        <input type="text" className="p-2 border-none bg-white shadow-inner rounded-l-md" />
        <button className="bg-red-600 text-white p-2 rounded-r-md hover:bg-red-700 transition flex items-center">
          <MdKeyboardArrowDown className="mr-1" />
          Search
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex font-bold text-sm cursor-pointer">
          <div className="mx-0.5 py-2.5 px-5 bg-red-600 rounded text-white text-center hover:bg-red-700 transition" onClick={() => navigate('/payroom')}>Payroom</div>
          <div className="mx-0.5 py-2.5 px-5 bg-yellow-400 rounded text-black text-center">Withdraw</div>
          <div className="mx-0.5 py-2.5 px-5 bg-red-600 rounded text-white text-center hover:bg-red-700 transition" onClick={() => navigate('/Withdrawe-history')}>Withdraw History</div> 
        </div>
        <button className="bg-red-600 text-white border-none px-5 py-1.5 cursor-pointer rounded hover:bg-red-700 transition"onClick={() => navigate('/login')}>Logout</button>

      </div>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b border-gray-300 p-3">No</th>
            <th className="border-b border-gray-300 p-3">Amount</th>
            <th className="border-b border-gray-300 p-3">Payment ID</th>
            <th className="border-b border-gray-300 p-3">Payment Method</th>
            <th className="border-b border-gray-300 p-3">Date</th>
            <th className="border-b border-gray-300 p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Populate rows with data */}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawHistory;
