import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import TotalsaleReport from './TotalsaleReport';
import Withdraw from './Withdraw';

import GridTable from './pages/GridTable';
import Register from './components/Register';
import Logins from './components/Logins';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';

function App() {
  return (
    <>

      <Routes>
        {/* <Route path="/" element={<Login/>} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Logins/>} />

        <Route path="/next-page" element={<GridTable/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/total-sale-report" element={<TotalsaleReport />} />
        <Route path="/next-page2" element={<Withdraw />} />
      </Routes>
      <ToastContainer/>

    </>

  );
}

export default App;
