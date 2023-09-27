import React, { useEffect, useState, useRef } from 'react';
import ChatUsersList from '../ChatPage/ChatUsersList';
import { ChatBody } from './ChatBody';

const ChatPage = ({ socket }) => {

    const chatFormRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [typingResponse, setTypingResponse] = useState('');
    const [users, setUsers] = useState([]);
    const [roomName,setRoomName] = useState('');

    useEffect(() => {
        socket.on('message', data => {
            setMessages([...messages, data])
        });
    }, [socket,messages]);

    useEffect(() => {
        socket.on('roomUsers', data => {
            setUsers(data.userList)
            setRoomName(data.room);
        });
    }, [socket,roomName,users]);

    useEffect(() => {
        socket.on('typingResponse', data => setTypingResponse(data));
    }, [socket, typingResponse]);

    useEffect(() => {
        chatFormRef.current?.scrollIntoView({ behaviour: "smooth" });
    })

    return (
        <div id='chatpage'>
            <ChatUsersList users={users} socket={socket} />
            <div className="vertical-line"></div>
            <ChatBody roomName={roomName} messages={messages} typingResponse={typingResponse} socket={socket} chatFormRef={chatFormRef} />
        </div>
    );
}

export default ChatPage;