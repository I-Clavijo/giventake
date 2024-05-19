import { usePosts } from '../api/posts/usePosts.jsx'
import { Spinner } from 'flowbite-react'
import Feed, { showAs } from '../components/Posts/Feed.jsx'
import { useUser } from '../api/users/useUser.jsx'
import { usePostAction } from '../api/posts/usePostAction.jsx'
import EmptyState from '../components/EmptyState.jsx'
import NoPostsImg from '../assets/images/empty-states/no-posts.svg'

export default function SavedPosts() {
  const filters = { onlySavedPosts: 1 }
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser, isLoggedIn } = useUser()
  const { mutate: postAction } = usePostAction({ filters })

  const { data: posts, isLoading: isLoadingPosts } = usePosts({ filters })

  return (
    <>
      {isLoadingPosts ? (
        <Spinner />
      ) : posts.length ? (
        <div>
          <h4 className="mb-0">Saved for later</h4>
          <Feed {...{ posts, isLoggedIn }} styleOrder={showAs.MASONRY} onPostAction={postAction} />
        </div>
      ) : (
        <EmptyState img={NoPostsImg} title="No saved posts" content="You can save posts to read later." />
      )}
    </>
  )
}
