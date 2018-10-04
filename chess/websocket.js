const {wss} = require('../websocket');


wss.on('connection', (client) => {

    console.log("client connected")

    //connection is up, let's add a simple simple event
    client.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        client.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    client.send('Hi there, I am a WebSocket server');
});
