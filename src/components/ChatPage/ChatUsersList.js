import React from 'react';

const ChatUsersList= ({socket, users})=> {

    return (
        <div id='member_list_container'>
            <h3 id='member_list_title'>Group Members</h3>
        <ul>
            {
                users.map(user=>{
                    return <li key={user.socketID}>{user.userName}</li>
                })
            }
        </ul>
        </div>
    );
}

export default ChatUsersList;