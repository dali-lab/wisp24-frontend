/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './feed.css';
import Plan from '../../components/plan/Plan';

const Post = (props) => {
  const [filter, setFilter] = useState(false);
  return (
    <div>
      {props.users.map((user) => (
        // key needed to as unique identitifer
        <div className="individual-container" key={user}>
          <div className="user-information-containter">
            <img src={user.profile} alt="user profiel" id="profile" />
            <div className="user-info-middle">
              <div className="user-info-midtop">
                <div id="username"><h2>{user.name}</h2></div>
                <div className="follow">
                  {user.follow ? (<button type="button" id="followed-btn" onClick={() => props.handleFollow(user.id)}>followed</button>)
                    : (<button type="button" id="follow-btn" onClick={() => props.handleFollow(user.id)}>follow</button>)}
                </div>`
              </div>
              <div className="caption-containter">
                <p>{user.caption}</p>
              </div>
            </div>
            <div className="likes">
              <div>
                <button type="button" onClick={() => props.handleLike(user.id)}><img src="assets/upvote.png" alt="upvote" /></button>
              </div>
              <h2>{user.likes}</h2>
              <div>
                <button type="button" onClick={() => props.handleDislike(user.id)}><img src="assets/downvote.png" alt="downvote" /></button>
              </div>
            </div>
          </div>
          <div className="Dplan-container"> <Plan editState={false} /> </div>
          <div className="tag-container">
            <span> tags: </span>
            {user.tags.map((tag) => (
              <div className="tags" key={tag}>
                {tag}
                {/* need include a x button, which removes it from filter data */}
              </div>

            ))}
          </div>
        </div>
      ))};
    </div>
  );
};
export default Post;
