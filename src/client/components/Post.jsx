import React from 'react';
import { useEffect, useState } from 'react';
import styles from "./Post.module.css";
import ProfilePic from "../assets/images/profile-picture-example.jpg";
import PostPic from "../assets/images/example-post.jpg";
import HeartIcon from  "../assets/images/heart.svg";
import FilledHeartIcon from "../assets/images/heart-f.svg";
import FilledHandWaving from "../assets/images/hand_waving_icon_filled.svg";
import HandWaving from "../assets/images/hand_waving_icon.svg";


const Post = ({ name, profilePic, date, location, postPic, postText, likes }) => {

  const [isLiked, setIsLiked] = useState(false); // Track like state
  const [likeCount, setLikeCount] = useState(likes); // Manage like counter

  const toggleLike = () => {
      setIsLiked(!isLiked);
      setLikeCount( isLiked ? likeCount -1 : likeCount -1 +2);
  };

  const [wantToHelp, setWantToHelp] = useState(false); 

  const toggleHelp = () => {
      setWantToHelp(!wantToHelp);
  };

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // sets how long ago the post was posted 

  const displayDate = new Date(date);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const postDateTime = new Date(date);

      const timeDifference = currentDate.getTime() - postDateTime.getTime();
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let timeAgoString = '';
      if (days > 0) {
        timeAgoString = `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        timeAgoString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        timeAgoString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        timeAgoString = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }

      setTimeAgo(timeAgoString);
    };

    calculateTimeAgo();

    // Update the time every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [date]);

    return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <img src={ProfilePic} alt="Profile" className={styles.profilePic}/>
        <div>
          <h2>{name}</h2>
          <p>posted {timeAgo}</p>
          <p>{location}, {displayDate.toLocaleString()}</p>
        </div>
      </div>
      <div className={styles.postBody}>
        <img src={PostPic} alt="Post"/>
        <p>
          {showMore ? postText : postText.substring(0, 150) + '...'}
          {!showMore && postText.length > 150 && (
            <button className={styles.readMore} onClick={toggleShowMore}>
              Read More
            </button>
          )}
        </p>
      </div>
      <div className={styles.postFooter}>
        <div className={styles.likes}>
          <img
            className={`${styles.likeButton} ${isLiked ? 'liked' : ''}`} // Add CSS class for styling
            src={isLiked ? FilledHeartIcon : HeartIcon}
            onClick={toggleLike}
            alt="Like"
          />
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
          <div className={styles.hand}>
            <img 
              className={styles.wavingHand}
              src={wantToHelp ? FilledHandWaving : HandWaving}
              onClick={toggleHelp}
              alt="Like"
           />
         </div>
         <p className={styles.pressToHelp}>Press to help</p>
        </div>
      </div>
  );
};

export default Post;