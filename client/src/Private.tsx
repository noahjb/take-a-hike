import React from 'react'
import Auth from './Auth/Auth';

interface Props {
    auth: Auth;
}

function Private(props: Props) {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        fetch('/private', {
            headers: { Authorization: `Bearer ${props.auth.getAccessToken()}`}
        }).then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        }).then((response) => {
            setMessage(response.message);
        }).catch((err) => {
            setMessage(err.message);
        });
    }, [props.auth]);

    return (
        <p>{message}</p>
    );
}

export default Private
