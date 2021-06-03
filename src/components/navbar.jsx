import { useLocation, Link } from "react-router-dom"

const Navbar = () => {
    let location = useLocation()
    let checkMatch = location.pathname === '/'
    return ( 
        <>
        <nav className="navbar navbar-light bg-light mb-2">
            <span className="navbar-brand mb-0 h1"><strong>RFID - Attendance System</strong><br/> 
                { checkMatch ?<span id="event_title" className="badge text-white bg-primary"></span> : ''} <br/>
                { checkMatch ?<span id="club_name" className="badge text-primary bg-light"></span> : ''}
            </span>
                { checkMatch ?
                    <Link id="admin" to="/dashboard" className="btn btn-outline-primary">Admin</Link> : 
                    <Link id="admin" to="/" className="btn btn-outline-primary">Home</Link>
                }
        </nav>
        </>
     );
}
 
export default Navbar;