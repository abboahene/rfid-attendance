import React, {Suspense} from 'react'
import {Link,
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom'
import DashboardTable from '../components/dashboardTable'
import Club from '../pages/Club'
import Event from '../pages/Event'
const Sidebar = () => {

    const loading = (
        <div className="pt-3 text-center" >
          <i className="fa fa-spinner"></i>
        </div>
    )

    let {path,url} = useRouteMatch()
    return ( 
    <>
        <div className="col-3 col-md-2 bg-success shadow p-0">
            <div id="sidebar">
            <div className="list-group bg-secondary">
                <div to="/dashboard" className="list-group-item text-light bg-success  d-flex justify-content-between align-items-center">
                    <span className="h5"><b>KNUST</b> </span><img style={{borderRadius: "50%"}} width="40" src="../images/knustlogo.png" alt="" />
                </div>
                <Link to="/dashboard" className="list-group-item m-0 p-3 font-weight-bold list-group-item-action d-flex justify-content-between align-items-center">
                Dashboard
                <span className="badge badge-success text-success badge-pill">○</span>
                </Link>
                <Link to={`${url}/clubs`} className="list-group-item m-0 p-3 font-weight-bold list-group-item-action d-flex justify-content-between align-items-center">
                Clubs
                <span className="badge badge-success text-success badge-pill">○</span>
                </Link>
                <Link to={`${url}/events`} className="list-group-item m-0 p-3 font-weight-bold list-group-item-action d-flex justify-content-between align-items-center">
                Events
                <span className="badge badge-success text-success badge-pill">○</span>
                </Link>
                <form method="POST" action="http://localhost:3002/attenders/downloadcsv.csv">
                <button type="submit" className="list-group-item h5 m-0 p-3 list-group-item-action d-flex justify-content-between align-items-center"><span className="p-2 rounded" style={{background: "rgb(212, 238, 200)"}}>Export</span></button>
                </form>
            </div>
            </div>
        </div>
        <Suspense fallback = {loading}>
        <Switch>
            <Route exact path={path}> <DashboardTable/> </Route>
            <Route path={`${path}/clubs`}> <Club/> </Route>
            <Route path={`${path}/events`}> <Event/> </Route>
        </Switch>
        </Suspense>
    </>
     )
}
 
export default Sidebar;