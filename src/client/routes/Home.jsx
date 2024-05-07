import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/user/useUser.jsx";
import { Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import RenderEmail from '../emails/renderEmail.jsx';
import PostEmail from '../emails/PostEmail.jsx';
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

  const handleClick = async () => {
    const emailHTML = RenderEmail();
    const userName = "pepe";
    const userEmail = "test@test.com"
    PostEmail( emailHTML, userName, userEmail);
  };

  
  return <>
    <button onClick={handleClick}>Send email</button>
    <InterestsLocationModal />
    <CityRadiusSelector user={user} onRadiusChange={handleRadiusChange}/>
    {posts && !isLoading ?
        <Feed posts={posts} radius={radius} />
        :
        <Spinner />
    }
  </>;
}