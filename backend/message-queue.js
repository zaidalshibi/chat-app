'use strict';

const { Room, Message, User } = require( "./models" );

const joinRoom = async( socket, io, roomId ) => {
    console.log( `user ${socket.id} joined room ${roomId}` );
    await Room.findByPk( roomId ).then( room => {
        if ( room ) {
    socket.join( roomId );
    io.to( roomId ).emit( 'message', {
        message: `${socket.id} has joined the room`,
        roomId: roomId
    } );
        } else {
            console.log( `room ${roomId} does not exist` );
            Room.create( { id: roomId } ).then( room => {
                socket.join( roomId );
                io.to( roomId ).emit( 'message', {
                    message: `${socket.id} has joined the room`,
                    roomId: roomId
                } );
            }
            );
        }
    } );
}


const leaveRoom = ( socket, io, roomId ) => {
    console.log( `user ${socket.id} left room ${roomId}` );
    socket.leave( roomId );
    io.to( roomId ).emit( 'leave', { roomId: roomId } );
}

const sendMessage = async( socket, io, payload ) => {
    console.log( `user ${socket.id} sent message ${payload.message}` );
    const username = User.findByPk( payload.userId )
    await Message.create( { message: payload.message, roomId: payload.roomId, userId: payload.userId } )
        .then( message => {
            io.to( payload.roomId ).emit( 'message', {
                message: message,
                roomId: payload.roomId,
                username: username
            } );
        } );
}

module.exports = {
    joinRoom: joinRoom,
    leaveRoom: leaveRoom,
    sendMessage: sendMessage
}