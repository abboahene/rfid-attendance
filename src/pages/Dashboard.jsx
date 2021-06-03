import React from 'react'
import Navbar from '../components/navbar'
import DashboardTable from '../components/dashboardTable'
const Dashboard = () => {   

    return ( 
        <>
            <Navbar/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 bg-primary p-0">
                        <div   id="sidebar">
                        <div className="list-group">
                            <div href='/' className="list-group-item text-light bg-primary  d-flex justify-content-between align-items-center">
                                <span><b>KNUST</b> </span><img style={{borderRadius: "50%"}} width="40" src="../images/knustlogo.png" alt="" />
                            </div>
                            <a href='/' className="list-group-item text-light bg-primary list-group-item-action d-flex justify-content-between align-items-center">
                            Dashboard
                            <span className="badge text-light badge-light badge-pill">14</span>
                            </a>
                            <form method="POST" action="http://localhost:3002/attenders/downloadcsv.csv">
                            <button type="submit" className="list-group-item text-light bg-primary list-group-item-action d-flex justify-content-between align-items-center">Export</button>
                            </form>
                        </div>
                        </div>
                    </div>

                    
                        {/* //table */}
                        <DashboardTable/>
                    
                </div>
            </div>
        </>
     );
}
 
export default Dashboard;