import React from 'react';
import LikedPost from './LikedPost';
import styles from './LikedPostsFeed.module.css';

const LikedPostsFeed = ({ posts }) => {
    return (
        <div className={styles.feed}>
            {posts.map(( post, index ) => (
                <LikedPost
                    key={index}
                    name={post.name}
                    profilePic={post.profilePic}
                    date={post.date}
                    location={post.location}
                    postPic={post.postPic}
                    postText={post.postText}
                    likes={post.likes}
                />
            ))}
        </div>
            )
            
};

export default LikedPostsFeed;