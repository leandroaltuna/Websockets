import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log( 'Client Connected!' );

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);

        const payload = JSON.stringify({
            type: 'custom-message',
            payload: data.toString(),
        });
        
        // ws.send( JSON.stringify( payload  ) );

        //* Envia a todos los clients incluido el que envia
        // wss.clients.forEach( function each( client ) {
        //     if ( client.readyState === WebSocket.OPEN ) {
        //         client.send( payload, { binary: false } );
        //     }
        // });
        //* ============= //

        //* Envia a todos los clients menos el que envia
        wss.clients.forEach( function each( client ) {
            if ( client !== ws && client.readyState === WebSocket.OPEN ) {
                client.send( payload, { binary: false } );
            }
        });
        //* ============= //

    });

    // ws.send('Hola desde el servidor');

    // setInterval(() => {
    //     ws.send( 'Intervalo' );
    // }, 2000);

});

console.log( 'http://localhost:3000' );