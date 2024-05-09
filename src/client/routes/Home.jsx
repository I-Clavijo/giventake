import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/users/useUser.jsx";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import WelcomeModal from "../components/WelcomeModal.jsx";
import FeedFilters from "../components/Posts/FeedFilters.jsx";

export default function Home() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const { data: posts, isLoading: isLoadingPosts } = usePosts();

  return <>
    {!user?.flags?.hideWelcomeModal && <WelcomeModal />}

    {posts && !isLoadingPosts ?
      <Feed posts={posts} />
      :
      <Spinner />
    }
  </>;
}