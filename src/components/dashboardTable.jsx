import React from 'react'
import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import DashboardGraph from './dashboardGraph'

const DashboardTable = () => {

    let [dataRows, setDataRows] = useState()
    let [eventSelectElement, setEventSelectElement] = useState()
    let [clubSelectElement, setClubSelectElement] = useState()
    let [eventName, setEventName] = useState()
    let [clubName, setClubName] = useState()
    let [eventDate, setEventDate] = useState()
    let [attenderCount, setAttenderCount] = useState(0)
    
    let selectedClubName = useRef()
    let selectedEventTitle = useRef()
    
    useEffect(() => {
        axios.get('http://localhost:3002/attenders/lastest/event').then((res)=>{
            console.log('data here', res.data)
            setEventName( () => res.data.events[0].name )
            setClubName( res.data.events[0].club_name )
            setEventDate( () => new Date(res.data.attenders[0].createdAt).toDateString() )

            if(res.data.attenders.length > 0){
                setAttenderCount( () => res.data.attenders.length )
                setDataRows(res.data.attenders.map((attender) => {
                    //create html options
                    return <tr key={attender._id}>
                        <th scope="row">{attender.member_name}</th>
                        <td>{ new Date(attender.createdAt).toLocaleString().split(',')[1]}</td>
                        <td>@{attender.member_rfid}</td>
                    </tr>
                }))
            }else{
                setDataRows([1].map((attender) => {
                    return <tr key="nodata"><td span="3">NO DATA</td></tr>
                }))
            }

            // set html options
            setEventSelectElement(res.data.events.map((event) => {
                
                return event.club_name === clubName ? <option key={event._id} value={event.name}>{event.name}</option> : ''
            }))
            setClubSelectElement(res.data.clubs.map((club) => {

                return <option key={club} value={club}>{club}</option>
            }))
        }).catch((err) => {
            console.log(err)
        })
        
    }, [clubName])

    ///function
    function getAttendersByClubAndEvent(){
        axios.get(`http://localhost:3002/attenders/${selectedClubName.current.value}/${selectedEventTitle.current.value}/all`).then((res)=>{
            console.log(res.data)
            setEventName(  () => selectedEventTitle.current.value )
            setEventDate(  () => '--Date--' )
            if(res.data.length > 0){
                setEventDate(  () => new Date(res.data[0].createdAt).toDateString() )
                setAttenderCount( () => res.data.length )

                setDataRows(res.data.map((attender) => {
                    //create html rows
                    return <tr key={attender._id}>
                        <th scope="row">{attender.member_name}</th>
                        <td>{ new Date(attender.createdAt).toLocaleString().split(',')[1]}</td>
                        <td>@{attender.member_rfid}</td>
                    </tr>
                }))
            }else{
                setDataRows([1].map((attender) => {
                    
                    return <tr key="nodata"><td span="3">NO DATA</td></tr>
                }))
            }

        }).catch((err) => {
            console.log(err)
        })

    }

    function getEventsForSelectedClub(){
        axios.get(`http://localhost:3002/events/${selectedClubName.current.value}`).then((res)=>{
            console.log(res.data)
            setEventSelectElement(res.data.map((event) => {

                return <option key={event._id} value={event.name}>{event.name}</option>
            }))
        })
    }
    
    return ( 
        <>
        <div className="col-9 col-md-10 p-5">
            
            <DashboardGraph  clubName={selectedClubName.current !== undefined ? selectedClubName.current.value : clubName}/>
            <form className="pull-right">
                <fieldset>
                    <div className="form-group">
                        <label className="form-label mt-4 mx-2">choose club:</label>
                        <select className="form-select p-2" onChange={getEventsForSelectedClub} defaultValue={clubName} ref={selectedClubName} id="selected_club_name">
                            {clubSelectElement}
                        </select>

                        <label className="form-label mt-4 mx-2">choose event:</label>
                        <select className="form-select p-2" defaultValue={eventName} ref={selectedEventTitle} id="selected_club_name">
                            {eventSelectElement}
                        </select>
                        <input className="ml-3 btn btn-success shadow-sm rounded" type="button" value={`See Attenders (${attenderCount})`} onClick={getAttendersByClubAndEvent} />
                    </div>
                </fieldset>
            </form>
            <table className="table table-hover table-lights table-striped shadow-sm rounded">
                <thead>
                    <tr> 
                        <th scope="col">Name</th>
                        <th scope="col">Time <span className="badge badge-light">({eventDate})</span></th>
                        <th scope="col">RfId |→ <span>{eventName}</span> </th>
                    </tr>
                </thead>
                <tbody>
                    {dataRows}
                </tbody>
            </table>
        </div>
        </>
     );
}
 
export default DashboardTable;