import React from 'react';
import Post from './Post';
import styles from './Feed.module.scss';

export const showAs = {
    LIST: 'list', // default
    GRID: 'grid',
}

const Feed = ({ posts, styleOrder = showAs.LIST }) => {
    let postsWrapperClass = styles.list;
    if (styleOrder === showAs.GRID) postsWrapperClass = styles.grid;

    return (
        <div className={postsWrapperClass}>
            {posts.map(post => {
                let postTag = <Post
                    postId={post._id}
                    key={post._id}
                    fullName={`${post.user.firstName} ${post.user.lastName}`}
                    profilePic={post.user?.imgUrl}
                    helpDate={post.helpDate}
                    createdAt={post.createdAt}
                    location={post.city}
                    postPic={post.imgUrl}
                    description={post.description}
                    likes={post.usersSaved?.length || 0}
                    interested={post.usersInterested?.length || 0}
                    isSavedByUser={post.isSavedByUser}
                    isUserInterested={post.isUserInterested}
                    isUserReported={post.isUserReported}
                />;

                return postTag;
            })}
        </div>
    )

};

export default Feed;