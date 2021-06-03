import React from 'react';
import Navbar from '../components/navbar'
import Toast from '../components/toast'
import './css/index.css'
const Index = () => {
    // console.log(useAuth().user);
    return ( 
        <div className="indexBody">
                    <div id="loading"></div>
            <Toast/>
            <Navbar/>
            <div className="container-fluid h-100" style={{position: "absolute"}}>
                <div className="row h-100">
                    <div className="col-6 p-0 h-100">
                        <div className="wrapper text-center">
                            <img id="image" className="m-2 border-secondary" src="../images/noimage.png" style={{ width : "200px" }} alt="" /> 
                        </div>
                        <div className="card border-secondary mb-3 mx-2">
                            <div id="memberName" className="card-header">Member Details:</div>
                            <div className="card-body">
                                <h4 className="card-title">No Name</h4>
                                <div className="card-text">
                                    <b>
                                        <ul>
                                            <li><span>Rfid: </span> ---rfid----</li>
                                            <li><span>Club: </span> ---club_name----</li>
                                            <li><span>Time Arrived: </span> ---time arrived----</li>
                                        </ul>
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 h-100">
                    <div className="count row">
                        <div className="col-12 black text-black text-center mt-4">
                            <i className="fa fa-4x fa-group"></i>
                        </div>
                        <div className="col-12 black text-black text-center">
                            <span id="increase" className="counter">0</span>
                            {/* <span className="">/100</span> */}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Index;