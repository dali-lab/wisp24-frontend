import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './feed.css';
import Post from './post';
import Filter from './feedFilter';

const Feed =(props)=>{
    const[users, setUsers] = useState([
        {id: 1, name: "joyce", likes: 0, follow:false, caption: "click follow and add me as friend!"},
        {id: 2 , name:"john smith",likes:0, follow:false, caption: "i have a very basic name"}
    ]);

    //these handle functions below will setUsers with new updated array 
    const handleLike = (id)=>{
        setUsers( oldUser => oldUser.map(user=>
            (user.id === id ? {...user, likes: user.likes + 1} : user)
        ))
    };
    const handleDislike = (id) =>{
        setUsers( oldUser => oldUser.map(user=>
            (user.id === id ? {...user, likes: user.likes - 1} : user)
        ))
    };
    const handleFollow = (id) =>{
        setUsers( oldUser => oldUser.map(user=>
            (user.id === id ? {...user, follow: !user.follow} : user)
        ))
    };
    

    return(
        <div>
            {/* buttons */}

            <Filter/> 

            <div className='sort-container'>
                <img src='' alt=''/>
                <h3>Sort by:</h3>
                <button id='sort-btn'>sort button</button>
            </div>
        
            <div className='post-container'>
                <Post
                    users = {users}
                    handleLike = {handleLike}
                    handleDislike = {handleDislike}
                    handleFollow = {handleFollow}
                /> 
            </div>
            
        </div>
       
    );


};
export default Feed;