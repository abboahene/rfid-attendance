import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
          <Route exact path="/"><Redirect to="/dashboard"/></Route>
          <Route path="/dashboard"> <Dashboard/> </Route>
          <Route exact path="/:club_name/:event_name"> <Index/> </Route>  
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
