import { Auth0UserProfile } from 'auth0-js';
import React from 'react';
import Auth from './Auth/Auth';

interface Props {
    auth: Auth;
}

const Profile = (props: Props) => {
    const [profile, setProfile] = React.useState<Auth0UserProfile | null>(null);
    const [error, setError] = React.useState<string | undefined>('');

    const loadUserProfile = () => {
        props.auth.getProfile((userProfile, err) => {
            setProfile(userProfile);
            setError(err?.error);
        });
    };

    React.useEffect(() => {
        loadUserProfile();
    });

    if (!profile) {
        return null;
    }

    return (
        !error
        ?
            <>
                <h1>Profile</h1>
                <p>{profile.nickname}</p>
                <img src={profile.picture} alt='profile' style={{ maxWidth: 50, maxHeight: 50}} />
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            </>
        :
            <p>{error}</p>
    )
}

export default Profile
