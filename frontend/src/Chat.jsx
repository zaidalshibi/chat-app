import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Chat () {
    const [messages, setMessages] = useState([]);
    const socket = io( 'http://localhost:3000' );
    useEffect( () => {
        socket.on( 'connect', () => {
            console.log( 'connected' );
            socket.emit('join', {roomId: parseInt(localStorage.getItem('roomId'))});
        } );
        socket.on( 'disconnect', () => {
            console.log( 'disconnected' );
        } );
    }, [] );
    socket.on( 'message', ( data ) => {
        console.log( data.message );
        setMessages( messages => [...messages, data.message] );
    } );

    const logout = ( e ) => {
        e.preventDefault();
        socket.emit( 'leave', { roomId: parseInt( localStorage.getItem( 'roomId' ) ) } );
        localStorage.removeItem( 'username' );
        localStorage.removeItem( 'roomId' );
        window.location.href = '/';
    };

    const sendMessage = ( e ) => {
        e.preventDefault();
        const message = e.target.message.value;
        socket.emit( 'message', { roomId: parseInt( localStorage.getItem( 'roomId' ) ), message, userId:  parseInt( localStorage.getItem( 'userId' ) )} );
        e.target.message.value = '';
    };
    return (
        <div className="chat">
            <h1> Chat </h1>
            <form onSubmit={(e)=> sendMessage(e)}>
                <label> Message </label>
                <input type="text" id="message" />
                <br />
                <button type="submit"> Send </button>
            </form>
            <div className="messages">
                <ul id="messages">
                    {messages && messages.map((message, index) => {
                        return (
                            <li key={index}> {message.username}: {message.message} </li>
                        );
                    })}
                </ul>
            </div>
            <button onClick={( e ) => logout( e )}> Logout </button>
        </div>
    );
}

export default Chat;