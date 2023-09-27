import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatForm from './ChatForm';


function ChatBody({ roomName, messages, typingResponse, socket, chatFormRef }) {

    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem("userName")
        socket.emit("leftchat", socket.id)
        navigate("/");
        window.location.reload();
    }

    return (
        <div id='chatbodycontainer'>
            <header id='chatpagetitle'>
                <h1>{roomName}</h1>
                <button id='leavebtn' onClick={handleLeaveChat}>Leave Chat</button>
            </header>
            <div id='message_container'>
                {
                    messages.map(message =>
                        message.messageType === "announcement" ?
                            (
                                <div id='announcement' key={message.messageID}>
                                    <p id='announced_text'>{message.message}</p>
                                </div>
                            ) :
                            message.sendBy === localStorage.getItem("userName") ?
                                (
                                    <div id='message_sent' key={message.messageID}>
                                        <h4 id='sender_name'>You</h4>
                                        <p id='message_text'>{message.message}</p>
                                    </div>
                                ) :
                                (
                                    <div id='message_received' key={message.messageID}>
                                        <h4 id='receiver_name'>{message.sendBy}</h4>
                                        <p id='message_text'>{message.message}</p>
                                    </div>
                                )
                    )
                }
            </div>
            <div>
                {
                    typingResponse && typingResponse.userName !== localStorage.getItem('userName') &&
                    <p id='typingstatus'>{typingResponse.userName} is typing....</p>
                }
            </div>
            <ChatForm socket={socket} chatFormRef={chatFormRef} />
        </div>
    );
}

export { ChatBody };