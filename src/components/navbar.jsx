import { useLocation, Link } from "react-router-dom"

const Navbar = () => {
    let location = useLocation()
    let checkMatch = location.pathname === '/'
    return ( 
        <>
        <nav className="navbar navbar-light bg-light shadow-sm py-0">
            <span className="navbar-brand p-3"><img style={{borderRadius: "50%"}} width="45" src="../images/knustlogo.png" alt="" /><span className="h3 text-success">RFID - Attendance System</span><br/> 
                {/* { checkMatch ?<span id="event_title" className="badge text-white bg-primary"></span> : ''} <br/>
                { checkMatch ?<span id="club_name" className="badge text-primary bg-light"></span> : ''} */}
            </span>
                { checkMatch ?
                    <Link id="admin" to="/dashboard" className="btn btn-outline-success rounded shadow-sm">Admin</Link> : 
                    <Link id="admin" to="/" className="btn btn-outline-success rounded shadow-sm">Home</Link>
                }
        </nav>
        </>
     );
}
 
export default Navbar;