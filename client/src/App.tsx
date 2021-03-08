import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';
import Auth from './Auth/Auth';
import Callback from './Callback';
import { History, Location, LocationState } from 'history';
import Public from './Public';
import Private from './Private';
import Hikes from './Hikes';

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
      <Nav auth={auth} />
      <div className='body'>
        <Route path='/' exact render={ props => <Home auth={auth} {...props} /> } />
        <Route path='/callback' exact render={ props => <Callback auth={auth} {...props} /> } />
        <Route path='/profile' render={ props => auth.isAuthenticated() ? <Profile auth={auth} {...props} /> : <Redirect to='/' />} />
        <Route path='/public' exact component={Public} />
        <Route
          path='/private'
          render={ props => 
            auth.isAuthenticated() ?
            <Private auth={auth} {...props} /> :
            <>{auth.login()}</>
          }
        />
        <Route
          path='/hike'
          render={ props => 
            auth.isAuthenticated() &&
            auth.userHasScopes(['read:hikes']) ?
            <Hikes auth={auth} {...props} /> :
            <>{auth.login()}</>
          }
        />
      </div>
    </>
  );
}

export default App;
