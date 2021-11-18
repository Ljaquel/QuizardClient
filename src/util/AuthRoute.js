import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { contextUserId } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        !contextUserId ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

function NoAuthRoute({ component: Component, ...rest }) {
  const { contextUserId } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        contextUserId ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export { AuthRoute, NoAuthRoute };