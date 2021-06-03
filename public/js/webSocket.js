
// Create WebSocket connection.
let event_title,club_name
if( window.location.pathname === '/' ){
    event_title = prompt('Please Enter Course Name', 'Course'+Math.random())  
    club_name = prompt('Please Enter Your Class Name', 'Class'+Math.random())  
    console.log(club_name)
}

const ws = new WebSocket('ws://localhost:3001')

ws.onopen = () => {
    console.log('WebSocket is open now.')
    
    $('#admin').attr('href', `dashboard/${event_title}/${club_name}`)
    $('#event_title').text(event_title)
    $('#club_name').text(club_name)
    if( window.location.pathname ==='/' ) ws.send(event_title+'*'+club_name)
}

ws.onmessage = (message) => {
    console.log('Server message recieved: ', message.data)
    
    if(message.data.split('*')[1] === '1') {
        $('#toastContent').html('<img style={{borderRadius: "50%"}} width="40" src="'+ message.data.split('*')[0] +'" alt="" />  This Student is already present')
        $('#toast').fadeIn('slow', function(){
            $(this).show()
        }).delay(2000)
        .fadeOut('slow',function(){
            $(this).hide()
        })
    }else if(message.data === '0'){
        $('#toastContent').text(':( The Student does not exists')
        $('#toast').fadeIn('slow', function(){
            $(this).show()
        }).delay(2000)
        .fadeOut('slow',function(){
            $(this).hide()
        })
    }else{
        let member_details = JSON.parse(message.data)
        console.log('memberrfid',member_details.member_rfid)
        //update count
        $('#increase').text( $('#increase').text()*1+1 )
        //jQuery animation and delay
        $('#loading')
        .addClass('preloader').delay(300)
        .fadeOut('slow', function() {
            $(this).removeClass('preloader')
        })
        .fadeIn('fast', function() {
            $(this).addClass('valid')
        }).delay(500)
        
        $('#image').delay(300).attr('src', `../images/${member_details.member_rfid}.jpg`)
    }
}

ws.onerror = (error) => {
    console.log('Error: ', error)
}

ws.onclose = () => {
    console.log('Websocket connection closed.')
}


