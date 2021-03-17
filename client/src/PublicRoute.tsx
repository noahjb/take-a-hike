import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import AuthContext from './AuthContext';

interface PublicRouteProps extends RouteProps {
    component: React.ComponentType<any>
}

const PublicRoute = ({component: Component, ...rest}: PublicRouteProps) => {
    const auth = React.useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props => {
                if (Component) {
                    return <Component auth={auth} {...props} />
                }
            }}
        />
    );
}

export default PublicRoute;
