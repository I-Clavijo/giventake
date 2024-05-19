import styles from "./Home.module.scss";
import Feed from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/users/useUser.jsx";
import { Spinner } from "flowbite-react";
import WelcomeModal from "../components/WelcomeModal.jsx";
import { usePostAction } from "../api/posts/usePostAction.jsx";

export default function Home() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const filters = { onlyPeopleIFollow: 1 };
  const { mutate: postAction } = usePostAction({ filters });
  const { data: posts, isLoading: isLoadingPosts } = usePosts({ filters });

  return (
    <>
      {user?.flags?.hideWelcomeModal === false && <WelcomeModal />}

      {posts && !isLoadingPosts
        ? <Feed {...{ posts }} onPostAction={postAction} />
        : <Spinner />
      }
    </>
  );
}