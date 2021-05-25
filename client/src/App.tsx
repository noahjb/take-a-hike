import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [msg, setMsg] = useState('Loading');
  
  fetch('/api/hikes')
  .then(async res => {
    const response = await res.json();
    setMsg(response.data[0].title);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {msg}
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
