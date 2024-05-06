import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/users/useUser.jsx";
import { Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import InterestsLocationModal from "../components/Location/InterestsLocationModal.jsx";
import CityRadiusSelector from "../components/Location/CityRadiusSelector.jsx";

export default function Home() {

  const [radius, setRadius] = useState(100); // Default radius is 100 km
  const { data: posts, isLoading } = usePosts();
  const { id: userId } = useParams();
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser({ userId });
  if (isErrorUser) throw new PageError('Page not found.', 'Are you sure you are in the right page?');


  const handleRadiusChange = (radius) => {
    setRadius(radius);
  };
  
  return <>
    <InterestsLocationModal />
    <CityRadiusSelector user={user} onRadiusChange={handleRadiusChange}/>
    {posts && !isLoading ?
        <Feed posts={posts} radius={radius} />
        :
        <Spinner />
    }
  </>;
}