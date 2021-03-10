import auth0 from 'auth0-js';
import { History, LocationState } from 'history';

const REDIRECT_ON_LOGIN = 'redirect_on_login';

class Auth {
    history: History<LocationState>;
    auth0: auth0.WebAuth;
    userProfile: auth0.Auth0UserProfile | null;
    requestedScopes = 'openid profile email read:hikes';
    constructor(history: History) {
        this.history = history;
        this.userProfile = null;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            responseType: 'token id_token',
            scope: this.requestedScopes
        });
    }

    login = () => {
        // Capture where in the app we were prior to authentication
        // so that the user isn't always re-routed to the home page
        localStorage.setItem(
            REDIRECT_ON_LOGIN,
            JSON.stringify(this.history.location)
        );
        this.auth0.authorize();
    };

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                const locationFromStorage = localStorage.getItem(REDIRECT_ON_LOGIN);
                const redirectLocation = locationFromStorage ? JSON.parse(locationFromStorage) : '/';
                this.history.push(redirectLocation);
            } else if (err) {
                this.history.push('/');
                alert(`Error: ${err.error}. Check the console for further details.`);
                console.log(err);
            }
            localStorage.removeItem(REDIRECT_ON_LOGIN);
        });
    };

    setSession = (authResult: auth0.Auth0DecodedHash) => {
        // set access token expiration time
        const expiresAt = JSON.stringify(authResult.expiresIn! * 1000 + new Date().getTime());

        // If there is a value on the `scope` param from the authResult,
        // use it to set scopes in the session for the user. Otherwise
        // use the scopes as requested. If no scopes were requested,
        // set it to nothing
        const scopes = authResult.scope || this.requestedScopes || '';

        localStorage.setItem('access_token', authResult.accessToken!);
        localStorage.setItem('id_token', authResult.idToken!);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
    };

    isAuthenticated = () : boolean => {
        const expiresAt = localStorage.getItem('expires_at');
        return expiresAt ? new Date().getTime() < JSON.parse(expiresAt) : false;
    };

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('scopes');
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

    userHasScopes = (scopes: string[]) => {
        const grantedScopes = JSON.parse(localStorage.getItem('scopes') || '').split(' ');
        return scopes.every(scope => grantedScopes.includes(scope));
    }
}

export default Auth;
