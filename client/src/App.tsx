import React, { useEffect, useState } from 'react';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';
import Auth from './Auth/Auth';
import Callback from './Callback';
import { History, Location, LocationState } from 'history';
import Public from './Public';
import Private from './Private';
import Hikes from './Hikes';
import PrivateRoute from './PrivateRoute';
import AuthContext from './AuthContext';
import PublicRoute from './PublicRoute';

interface Props {
  history: History<LocationState>;
  location: Location;
}

function App(props: Props) {
  let [msg, setMsg] = useState('Loading');
  let [auth, setAuth] = useState(new Auth(props.history));
  let [isTokenRenewalComplete, setIsTokenRenewalComplete] = useState(false);
  
  useEffect(() => {
    fetch('/api')
    .then(async res => {
      setMsg(await res.text());
      console.log(`Message from server: ${msg}`);
    });
  }, [msg]);

  useEffect(() => {
    console.log('renewing token');
    auth.renewToken(() => setIsTokenRenewalComplete(true));
  }, []);

  if (!isTokenRenewalComplete) {
    return <>'Loading...'</>;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Nav auth={auth} />
      <div className='body'>
        <PublicRoute path='/' exact component={Home} />
        <PublicRoute path='/callback' component={Callback} />
        <PrivateRoute path='/profile' component={Profile} />
        <PublicRoute path='/public' exact component={Public} />
        <PrivateRoute path='/private' component={Private} />
        <PrivateRoute path='/hike' component={Hikes} scopes={['read:hikes']} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
