import React, {useEffect, useState} from 'react'
import './Sidebar.css' 
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from './Sidebarchat.js';
import db from './firebase'
import { useStateValue } from './StateProvider';

function Sidebar() {

const [rooms, setRooms] = useState([]);
const [{user}, dispatch] = useStateValue();

useEffect(() => {
    db.collection('rooms').onSnapshot((snapshot) => (
        setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
        )
    ))

    // return () => {
    //     unsubscribe();
    // }
}, [])

    return (
        <div className="sidebar">
            <div className="icons">
                <Avatar fontSize="small" 
                        src={user?.photoURL}
                />
                <div className="side_icons">
                    <IconButton>
                        <DonutLargeRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <ChatIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>


            <div className="search">
                <div className="s_comp">
                    <SearchIcon fontSize="small" />
                    <input type="search" placeholder="Search or Start new chat"/>
                </div>
            </div>


            <div className="chats">
                <Sidebarchat addnewchat/> 
                {rooms.map((room) => (
                    <Sidebarchat key={room.id}
                                 id={room.id}
                                 name={room.data.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
