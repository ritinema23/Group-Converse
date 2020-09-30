import React, {useState, useEffect} from 'react'
import './main_chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom' ;
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Main_chat() {

const [seeds, setSeeds] = useState('');
const [input, setInput] = useState('');
const { roomid } = useParams();
const [roomname, setRoomname] = useState('');
const [messages, setMessages] = useState([]);
const [{user}, dispatch] = useStateValue();

useEffect(() => {
    setSeeds(Math.floor(Math.random() * 5000))
}, [roomid ])       

useEffect(() => {
    if (roomid){
        db.collection('rooms').doc(roomid).onSnapshot((snapshot) =>
            setRoomname(snapshot.data().name));

        db.collection('rooms').doc(roomid).collection('messages')
          .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
            setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }
},[roomid])

const onSearch = (e) => {
    setInput(e.target.value);
}

const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomid).collection('messages').add({
        name: user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');
}
    
    return (
        <div className="main_chat">
            <div className="main_chat_header">
                <Avatar src= {`https://avatars.dicebear.com/api/human/${seeds}.svg`}
                        fontSize="small" />
                <div className="m_c_h_info">

                    <h2>{roomname}</h2> 
                    <p>last seen {' '} {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                
                </div>
                <div className="m_c_h_icons">
                    <IconButton>
                        <SearchIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <AttachFile fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <MoreVert fontSize="small" />
                    </IconButton>
                </div>
            </div>
            
            <div className="main_chat_area">
                {messages.map((message) => (
                    <p className={`chat_msg ${user.displayName===message.name && "receive_msg"}`}> 
                        <p className="chat_name">
                            {message.name}
                        </p>
                        {message.message}
                        <span className="time_stamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="main_chat_footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input type="text" 
                           placeholder="Type a message"
                           value={input}
                           onChange={onSearch}
                    />
                    <button onClick={sendMessage}>submit</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Main_chat;