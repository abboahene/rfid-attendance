import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import CudModal from '../components/cudModal'
const Event = () => {
    const [clubsAndEvents, setClubsAndEvents] = useState([])
    const [reload, setReload] = useState(false)
    console.log(useLocation())
    function reloadEvent() {
        setReload(!reload)
    }

    useEffect(() => {
        axios.get('http://localhost:3002/clubs_and_events').then( res => {
            setClubsAndEvents(res.data)
        }).catch(err => {
            console.log(err)
        })       
    }, [reload]);

    ///for modal
    let inputFormRef  = useRef(null)
    const [modal, setModal] = useState({});
    const modal_add = { 
        title: 'Add Event',
        body:<form ref={inputFormRef}>
                <input type="text" className="form-control" placeholder="Enter New Event Name" id="inputDefault"/>
                <label className="form-label mt-4">Select Club: </label>
                <select className="form-select p-2 mt-2" style={{minWidth: '100px'}}>
                    {clubsAndEvents.map((club, index) => <option key={index}> {Object.keys(club)[0]} </option>)}                   
                </select>
            </form>,
        action: 'add',
        event: { name: '', club_name: ''}
    }
    const modal_update = { 
        title: 'Update Event',
        body: <input type="text"/>,
        action: 'update', 
        event: {name: '', club_name: ''}
    }
    const modal_delete = { 
        title: 'Delete Event',
        body: <p>Are you sure you want to delete?</p>,
        action: 'delete',
        event: {name: '', club_name: ''} 
    }
    ///for modal
    
    ///======handle button clicks
    function buttonAdd() {
        setModal(modal_add)
    }
    function buttonUpdate(event) { 
        console.log(event)
        modal_update.body = <form ref={inputFormRef}>
                                <label className="form-label mt-4">Enter new event name:</label>
                                <input type="text" className="form-control" placeholder={event.name} id="inputDefault"/>
                                <label className="form-label mt-4">Club: </label>
                                <select className="form-select p-2 mt-2 mr-2" disabled value={event.club_name} onChange={()=>{}} style={{minWidth: '100px'}}>
                                    <option key={1} value={event.club_name}>{event.club_name}</option>)                 
                                </select>
                            </form>
        modal_update.event = event
        setModal(modal_update)
    }
    function buttonDelete(event) {
        modal_delete.body = <p>Are you sure you want to delete <b>{event.name}?</b></p>
        modal_delete.event = event 
        setModal(modal_delete)
    }
    ///======handle button clicks

    function createEventNameClubNameFileOnServer(eventName, clubName) {
        axios.get(`http://localhost:3002/create/${eventName}/${clubName}/file`)
    }
    
    return ( 
        <div className="col-9 col-md-10 p-5">
            <h1 className="text-success">Events</h1>
            <CudModal title={modal.title} body={modal.body} action={modal.action} event={modal.event} reload={reloadEvent}/>
            <button onClick={ buttonAdd } className={`btn btn-sm btn-success rounded shadow-sm mr-1 mb-2 pull-right`} data-toggle="modal" data-target="#cudModal">Add Event <i className="fa fa-plus"></i></button>
            <table className="table table-lights table-striped shadow-sm rounded">
                <thead>
                    <tr className="text-center"> 
                        <th scope="col">Club Name</th>
                        <th scope="col pull-right">
                            <span className="text-warning">Events</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {clubsAndEvents.map( (club, index) => {
                        console.log(club)
                        let clubName = Object.keys(club)[0]
                        return  <tr key={clubName} className="text-center">
                                    <td>{clubName}</td>
                                    <td>
                                        <div id="accordion" style={{minWidth: '300px'}}>
                                            <div className="card">
                                                <div id="headingOne">
                                                <h5 className="mb-0">
                                                    <div className={index > 0 ? 'btn btn-link text-success collapsed' : 'btn btn-link text-success'} data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                                     open#
                                                    </div>
                                                </h5>
                                                </div>

                                                <div id={`collapse${index}`} className={index === 0 ? 'collapse show': 'collapse'} aria-labelledby={`heading${index}`} data-parent="#accordion">
                                                <div className="card-body text-left py-0">
                                                <ul className="p-0">
                                                {club[clubName].length < 1 ? <li key="noEvents" className="d-flex justify-content-between border-top">No Event(s)</li> : ''}
                                            
                                                {
                                                    club[clubName].map(event => {
                                                       return <li key={event.name} value={event.name} className={`d-flex justify-content-between border-top`}>
                                                            {event.name}
                                                            <div className="">
                                                            <Link onClick={() => createEventNameClubNameFileOnServer(event.name,clubName)} to={`/${clubName.replace(' ', '_')}/${event.name.replace(' ', '_')}`} className={event.is_ended ? `btn btn-sm btn-info rounded shadow-sm border my-1 mr-2 p-2 disabled` : `btn btn-sm btn-info rounded shadow-sm border my-1 mr-2 p-2`} ><i className="fa fa-clock-o"> Take Attendance</i>
                                                            </Link>
                                                            <button onClick={ () => buttonUpdate(event) } className={event.is_ended ? `btn btn-sm btn-warning rounded shadow my-1 mr-2 p-2 disabled` : `btn btn-sm btn-warning rounded shadow my-1 mr-2 p-2`} data-toggle="modal" data-target="#cudModal"><i className="fa fa-edit"></i>
                                                            </button>
                                                            <button onClick={ () => buttonDelete(event) } className={event.is_ended ? `btn btn-sm btn-danger rounded shadow my-1 p-2 disabled` : `btn btn-sm btn-danger rounded shadow my-1 p-2`} data-toggle="modal" data-target="#cudModal"><i className="fa fa-minus"></i>
                                                            </button>
                                                            </div>
                                                        </li>
                                                        
                                                    })
                                                }

                                                </ul>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                    })}
                </tbody>
            </table>
        </div>
     );
}
 
export default Event;