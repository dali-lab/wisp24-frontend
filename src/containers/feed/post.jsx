import React from 'react';
import './feed.css';

const Post = (props) => {
  return (
    <div>
      {props.users.map((user) => (
        // key needed to as unique identitifer
        <div className="individual-container" key={user}>
          {/* user.profile */}
          <h2>{user.name}</h2>
          <p>{user.caption}</p>

          <div className="likes">
            <div>
              <img src="" alt="" />
              <button type="button" onClick={() => props.handleLike(user.id)}>upvote</button>
            </div>
            <h2>{user.likes}</h2>
            <div>
              <img src="" alt="" />
              <button type="button" onClick={() => props.handleDislike(user.id)}>downvote</button>
            </div>
          </div>

          <div className="follow">
            {user.follow ? (<button type="button" onClick={() => props.handleFollow(user.id)}>followed</button>)
              : (<button type="button" onClick={() => props.handleFollow(user.id)}>follow</button>)}
          </div>
          <div className="Dplan container"> Dplan containter</div>
          <div className="Tag-container"> Tag containter</div>
        </div>
      ))};
    </div>
  );
};
export default Post;
