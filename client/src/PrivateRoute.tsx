import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import AuthContext from './AuthContext';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>
    scopes?: string[]
}

const PrivateRoute = ({component: Component, scopes, ...rest}: PrivateRouteProps) => {
    const auth = React.useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props => {
                // 1. Redirect to login if not logged in
                if (!auth.isAuthenticated()) {
                    auth.login();
                    return null;
                }

                // 2. Display message if user lacks required scope(s)
                if (scopes && scopes.length > 0 && !auth.userHasScopes(scopes)) {
                    return (
                        <h1>
                            Unauthorized - you need the following scope(s) to view this page:{' '}
                            {scopes.join(',')}.
                        </h1>
                    )
                }

                if (Component) {
                    // 3. Render component
                    return <Component auth={auth} {...props} />
                }
            }}
        />
    );
};

export default PrivateRoute;
