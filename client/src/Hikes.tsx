import React from 'react'
import Auth from './Auth/Auth';

interface Props {
    auth: Auth;
}

interface IHike {
    id: number;
    title: string;
}

function Hikes(props: Props) {
    const [hikes, setHikes] = React.useState<IHike[]>([]);

    React.useEffect(() => {
        fetch('/hike', {
            headers: { Authorization: `Bearer ${props.auth.getAccessToken()}`}
        }).then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        }).then((response) => {
            setHikes(response.hikes);
        }).catch((err) => {
            console.log(err);
        });

        fetch('/admin', {
            headers: { Authorization: `Bearer ${props.auth.getAccessToken()}`}
        }).then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }, [props.auth]);

    return (
        <ul>
            {hikes.map(hike => {
                return <li key={hike.id}>{hike.title}</li>
            })}
        </ul>
    );
}

export default Hikes
