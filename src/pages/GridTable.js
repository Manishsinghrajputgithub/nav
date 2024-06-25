import React from 'react';
import './gridTable.css';

const GridTable = () => {
  return (
    <div className="grid-table-container">
      <button className="logout-button" onClick={() => window.location.href = '/logout'}>Logout</button>
     
      <h2>Welcome : 8541039703</h2>
      <h3>Balance Points: 10</h3>
      <div className="info-footer">
        <p>GIFT EVENT CODE : 07:45</p>
        <p><br/>COUNTDOWN : 10:38</p>
      </div>
      <div className="info-divs">
        <div>RESULT ANDAR {`{A}`}</div>
        <div>RESULT BAHAR {`{B}`}</div>
        <div>JODI {`{B}`}</div>
      </div>
      <table className="result-table">
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Win</th>
            {[...Array(10)].map((_, i) => (
              <th key={i}>{i}</th>
            ))}
            <th>Qty</th>
            <th>Amount</th>
            <th>07:30</th>
          </tr>
        </thead>
        <tbody>
          {['YANTRA GROUP-NV', 'YANTRA GROUP-RR', 'YANTRA GROUP-RV', 'YANTRA GROUP-CH'].map((name, i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>100</td>
              {[...Array(10)].map((_, j) => (
                <td key={j}><input type="text" className="empty-box" /></td>
              ))}
              <td>0</td>
              <td>0</td>
              <td>-</td>
            </tr>
          ))}
          <tr >
            <td colSpan={12}>Total:</td>
            <td>0</td>
            <td>0</td>
            <td></td>
              </tr>
        </tbody>
      </table>
      
      <div className="actions">
        <button>ADVANCE</button>
        <button>BUY</button>
        <button>CLEAR</button>
        <button>DEPOSIT</button>
        <button>WITHDRAW</button>
        <button>REPORTS</button>
        <button>RESULTS</button>
      </div>
      <div className="yantra-groups">
        <h4>
          NavratnaCoupon.Com | NavratnaYantra.com | GoldeNavratnaCoupon.com
        </h4>
      </div>
    </div>
  );
};

export default GridTable;
