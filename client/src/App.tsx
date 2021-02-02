import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';

function App() {
  let [msg, setMsg] = useState('Loading');
  
  fetch('/api')
  .then(async res => {
    setMsg(await res.text());
    console.log(`Message from server: ${msg}`);
  });

  return (
    <>
      <Nav />
      <div className='body'>
        <Route path='/' exact component={ Home } />
        <Route path='/profile' component={ Profile } />
      </div>
    </>
  );
}

export default App;
