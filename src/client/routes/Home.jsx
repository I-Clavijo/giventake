import styles from "./Home.module.scss";
import Feed from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/users/useUser.jsx";
import { Spinner } from "flowbite-react";
import WelcomeModal from "../components/WelcomeModal.jsx";
import { usePostAction } from "../api/posts/usePostAction.jsx";
import PostWelcomeEmail from "../api/emails/PostWelcomeEmail.jsx";

export default function Home() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const filters = { onlyPeopleIFollow: 1 };
  const { mutate: postAction } = usePostAction({ filters });
  const { data: posts, isLoading: isLoadingPosts } = usePosts({ filters });

  const handleClick = () => {
    PostWelcomeEmail({ userName: user?.firstName, email: user?.email })
  }

  return (
    <>
      <button onClick={handleClick}>click</button>
      {user?.flags?.hideWelcomeModal === false && <WelcomeModal />}

      {posts && !isLoadingPosts
        ? <Feed {...{ posts }} onPostAction={postAction} />
        : <Spinner />
      }
    </>
  );
}