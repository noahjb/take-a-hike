import React, { useEffect } from 'react';
import Auth from './Auth/Auth';
import { Location } from 'history';

interface Props {
    auth: Auth;
    location: Location;
}

const Callback = (props: Props) => {
    // Replaces componentDidMount in functional comps.
    useEffect(() => {
        if (/access_token|id_token|error/.test(props.location.hash)) {
            props.auth.handleAuthentication();
        } else {
            throw new Error('Invalid callback URL');
        }
    }, []);

    return (
        <h1>
            Loading...
        </h1>
    )
}

export default Callback;
