import React, {useState, useEffect} from "react"
import { useLocation, Link } from "react-router-dom"
import axios from 'axios'

const Navbar = () => {
    let location = useLocation()
    console.log(location)
    let atDashboard = location.pathname.substr(0,10) === '/dashboard'
    let eventName = location.pathname.split('/').slice(-1)[0].replace('_'," ")
    let [isEnded, setIsEnded] = useState(false)
    console.log('eventName navbar', eventName )

    useEffect(() => {
        if(!atDashboard){
            axios.get(`http://localhost:3002/events/${eventName}/isEnded`).then( res => {
                    setIsEnded(res.data)
                    console.log(isEnded)
            })
        }
    }, [eventName, isEnded, atDashboard]);

    function handleEndEvent() {
        console.log('set ended to true')
            axios.post(`http://localhost:3002/events/${eventName}/end`).then( res => {
                console.log('is_ended is updated to true')
            })

    }
    return ( 
        <>
        <nav className="navbar navbar-light bg-light shadow-sm py-0">
            <span className="navbar-brand p-3"><img style={{borderRadius: "50%"}} width="45" src="../images/knustlogo.png" alt="" /><span className="h3 text-success">RFID - Attendance System</span><br/> 
            </span>
                { !atDashboard ?
                    <Link id="admin" onClick={handleEndEvent} to="/dashboard" className={ isEnded ? "btn btn-outline-danger rounded disabled shadow-sm mr-4" : "btn btn-outline-danger rounded shadow-sm mr-4" }>End Event</Link> : ''
                }
        </nav>
        </>
     );
}
 
export default Navbar;