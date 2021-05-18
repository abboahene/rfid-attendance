import React from 'react'
import axios from 'axios'
import {useEffect, useState, useRef} from 'react'

const DashboardTable = (props) => {

    let [dataRows, setDataRows] = useState()
    let [eventSelectElement, setEventSelectElement] = useState()
    let [clubSelectElement, setClubSelectElement] = useState()
    let [eventName, setEventName] = useState()
    let [clubName, setClubName] = useState()
    let [eventDate, setEventDate] = useState()

    let selectedClubName = useRef()
    let selectedEventTitle = useRef()
    
    useEffect(() => {
        axios.get('http://localhost:3002/attenders/lastest/event').then((res)=>{
            console.log(res.data)
            if(res.data.attenders.length > 0){
                setEventName(  () => res.data.attenders[0].event_title )
                setClubName(  () => res.data.attenders[0].club_name )
                setEventDate(  () => new Date(res.data.attenders[0].createdAt).toDateString() )
                setDataRows(res.data.attenders.map((attender) => {
                    return <tr key={attender._id}>
                        <th scope="row">{attender.member_name}</th>
                        <td>{ new Date(attender.createdAt).toLocaleString().split(',')[1]}</td>
                        <td>@{attender.rfid}</td>
                    </tr>
                }))
            }else{
                setDataRows([1].map((attender) => {
                    return <tr key="nodata"><td span="3">NO DATA</td></tr>
                }))
            }
            setEventSelectElement(res.data.events.map((event) => {

                return <option key={event._id} value={event.title}>{event.title}</option>
            }))
            setClubSelectElement(res.data.clubs.map((club) => {

                return <option key={club._id} value={club.name}>{club.name}</option>
            }))
        }).catch((err) => {
            console.log(err)
        })
        
    }, [])

    ///function
    function getAttendersByClubAndEvent(){
        axios.get(`http://localhost:3002/attenders/${selectedClubName.current.value}/${selectedEventTitle.current.value}/all`).then((res)=>{
            console.log(res.data)
            if(res.data.length > 0){
                setEventName(  () => res.data.event_title )
                setEventDate(  () => new Date(res.data.createdAt).toDateString() )
                setDataRows(res.data.map((attender) => {
                    return <tr key={attender._id}>
                        <th scope="row">{attender.member_name}</th>
                        <td>{ new Date(attender.createdAt).toLocaleString().split(',')[1]}</td>
                        <td>@{attender.rfid}</td>
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
    
    return ( 
        <>
        <form className="pull-right">
            <fieldset>
                <div className="form-group">
                    <label className="form-label mt-4 mx-2">choose class</label>
                    <select className="form-select p-2" defaultValue={clubName} ref={selectedClubName} id="selected_club_name">
                        {clubSelectElement}
                    </select>

                    <label className="form-label mt-4 mx-2">choose course</label>
                    <select className="form-select p-2" defaultValue={eventName} ref={selectedEventTitle} id="selected_club_name">
                        {eventSelectElement}
                    </select>
                    <input className="ml-3" type="button" value="Find" onClick={getAttendersByClubAndEvent} />
                </div>
            </fieldset>
        </form>
        <table title="tilel" className="table table-hover table-lights table-striped">
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
        </>
     );
}
 
export default DashboardTable;