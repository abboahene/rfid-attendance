import React from 'react';
import Navbar from '../components/navbar'
import Toast from '../components/toast'
import './css/index.css'
const Index = () => {
    // console.log(useAuth().user);
    return ( 
        <>
                    <div id="loading"></div>
            <Toast/>
            <Navbar/>
            <div className="container">
                <div className="wrapper text-center">
                    <img id="image" className="m-2" src="../images/noimage.png" style={{ width : "200px" }} alt="" /> 
                </div>
                <div className="count row mt-3">
                    <div className="col-12 black text-black text-center mt-4">
                        <i className="fa fa-4x fa-group"></i>
                    </div>
                    <div className="col-12 black text-black text-center">
                        <span id="increase" className="counter">0</span>
                        {/* <span className="">/100</span> */}
                    </div>
                    
                </div>
            </div>
        </>
     );
}
 
export default Index;