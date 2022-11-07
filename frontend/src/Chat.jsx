import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Chat () {
    const [messages, setMessages] = useState([]);
    const socket = io( 'http://localhost:3000' );
    useEffect( () => {
        socket.on( 'connect', () => {
            console.log( 'connected' );
            socket.emit('join', {roomId: parseInt(localStorage.getItem('roomId'))});
            socket.emit('getMessages', {roomId: parseInt(localStorage.getItem('roomId'))});
            socket.on('messages', (data) => {
                setMessages(data);
            });
        } );
        socket.on( 'disconnect', () => {
            console.log( 'disconnected' );
        } );
    }, [] );
    socket.on( 'message', ( data ) => {
        setMessages(messages => [...messages, data] );
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
                <button type="submit" className="button"> Send </button>
            </form>
            <div className="messages">
                <ul id="messages">
                    {messages.sort((a, b) => b.id - a.id).map((message, index) => (
                        <li key={index}>
                            <div className="username">
                                {message.User.username}
                            </div>
                            <div className="message">
                                {message.message}
                            </div>
                            <span className="time">
                                {message.createdAt.slice(11, 16)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
                    {/* {messages && messages.map((message, index) => {
                       return (
                            <li key={index}> {message.User.username}: {message.message} </li>
                        );
                    })}
                </ul>
            </div>  */}
            <button onClick={( e ) => logout( e )} className="button"> Logout </button>
        </div>
    );
}

export default Chat;