import { useEffect, useState } from 'react';
import styles from "./Post.module.scss";
import ProfilePic from "../../assets/images/profile-img.jpeg";
import BookmarkIcon from "../../assets/images/bookmark-icon-black.svg";
import BookmarkIconFilled from "../../assets/images/bookmark-icon-black-filled.svg";
import FilledHandWaving from "../../assets/images/hand_waving_icon_filled.svg";
import HandWaving from "../../assets/images/hand_waving_icon.svg";
import FlagIcon from "../../assets/images/flag-icon-v2.svg";
import FilledFlagIcon from "../../assets/images/flag-filled-icon.svg";
import { Modal, Tooltip } from 'flowbite-react';
import { usePostAction } from '../../api/posts/usePostAction';
import { FaExpandAlt, FaEyeSlash } from "react-icons/fa";
import ReportModal from './ReportModal';
import PostSkeleton from './PostSkeleton';


const Post = ({ isLoggedIn, onPostAction, MAX_DESCRIPTION_LENGTH_W_PHOTO = 150, MAX_DESCRIPTION_LENGTH_NO_PHOTO = 450, postId, fullName, profilePic = '', createdAt, helpDate, location = '', postPic = '', description = '', interested = 0, isSavedByUser, isUserInterested, isUserReported, postInModal = false, openModalHandler, isLoading, noTitle, noActions }) => {
  
  const [wantToHelpCount, setWantToHelpCount] = useState(interested); // Manage like counter
  // const [showMoreActive, setShowMoreActive] = useState(postInModal);
  const [showReportModal, setShowReportModal] = useState(false);

  const toggleSaveForLater = () => {
    onPostAction({ postId, actions: { isSavedByUser: !isSavedByUser } });
  };

  const toggleHelp = () => {
    onPostAction({ postId, actions: { isUserInterested: !isUserInterested } });
    setWantToHelpCount(prevCount => !isUserInterested ? prevCount + 1 : prevCount - 1);
  };

  // // Show more button
  // const toggleShowMore = () => {
  //   setShowMoreActive(prevShowMore => !prevShowMore);
  // };

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


  //control description length
  let postDescription = description;
  const descriptionMaxLength = postPic ? MAX_DESCRIPTION_LENGTH_W_PHOTO : MAX_DESCRIPTION_LENGTH_NO_PHOTO;
  let cutDescription = postDescription.length > descriptionMaxLength
    ? <>{postDescription.substring(0, descriptionMaxLength)}<u> Read More</u></>
    : postDescription;


  const postTag = <div className={`${styles.post} ${isUserReported ? styles.reportedPost : ''}`}>
    <div className={isUserReported ? styles.reportedPostInnerWrap : ''}>
      {(!noTitle || postInModal) && <div className={styles.postHeader}>
        {/* <div className='flex'> */}
          {profilePic && <img src={profilePic} alt="Profile" className={styles.profilePic} />}
          <div>
            <h6>{fullName}</h6>
            <p>{timeAgo} {location?.city && location?.country && `• ${location.city}, ${location.country}`}</p>
          </div>
        {/* </div> */}
      </div>}

      <div className={styles.postBody}>
        <div {...(!postInModal && { onClick: openModalHandler, style: { cursor: 'pointer' } })}>
          {postPic &&
            <div className={styles.imgCrop}>
              <img src={postPic} alt="Post" />
            </div>
          }
          <p>
            {postInModal ? postDescription : cutDescription}

            {/* DO we need the read more button? now that we have modal */}
            
            {/* {!showMoreActive && !postInModal && description.length > MAX_DESCRIPTION_LENGTH && ( */}
            {/* <button className={styles.readMore} onClick={toggleShowMore}> */}
            {/* <u> Read More</u> */}
            {/* </button> */}
            {/* )} */}
          </p>
        </div>

      </div>
      {!noActions &&
        <div className={styles.postFooter}>
          <div style={{ width: 'fit-content', display: 'flex', alignItems: 'center' }}>
            <div className={styles.likes}>
              <img
                className={`${styles.likeButton} ${isSavedByUser ? styles.liked : ''} ${!isLoggedIn ? styles.disabled : ''}`} // Add CSS class for styling
                src={isSavedByUser ? BookmarkIconFilled : BookmarkIcon}
                {...(isLoggedIn && { onClick: toggleSaveForLater})}
                alt="Save for Later"
              />
            </div>

            <div className={styles.hand}>
              <Tooltip content={isUserInterested ? 'Press to cancel help' : 'Press to help'}>
                <div style={{ display: 'flex' }}>
                  <img
                    className={`${styles.wavingHand}  ${!isLoggedIn ? styles.disabled : ''}`}
                    src={isUserInterested ? FilledHandWaving : HandWaving}
                    {...(isLoggedIn && { onClick: toggleHelp})}
                    alt="Help"
                  />
                  <span className={styles.likeCount}>{wantToHelpCount}</span>
                </div>
              </Tooltip>
            </div>
          </div>

          <div className={styles.report}>
            <img
              src={isUserReported ? FilledFlagIcon : FlagIcon}
              {...(isLoggedIn && { onClick: () => setShowReportModal(true)})}
              alt="Report"
              className={!isLoggedIn ? styles.disabled : ''}
            />
          </div>
        </div>
      }
    </div>

    {isUserReported && <div className={styles.overlay}>
      <FaEyeSlash size={40} />
      <div>Post reported.</div>
    </div>}

  </div>;


  return <>
    <ReportModal show={showReportModal} onClose={() => setShowReportModal(false)} {...{ postId, isUserReported }} />
    {isLoading ? <PostSkeleton /> : postTag}

  </>;
};

const PostWithModal = (props) => {
  const [openModal, setOpenModal] = useState(false);

  return <>
    <Modal size="md" dismissible show={openModal} onClose={() => setOpenModal(false)} className={styles.modalWrap}>
      <Post {...props} postInModal />
    </Modal>
    <Post {...props} openModalHandler={() => setOpenModal(true)} />
  </>;
}

export default PostWithModal;