import React from 'react';
import Post from './Post';
import './Feed.css';

const Feed = ({ posts }) => {
    return (
        <div className="feed">
            {posts.map(( post, index ) => (
                <Post
                    key={index}
                    name={post.name}
                    profilePic={post.profilePic}
                    time={post.time}
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