// @ts-nocheck

import React from 'react';
import './App.css';
import { PortfolioTable } from './components/PortfolioTable';
import { useStoreActions, useStoreState } from './store/StoreFront';

function App() {


  const sock = new WebSocket('ws://localhost:3002');
  sock.onopen = () => {
    console.info('connected to socket')
  }

  sock.onmessage = (message) => {
    console.info(message);
  }


  return (
    <div>
      <h1>SEC Project</h1>
      Learn React
      <PortfolioTable />
      {/* <CoinHistory /> */}
    </div>
  );
}

export default App;
