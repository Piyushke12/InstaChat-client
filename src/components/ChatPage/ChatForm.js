import React, { useState } from "react";

const ChatForm = ({ socket, chatFormRef }) => {

    const [message, setMessage] = useState('');
    
    const handleTyping = () => {
        socket.emit('typing',socket.id);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("messageRequest", message);
        setMessage("");
    }

    return (
        <form id="chatform" onSubmit={handleSubmit} ref={chatFormRef}>
            <input
                id="inputmessage"
                type="text"
                placeholder="Type your Message here"
                value={message}
                required
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleTyping}
            />
            <button id="sendbtn" type="submit">Send</button>
        </form>
    );
}

export default ChatForm;