import React from 'react';
import Auth from './Auth/Auth';
import { Link } from 'react-router-dom';

interface Props {
    auth: Auth;
}

const Home = (props: Props) => {
    const { isAuthenticated, login } = props.auth;
    return (
        <div>
            <h1>Home</h1>
            { isAuthenticated() ?
                <Link to='/profile'>View Profile</Link> :
                <button onClick={login}>Log In</button>
            }
        </div>
    )
}

export default Home
