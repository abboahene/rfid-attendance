import React from 'react'
import axios from 'axios'

const CudModal = ({title, body, action, club, reload, event }) =>{

    //-------------//
    let btnType = action === 'update' ? 'btn-warning':
                  action === 'add' ? 'btn-success':
                  action === 'delete' ? 'btn-danger' : 'btn-primary'

    // *********Club Operations**********
    //----------addClub
    function addClub() {
        console.log(body.ref.current.value)
        axios.post('http://localhost:3002/club',{ name: body.ref.current.children[0].value })
        .then( res => {
            console.log('added',res.data)
            reload()// to reload the club component and run useEffect again
        }).catch( err => console.log(err))
    }
    //----------updateClub
    function updateClub() {
        axios.post(`http://localhost:3002/clubs/update/${club.name}`, { name: body.ref.current.children[1].value })
        .then( res => {
            console.log('updated',res.data)
            reload()
        }).catch( err => console.log(err))
    }
    //----------deleteClub
    function deleteClub() {
        axios.post(`http://localhost:3002/clubs/delete/${club.name}`)
        .then( res => {
            console.log('deleted',res.data)
            reload()
        }).catch( err => console.log(err))
    }
    // *********End Club Operations**********

    // *********Event Operations**********
    //----------addClub
    function addEvent() {
        axios.post('http://localhost:3002/event',{ name: body.ref.current.children[0].value, club_name: body.ref.current.children[2].value })
        .then( res => {
            console.log('added',res.data)
            reload()// to reload the club component and run useEffect again
        }).catch( err => console.log(err))
    }
    //----------updateClub
    function updateEvent() {
        axios.post(`http://localhost:3002/events/update/${event.name}`, { name: body.ref.current.children[1].value })
        .then( res => {
            console.log('updated',res.data)
            reload()
        }).catch( err => console.log(err))
    }
    //----------deleteClub
    function deleteEvent() {
        axios.post(`http://localhost:3002/events/delete/${event.name}`)
        .then( res => {
            console.log('deleted',res.data)
        }).catch( err => console.log(err))
        reload()
    }
    // *********End Event Operations**********

    // check action 
    function checkAction() {
        if(club){
            if(action === 'update') updateClub()
            if(action === 'add') addClub() 
            if(action === 'delete') deleteClub()
        }
        if(event){
            if(action === 'update') updateEvent()
            if(action === 'add') addEvent() 
            if(action === 'delete') deleteEvent()
        }
    }
    // check action
    
    return (
        <>
            <div className="modal show fade" id="cudModal" tabIndex="-1" role="dialog" aria-labelledby="cudModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded shadow-lg">
                    <div className="modal-header">
                        <h5 className="modal-title" id="cudModalLabel">{title || 'title'}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {body || 'body'}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={ checkAction } data-dismiss="modal" className={`btn ${btnType} rounded shadow-sm`}>{ action || 'action'}</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CudModal;