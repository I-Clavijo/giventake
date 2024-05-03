import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/user/useUser.jsx";
import { Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import InterestsLocationModal from "../components/InterestsLocationModal.jsx";
import CityRadiusSelector from "../components/CityRadiusSelector.jsx";

export default function Home() {

  const { id: userId } = useParams();
  const { data: posts, isLoading } = usePosts();
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser({ userId });
  if (isErrorUser) throw new PageError('Page not found.', 'Are you sure you are in the right page?');

  return <>
    <InterestsLocationModal />
    <CityRadiusSelector user={user} />
    {posts && !isLoading ?
        <Feed {...{ posts }} />
        :
        <Spinner />
    }
  </>;
}