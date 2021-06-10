import React from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

const Dashboard = () => {   
    return ( 
        <>
        <Navbar/>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>                                          
                </div>
            </div>
        </>
     );
}
 
export default Dashboard;