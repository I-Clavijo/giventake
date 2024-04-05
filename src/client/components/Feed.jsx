import React from 'react';
import Post from './Post';
import styles from './Feed.module.css';

const Feed = ({ posts }) => {
    return (
        <div className={styles.feed}>
            {posts.map(( post, index ) => (
                <Post
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

export default Feed;