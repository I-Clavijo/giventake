import React from 'react';
import { useState } from 'react';
import './Post.css';
import LikeIcon from "../assets/images/heart-icon2.svg";
import WavingIcon from "../assets/images/waving-hand.svg";
import ProfilePic from "../assets/images/profile-picture-example.jpg"
import PostPic from "../assets/images/example-post.jpg"


const Post = ({ name, profilePic, time, date, location, postPic, postText, likes }) => {

  const [likesCount, setLikesCount] = useState(likes);
  const [liked, setLiked] = useState(false); // Track whether the user has liked the post

  const toggleLike = () => {
    setLiked(!liked); // Toggle the liked state
    setLikesCount(liked ? likesCount + 1 : likesCount - 1); // Update likes count based on liked state
  };
  

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

    return (
    <div className="post">
      <div className="post-header">
        <img src={ProfilePic} alt="Profile" className="profile-pic"/>
        <div>
          <h2>{name}</h2>
          <p>posted {time} ago</p>
          <p>{location}, {date}</p>
        </div>
      </div>
      <div className="post-body">
        <img src={PostPic} alt="Post"/>
        <p>
          {showMore ? postText : postText.substring(0, 150) + '...'}
          {!showMore && postText.length > 150 && (
            <button className="read-more" onClick={toggleShowMore}>
              Read More
            </button>
          )}
        </p>
      </div>
      <div className="post-footer">
         <div className="likes">
         <img className="like-button2" src={liked ? LikeIconFilled : LikeIcon} // Adjust icon for visual feedback
          onClick={toggleLike}/>
          <div className="likes-amount">{likesCount}</div>
        <div className="hands">
          <img className="waving-hand" src={WavingIcon} />
        </div>
        </div>
      </div>
    </div>
  );
};


export default Post;