import Post from './Post';
import styles from './Feed.module.scss';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export const showAs = {
    LIST: 'list', // default
    GRID: 'grid',
    MASONRY: 'masonry'
}


const Feed = ({ posts, radius=0, styleOrder = showAs.LIST, isLoading, noTitle=false, noActions=false }) => {
    const selectedRadius = radius; // The selected radius in km
    // filter posts by radius- to do ***

    let postsWrapperClass = styles.list;
    if (styleOrder === showAs.GRID) postsWrapperClass = styles.grid;
    else if (styleOrder === showAs.MASONRY) postsWrapperClass = styles.masonry;

    let postsMapped = posts.map(post => {
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
            {...{isLoading, noTitle, noActions}}
        />;

        return postTag;
    });

    if (styleOrder === showAs.MASONRY) {
        postsMapped = <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="10px">
                {postsMapped}
            </Masonry>
        </ResponsiveMasonry>;
    }

    return (
        <div className={postsWrapperClass}>
            {postsMapped}
        </div>
    )

};

export default Feed;