import React, {useEffect, useState} from 'react'
import './sidebarchat.css'
import {Avatar, IconButton} from '@material-ui/core';
import db from './firebase';
import {Link} from 'react-router-dom' ;

function Sidebarchat({addnewchat, name, id}) {

const [seed, setSeed] = useState('');
const [msgs, setMsgs] = useState('');

useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
}, [])

useEffect(() => {
    if(id){
        db.collection('rooms').doc(id).collection('messages')
        .orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
            setMsgs(snapshot.docs.map(doc => doc.data()))
        ))
    }
}, [id])

const createchat = () => {
    const roomname = prompt("Please enter room for chat")
    if(roomname){
        db.collection('rooms').add({
            name:roomname                                                                                                                                                                                                                                                                                                                                                       
        })
    }
}

    return !addnewchat ? (
        <Link to={`/rooms/${id}`}>
            <div className="single_chat">
                <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`}
                        fontSize="small" />
                <div className="chat_info">
                    <h3>{name}</h3>
                    <p>{msgs[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createchat}
             className="single_chat">
            <h3>Add new chat</h3>
        </div>
    )
}

export default Sidebarchat;
