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
                            <a href='/' className="list-group-item text-light bg-primary list-group-item-action d-flex justify-content-between align-items-center">
                            Export
                            </a>
                        </div>
                        </div>
                    </div>

                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <canvas id="myChart"></canvas>
                            </div>
                            <div className="col-3">
                                <div className="row h-100">
                                    <div className="col-12 my-3 h-45 w-100 border border-primary">
                                        <i className="fa fa-user"></i> <h1>2121</h1>
                                    </div>
                                    <div className="col-12 my-1 mb-4 h-45 w-100 border border-primary">
                                        <i className="fa fa-user"></i> <h1>2121</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* //table */}
                        <DashboardTable/>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Dashboard;