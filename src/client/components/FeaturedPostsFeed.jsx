import React from 'react';
import styles from './FeaturedPostsFeed.module.css';
import Post from './Post.jsx';

const FeaturedPostsFeed = ({ posts, showTitle }) => {
    return (
        <div className={styles.feed}>
            {showTitle && (
                <div className={styles.header}>
                    <h2 className={styles.title}>Explore featured Posts</h2>
                </div>
            )}
            <div className={styles.postsGrid}>
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
        </div>
    );
};

export default FeaturedPostsFeed;
