import React from 'react';
import { useEffect, useState } from 'react';
import styles from "./Post.module.scss";
import ProfilePic from "../assets/images/profile-picture-example.jpg";
import PostPic from "../assets/images/example-post.jpg";
import HeartIcon from "../assets/images/heart.svg";
import BookmarkIcon from "../assets/images/bookmark-icon-black.svg";
import BookmarkIconFilled from "../assets/images/bookmark-icon-black-filled.svg";
import FilledHeartIcon from "../assets/images/heart-f.svg";
import FilledHandWaving from "../assets/images/hand_waving_icon_filled.svg";
import HandWaving from "../assets/images/hand_waving_icon.svg";
import FlagIcon from "../assets/images/flag-icon-v2.svg";
import FilledFlagIcon from "../assets/images/flag-filled-icon.svg";
import { Button, Tooltip } from 'flowbite-react';
import { usePostAction } from '../api/posts/usePostAction';


const Post = ({ postId, fullName, profilePic = '', createdAt, helpDate, location = '', postPic = '', description = '', interested = 0 }) => {
  const { mutate: postAction } = usePostAction();
  const [isSaved, setIsSaved] = useState(false); // Track like state

  const [wantToHelp, setWantToHelp] = useState(false);
  const [wantToHelpCount, setWantToHelpCount] = useState(interested); // Manage like counter

  const [wantToReport, setWantToReport] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleSaveForLater = () => {
    postAction({ postId, actions: { like: !isSaved } });

    setIsSaved(prevIsSaved => !prevIsSaved);
  };

  const toggleHelp = () => {
    postAction({ postId, actions: { interested: !wantToHelp } });

    setWantToHelpCount(prevCount => !wantToHelp ? prevCount + 1 : prevCount - 1);
    setWantToHelp(prevWantToHelp => !prevWantToHelp);
  };

  const toggleReport = () => {
    postAction({ postId, actions: { report: { key: 'SPAM', description: 'To much messages!' } } });
    setWantToReport(prevWantToReport => !prevWantToReport);
  };

  // Show more button
  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  // sets how long ago the post was posted 
  const displayDate = new Date(createdAt);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const postDateTime = new Date(createdAt);

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
  }, [createdAt]);

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        {profilePic && <img src={profilePic} alt="Profile" className={styles.profilePic} />}
        <div>
          <h6>{fullName}</h6>
          <p>{timeAgo} • {location}</p>
        </div>
      </div>
      <div className={styles.postBody}>
        <div className={styles.imgCrop}>
          <img src={postPic} alt="Post" />
        </div>
        <p>
          {showMore ? description : description.substring(0, 150) + '...'}
          {!showMore && description.length > 150 && (
            <button className={styles.readMore} onClick={toggleShowMore}>
              Read More
            </button>
          )}
        </p>
      </div>
      <div className={styles.postFooter}>
        <div style={{ width: 'fit-content', display:'flex', alignItems:'center'}}>
          <div className={styles.likes}>
            <img
              className={`${styles.likeButton} ${isSaved ? styles.liked : ''}`} // Add CSS class for styling
              src={isSaved ? BookmarkIconFilled : BookmarkIcon}
              onClick={toggleSaveForLater}
              alt="Save for Later"
            />
          </div>

          <div className={styles.hand}>
            <Tooltip content='Press to help'>
              <div style={{ display: 'flex' }}>
                <img
                  className={styles.wavingHand}
                  src={wantToHelp ? FilledHandWaving : HandWaving}
                  onClick={toggleHelp}
                  alt="Help"
                />
                <span className={styles.likeCount}>{wantToHelpCount}</span>

              </div>
            </Tooltip>
          </div>
        </div>

        <div className={styles.report}>
          <img
            src={wantToReport ? FilledFlagIcon : FlagIcon}
            onClick={toggleReport}
            alt="Report"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;