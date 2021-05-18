import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useAuth } from '../contexts/authContext';

const PrivateRoute = ({children, ...rest}) => {

    return (
      <Route
        {...rest}
        render={({ location }) =>
          true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}
 
export default PrivateRoute;