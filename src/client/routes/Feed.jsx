import styles from './Feed.module.scss';
import Feed from '../components/Posts/Feed.jsx';
import { usePosts } from '../api/posts/usePosts.jsx';
import { useUser } from '../api/users/useUser.jsx';
import { Spinner } from 'flowbite-react';
import WelcomeModal from '../components/WelcomeModal.jsx';
import { usePostAction } from '../api/posts/usePostAction.jsx';
import EmptyState from '../components/EmptyState.jsx';
import NoPostsImg from '../assets/images/empty-states/no-posts.svg';
import { Link } from 'react-router-dom';

export default function FeedPage() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const filters = { onlyPeopleIFollow: 1 };

  const { mutate: postAction } = usePostAction({ filters });
  const { data: posts, isLoading: isLoadingPosts } = usePosts({ filters });

  return (
    <>
      {user?.flags?.hideWelcomeModal === false && <WelcomeModal />}
      {isLoadingPosts ? (
        <Spinner />
      ) : posts.length ? (
        <Feed {...{ posts }} onPostAction={postAction} />
      ) : (
        <EmptyState
          img={NoPostsImg}
          title="No posts yet"
          content="Start following friends to see if they need any help."
          link={
            <>
              Let's go to <Link to="/">explore</Link>
            </>
          }
        />
      )}
    </>
  );
}
