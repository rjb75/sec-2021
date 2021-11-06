import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const sock = new WebSocket("ws://localhost:3002");
  sock.onopen = () => {
    console.info("connected to socket");

    const test = {
      action: "create-portfolio",
      payload: {
        title: "portfolio-title",
        watchList: ["Hey", "ho"],
      },
    };
    sock.send(JSON.stringify(test));
  };

  sock.onmessage = (message) => {
    console.info(message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
