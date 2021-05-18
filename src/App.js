import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
// const Login = React.lazy(() => import('./pages/auth/Login'));

function App() {

  const loading = (
    <div className="pt-3 text-center" >
      <i className="fa fa-spinner"></i>
    </div>
  )

  return (
    <Router>
      <Suspense fallback = {loading}>
        <Switch>
          <Route path="/" exact> <Index/> </Route>
          <Route path="/dashboard"> <Dashboard/> </Route>
          <Route path="/dashboard/ma"> <Dashboard/> </Route>
          {/* <PrivateRoute path="/home"> <Layout/> </PrivateRoute> */}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
