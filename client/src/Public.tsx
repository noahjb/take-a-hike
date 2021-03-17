import React from 'react'

function Public() {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        fetch('/public').then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then((response) => {
            setMessage(response.message);
        })
        .catch((err) => {
            setMessage(err.message);
        });
    }, []);

    return (
        <p>{message}</p>
    );
}

export default Public
