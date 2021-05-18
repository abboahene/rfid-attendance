// Create WebSocket connection.
const ws = new WebSocket('ws://localhost:3001')

ws.onopen = () => {
    console.log('WebSocket is open now.')
}

ws.onmessage = (message) => {
    console.log('Server message recieved: ', message.data)
    //jQuery animation and delay
    $('#loading')
    .addClass('preloader').delay(300)
    .fadeOut('slow', function() {
        $(this).removeClass('preloader')
    })
    .fadeIn('fast', function() {
        $(this).addClass('valid')
    }).delay(500)
    $('#image').delay(300).attr('src', `./src/images/${message.data}.jpg`)
}

ws.onerror = (error) => {
    console.log('Error: ', error)
}

ws.onclose = () => {
    console.log('Websocket connection closed.')
}