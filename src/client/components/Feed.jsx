import React from 'react';
import Post from './Post';
import styles from './Feed.module.scss';
import { Accordion } from 'flowbite-react';

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
                    key={post._id}
                    fullName={`${post.user.firstName} ${post.user.lastName}`}
                    profilePic={post.user?.imgUrl}
                    helpDate={post.helpDate}
                    createdAt={post.createdAt}
                    location={post.city}
                    postPic={post.imgUrl}
                    description={post.description}
                    likes={post.usersLiked?.length || 0}
                />;

                return postTag;
            })}
        </div>
    )

};

export default Feed;