import React from 'react';
import styles from "./PostCreation.module.css";
import 

const Post = ({ name, profilePic, date, location, postPic, postText, likes }) => {

    return (
    <div className={styles.postCreator}>
      <div className={styles.postHeader}>
      </div>
      <div className={styles.postBody}>
      </div>
      <div className={styles.postFooter}>
      </div>
    </div>
  );
};

export default Post;