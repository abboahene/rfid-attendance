import Navbar from '../components/navbar'
import Toast from '../components/toast'
import './css/index.css'
const Index = () => {

    return ( 
        <div className="indexBody">
                    <div id="loading"></div>
            <Toast/>
            <Navbar/>
            <div className="container-fluid d-flex justify-content-center" style={{height: "85%"}}>
            <div className="container-fluid m-3 d-flex flex-column justify-content-center">
                <div className="pb-3 mx-5">
                <h4 className="m-0 mb-1">Club: <span id="club_name">KNUST</span></h4>
                <h4 className="m-0">Event: <span id="event_title">KNUST</span></h4>
                </div>
                <div className="row h-75 mx-5">
                    <div className="col-7 p-0 h-100 rounded shadow-sm d-flex flex-column justify-content-center">
                        <div className="wrapper text-center">
                            <img id="image" className="m-2 shadow rounded" src="../images/noimage.png" style={{ width : "200px" }} alt="" /> 
                        </div>
                        <div className="card shadow rounded mb-3 mx-5">
                            <div id="memberName" className="card-header">Attender Details:</div>
                            <div className="card-body">
                                <h4 className="card-title">No Name</h4>
                                <div className="card-text">
                                    <b>
                                        <ul>
                                            <li><span>Rfid: </span> ---rfid----</li>
                                            <li><span>Club: </span> ---club_name----</li>
                                            <li><span>Time Arrived: </span><b>---time arrived----</b></li>
                                        </ul>
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-5 h-100 d-flex flex-column justify-content-center" >
                    <div className="count row ml-2 rounded shadow h-100 d-flex flex-column justify-content-center">
                        <div className="black text-black text-center mt-4">
                            <i className="fa fa-4x fa-group"></i>
                        </div>
                        <div className="black text-black text-center">
                            <span id="increase" className="counter text-success">0</span>
                            {/* <span className="">/100</span> */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default Index;