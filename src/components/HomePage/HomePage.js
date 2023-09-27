import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Home = ({ socket }) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [roomName, setRoomName] = useState("")


    const handleSubmit = (e) => {

        e.preventDefault()
        localStorage.setItem("userName",userName)
        socket.emit("joinRoom", { userName: userName, socketID: socket.id, room: roomName });
        navigate("/chat")
    }

    return (
        <div style={{ display: "grid" }}>
            <form className='home__container' onSubmit={handleSubmit}>
                <h1 className='apptitle'>InstaChat</h1>
                <h2 className='home__header'>Create Your Private Chat Group</h2>

                <label htmlFor="roomname">Enter Room Name</label>
                <input type="text"
                    name="roomname"
                    id='roomname'
                    className='roomname__input'
                    value={roomName}
                    required
                    onChange={e => setRoomName(e.target.value)} />

                <label htmlFor="username">Username</label>
                <input type="text"
                    name="username"
                    id='username'
                    className='username__input'
                    value={userName}
                    required
                    onChange={e => setUserName(e.target.value)} />
                <button className='home__cta'>SIGN IN</button>
            </form>
        </div>
    )
}

export default Home;