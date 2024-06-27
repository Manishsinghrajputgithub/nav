import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import TotalsaleReport from './TotalsaleReport';
import Withdraw from './pages/Withdraw';

import GridTable from './pages/GridTable';
import Register from './components/Register';
import Logins from './components/Logins';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Deposite from './pages/Deposite';
import DepositHistory from './pages/DepositHistory';
import WithdrawHistory from './pages/WithdrawHistory';

function App() {
  return (
    <>

      <Routes>
        {/* <Route path="/" element={<Login/>} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Logins/>} />

        <Route path="/next-page" element={<GridTable/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/report" element={<TotalsaleReport />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/deposite" element={<Deposite/>} />
        <Route path="/deposite-history" element={<DepositHistory/>} />
        <Route path="/withdraw-history" element={<WithdrawHistory/>} />
        
      </Routes>
      <ToastContainer/>

    </>

  );
}

export default App;
