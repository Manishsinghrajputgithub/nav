import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Withdraw = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.klubbl.in/wallets/user-wallet?include=renderable', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJaUE14VmhHWjV3Tzd0N2xGZzdXZ2RwUW0zZVAyQCMxMTYiLCJleHBpcmVzSW4iOiIxZCIsImlhdCI6MTcxOTMwMDM1OSwiZXhwIjoxNzIxODkyMzU5fQ.OmuaoA95arrvck2A0wp2mMKzI8jXjnHAHGBcSc-V_K8'
          }
        });

        const data = response.data.data;
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setData([]); // Fallback to an empty array
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please check the console for details.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 text-center relative font-serif">
      <button className="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 rounded cursor-pointer lg:top-69 lg:right-10">Logout</button>
      <h2 className="text-red-600 font-bold text-2xl mb-5">Withdraw</h2>
      <div className="flex justify-start font-bold">
        <div className="bg-red-500 rounded-l text-white py-2 px-6">Payroom</div>
        <div className="bg-yellow-500 rounded-r text-black py-2 px-6">Deposit</div>
        <div className="bg-red-500 rounded-l text-white py-2 px-6">Deposit History</div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-black p-3 lg:p-2">Payment</th>
            <th className="border border-black p-3 lg:p-2">Amount</th>
            <th className="border border-black p-3 lg:p-2">GooglePay | PhonePay | Payment</th>
            <th className="border border-black p-3 lg:p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-3 lg:p-2 overflow-visible">
                {item.paymentMethod || 'UPI'}
              </td>
              <td className="border border-black p-3 lg:p-2 overflow-visible">
                {item.amount || 'Please Enter Amount (Min 1000)'}
              </td>
              <td className="border border-black p-3 lg:p-2 overflow-visible">
                {item.mobileNumber || 'Please Enter Mobile Number'}
              </td>
              <td className="border border-black p-3 lg:p-2 overflow-visible">
                <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer" onClick={() => window.location.href = '/deposite'}>Withdraw</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Withdraw;
