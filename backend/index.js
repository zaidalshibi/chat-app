'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
app.use( cors() );
app.use( express.json() );
const userRoutes = require( './routes/user.routes' );
app.use( userRoutes );

// socket.io
const http = require( 'http' );
const socket = require( 'socket.io' );
const { joinRoom, leaveRoom, sendMessage, getMessages } = require( './message-queue' );
const server = http.createServer( app );
const io = socket( server, {
    transports: [ 'websocket', 'polling' ],
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST', 'PUT' ]
    }
} );

io.on( 'connection', socket => {
    console.log( `user connected with id ${socket.id}` );
    socket.on( 'disconnect', () => {
        console.log( `user disconnected with id ${socket.id}` );
    } );
    socket.on( 'join', payload => {
        joinRoom( socket, io, payload.roomId );
    } );
    socket.on( 'leave', payload => {
        leaveRoom( socket, io, payload.roomId );
    } );
    socket.on( 'message', payload => {
        sendMessage( socket, io, payload );
    } );
    socket.on( 'getMessages', payload => {
        getMessages( socket, io, payload.roomId );
        io.to( payload.roomId ).emit( 'getMessages' );
    });
} );
// end of socket.io


app.get( '/', ( req, res ) => {
    res.send( 'Hello World!' );
} );

function start ( PORT ) {
    server.listen( PORT, () => console.log( `Listening on port ${PORT}` ) );
}

module.exports = {
    app: app,
    start: start,
};