import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import TotalsaleReport from './TotalsaleReport';
import Withdraw from './Withdraw';

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<TotalsaleReport />} />
        <Route path="/next-page" element={<Withdraw />} />
      </Routes>
   
    </>
    
  );
}

export default App;
