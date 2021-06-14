import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../components/navbar'
import Toast from '../components/toast'
import './css/index.css'
const Index = () => {
    let {club_name, event_name} = useParams()
    club_name = club_name.replace('_', ' ')
    event_name = event_name.replace('_', ' ')

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001')

        ws.onopen = () => {
            console.log('WebSocket is open now.')

            ws.send(event_name+'*'+club_name)
        }
    
        ws.onmessage = (message) => {
            console.log('Server message recieved: ', message.data)
            
            if(message.data.split('*')[1] === '1') {
                document.getElementById('toastContent').innerHTML='<img style={{borderRadius: "50%"}} width="40" src="'+ message.data.split('*')[0] +'" alt="" />  This Student is already present'
                document.getElementById('toast').style.display='block'
                setTimeout( () => document.getElementById('toast').style.display='none', 1000)
            }else if(message.data === '0'){
                document.getElementById('toastContent').textContent=':( The Student does not exists'
                document.getElementById('toast').style.display='block'
                setTimeout( () => document.getElementById('toast').style.display='none', 1000)
            }else{
                let member_details = JSON.parse(message.data)
                console.log('memberrfid',member_details)
                //update count
                document.getElementById('increase').textContent=document.getElementById('increase').textContent*1 +1 
                //jQuery animation and delay
                document.getElementById('loading').classList.add('preloader')
                
                setTimeout(() => {
                    document.getElementById('loading').classList.replace('preloader','valid')           
                }, 500)
                
                document.getElementById('image').setAttribute('src', `../images/${member_details.member_rfid}.jpg`)
                document.getElementById('rfid').textContent = member_details.member_rfid
                document.getElementById('member_name').textContent = member_details.member_name
                document.getElementById('club').textContent = member_details.member_club
                let timeArrived = new Date(member_details.time_arrived)
                document.getElementById('date').textContent = timeArrived.toDateString()
                document.getElementById('arrivalTime').textContent = timeArrived.toLocaleString().split(',')[1]
            }
        }
    
        ws.onerror = (error) => {
            console.log('Error: ', error)
        }
    
        ws.onclose = () => {
            console.log('Websocket connection closed.')
        }
        return () => {
            ws.close()
        };
    }, [event_name, club_name]);

    return ( 
        <div className="indexBody">
            <Toast/>
            <Navbar/>
            <div className="container-fluid d-flex justify-content-center" style={{height: "85%"}}>
            <div className="container-fluid m-3 d-flex flex-column justify-content-center">
                <div className="pb-3 mx-5">
                <h4 className="m-0 mb-1">Club: <span id="club_name">{club_name}</span></h4>
                <h4 className="m-0">Event: <span id="event_title">{event_name}</span></h4>
                </div>
                <div className="row h-75 mx-5">
                    <div className="col-7 p-0 h-100 rounded shadow-sm d-flex flex-column justify-content-center">
                        <div className="wrapper text-center">
                            <img id="image" className="m-2 shadow rounded" src="../images/noimage.png" style={{ width : "200px" }} alt="" /> 
                        </div>
                        <div className="card shadow rounded mb-3 mx-5">
                            <div id="memberName" className="card-header">Attender Details:</div>
                            <div className="card-body">
                                <h4 id="member_name" className="card-title">No Name</h4>
                                <div className="card-text">
                                    <b>
                                        <ul>
                                            <li><span>Rfid: </span> <span id="rfid">---rfid----</span></li>
                                            <li><span>Club: </span> <span id="club">---club_name----</span></li>
                                            <li><span>Date: </span> <span id="date">---event date----</span></li>
                                            <li className="font-weight-bold"><span>Time Arrived: </span> <span id="arrivalTime">---time arrived----</span></li>
                                        </ul>
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-5 h-100 d-flex flex-column justify-content-center" >
                    <div className="count row ml-2 rounded shadow h-100 d-flex flex-column justify-content-center">
                        <div className="black text-black text-center mt-4">
                            <div id="loading"></div>
                            <i className="fa fa-4x fa-group pt-4"></i>
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