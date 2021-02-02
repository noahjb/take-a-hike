import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    
}

const Nav = (props: Props) => {
    return (
        <nav>
            <ul>
            <li><Link to='/'>Home</Link></li> 
            <li><Link to='/profile'>Profile</Link></li> 
            </ul>
        </nav>
    )
}

export default Nav
