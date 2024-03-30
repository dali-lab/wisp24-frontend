import React, { useState } from 'react';
import './feed.css';


const Post = (props) =>{


    return(
        <div>
        {props.users.map(user=>(
            <div className='individual-container'>
             <h2>{user.name}</h2>
             <p>{user.caption}</p>
             <div className='likes'>
                 <div>
                     <img src='' alt=''/>
                     <button onClick={()=> props.handleLike(user.id)}>upvote</button>
                 </div>
                 <h2>{user.likes}</h2>
                 <div>
                     <img src='' alt=''/>
                     <button onClick={()=>props.handleDislike(user.id)}>downvote</button>
                 </div>
             </div>

             <div className='follow'>
                 {user.follow ?
                 (<button onClick={()=> props.handleFollow(user.id)}>followed</button>)
                 :
                 (<button onClick={()=> props.handleFollow(user.id)}>follow</button>)
                 }
             </div>
             <div className='dplan-containter'>

            </div>



         </div>


        ))};
       
            
        </div>
    );


};
export default Post;