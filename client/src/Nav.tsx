import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth/Auth';

interface Props {
    auth: Auth;
}

const Nav = (props: Props) => {
    const {isAuthenticated, login, logout} = props.auth;
    return (
        <nav>
            <ul>
            <li><Link to='/'>Home</Link></li> 
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/public'>Public</Link></li>
            {isAuthenticated() && (
            <li><Link to='/private'>Private</Link></li>
            )}
            <li>
                <button onClick={isAuthenticated() ? logout : login}>
                    {isAuthenticated() ? 'Log Out' : 'Log In'}
                </button>
            </li> 
            </ul>
        </nav>
    )
}

export default Nav
