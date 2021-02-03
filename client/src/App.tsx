import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';
import Auth from './Auth/Auth';
import Callback from './Callback';
import { History, Location, LocationState } from 'history';

interface Props {
  history: History<LocationState>;
  location: Location;
}

function App(props: Props) {
  let [msg, setMsg] = useState('Loading');
  let [auth, setAuth] = useState(new Auth(props.history));
  
  useEffect(() => {
    fetch('/api')
    .then(async res => {
      setMsg(await res.text());
      console.log(`Message from server: ${msg}`);
    });
  }, [msg]);

  return (
    <>
      <Nav />
      <div className='body'>
        <Route path='/' exact render={ props => <Home auth={auth} {...props} /> } />
        <Route path='/callback' exact render={ props => <Callback auth={auth} {...props} /> } />
        <Route path='/profile' component={ Profile } />
      </div>
    </>
  );
}

export default App;
