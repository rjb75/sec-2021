import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useStoreActions, useStoreState } from './store/StoreFront';

function App() {
  const sock = new WebSocket("ws://localhost:3002");
  sock.onopen = () => {
    console.info("connected to socket");

    };

  const isClick = useStoreState((store) => {
    return store.testingModel.isClick;
  })
  const {toggleClick} = useStoreActions((action) => {
    return action.testingModel;
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick= {() => toggleClick()}
        >
          Learn React
          {console.log(isClick)}
        </button>
      </header>
    </div>
  );
}

export default App;
