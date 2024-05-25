import Post from './Post'
import styles from './Feed.module.scss'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { LeftArrow, RightArrow } from './Arrows'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

export const showAs = {
  LIST: 'list', // default
  GRID: 'grid',
  MASONRY: 'masonry',
  ROW: 'row'
}

const Feed = ({
  posts,
  styleOrder = showAs.LIST,
  isLoading,
  noTitle = false,
  noActions = false,
  noDescription = false,
  onPostAction,
  isLoggedIn,
  featuredPosts
}) => {
  let postsWrapperClass = styles.list
  if (styleOrder === showAs.GRID) postsWrapperClass = styles.grid
  else if (styleOrder === showAs.MASONRY) postsWrapperClass = styles.masonry
  else if (styleOrder === showAs.ROW) postsWrapperClass = styles.row

  let postsMapped = posts?.map(post => {
    let postTag = (
      <Post
        postId={post._id}
        key={post._id}
        userId={post.user._id}
        fullName={`${post.user.firstName} ${post.user.lastName}`}
        profilePic={post.user?.imgUrl}
        helpDate={post.helpDate}
        createdAt={post.createdAt}
        location={post.city}
        postPic={post.imgUrl}
        title={post?.title}
        description={post.description}
        likes={post.usersSaved?.length || 0}
        interested={post.usersInterested?.length || 0}
        isSavedByUser={post.isSavedByUser}
        isUserInterested={post.isUserInterested}
        isUserReported={post.isUserReported}
        isSelf={post.isSelf}
        featuredPost={featuredPosts}
        {...{ isLoading, noTitle, noActions, noDescription, onPostAction, isLoggedIn, post }}
      />
    )

    return postTag
  })

  if (styleOrder === showAs.MASONRY) {
    postsMapped = (
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">{postsMapped}</Masonry>
      </ResponsiveMasonry>
    )
  } else if (styleOrder === showAs.ROW) {
    postsMapped = (
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {postsMapped}
      </ScrollMenu>
    )
  }

  return <div className={postsWrapperClass}>{postsMapped}</div>
}

export default Feed
