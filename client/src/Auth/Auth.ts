import auth0 from 'auth0-js';
import { History, LocationState } from 'history';

class Auth {
    history: History<LocationState>;
    auth0: auth0.WebAuth;
    userProfile: auth0.Auth0UserProfile | null;
    constructor(history: History) {
        this.history = history;
        this.userProfile = null;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            responseType: 'token id_token',
            scope: 'openid profile email'
        });
    }

    login = () => {
        this.auth0.authorize();
    };

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.history.push('/');
            } else if (err) {
                this.history.push('/');
                alert(`Error: ${err.error}. Check the console for further details.`);
                console.log(err);
            }
        });
    };

    setSession = (authResult: auth0.Auth0DecodedHash) => {
        // set access token expiration time
        const expiresAt = JSON.stringify(authResult.expiresIn! * 1000 + new Date().getTime());

        localStorage.setItem('access_token', authResult.accessToken!);
        localStorage.setItem('id_token', authResult.idToken!);
        localStorage.setItem('expires_at', expiresAt);
    };

    isAuthenticated = () : boolean => {
        const expiresAt = localStorage.getItem('expires_at');
        return expiresAt ? new Date().getTime() < JSON.parse(expiresAt) : false;
    };

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.userProfile = null;
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: 'http://localhost:3000'
        });
    };

    getAccessToken = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }

    getProfile = (cb: (profile: auth0.Auth0UserProfile, err?: auth0.Auth0Error | null | undefined) => void) => {
        if (this.userProfile) {
            return cb(this.userProfile);
        }

        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }

            cb(profile, err);
        });
    }
}

export default Auth;
