import React, { Suspense } from 'react';
import { Switch, Route } from "react-router-dom";
import  routes from '../routes';

function Content() {

  const loading = (
    <div className="pt-3 text-center">
        <i className="fa fa-spinner"></i>
    </div>
  )

  return (
    <div className="fade-in">
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, index) =>
            <Route
              key={index}
              {...route}
            />
          )}
      </Switch>
      </Suspense>
    </div>
  );
}

export default Content;
