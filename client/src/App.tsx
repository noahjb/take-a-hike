import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateHikeButton from './components/CreateHikeButton';
import Header from './components/Header';
import Hikes from './components/Hikes';
import Homepage from './components/Homepage';
import MainContent from './components/MainContent';
import NavLinks from './components/NavLinks';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import SiteLogo from './components/SiteLogo';
import NewHike from './components/NewHike';

function App() {
  return (
    <Router>
      <div>
        <Header>
          <SiteLogo />
          <NavLinks />
          <CreateHikeButton />
          <Notifications />
          <Profile />
        </Header>
        <Homepage
          mainContent={
            <MainContent>
              <Switch>
                <Route path='/create'>
                  <NewHike />
                </Route>
                <Route path='/profile'>
                  <h2>Profile</h2>
                </Route>
                <Route path='/'>
                  <Hikes />
                </Route>
              </Switch>
            </MainContent>
          }
          />
      </div>
    </Router>
  );
}

export default App;
