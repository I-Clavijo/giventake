import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/users/useUser.jsx";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import RenderEmail from '../api/emails/renderEmail.jsx';
import PostEmail from '../api/emails/PostEmail.jsx';
import InterestsLocationModal from "../components/WelcomeModal.jsx";
import CityRadiusSelector from "../components/RHF/Location/CityRadiusSelector.jsx";

export default function Home() {  
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const { data: posts, isLoading: isLoadingPosts } = usePosts();


  const [radius, setRadius] = useState(100); // Default radius is 100 km

  const handleRadiusChange = (radius) => {
    setRadius(radius);
  };

  const handleClick = async () => {
    const emailData = {
      emailHTML : RenderEmail(),
      userEmail : user.email,
      userName : user.firstName,
  };

    PostEmail(emailData);
  };

  
  return <>
    <button onClick={handleClick}>Send email</button>
    {!user?.flags?.hideWelcomeModal && <InterestsLocationModal />}
    
    <CityRadiusSelector user={user} onRadiusChange={handleRadiusChange}/>
    {posts && !isLoadingPosts ?
        <Feed posts={posts} radius={radius} />
        :
        <Spinner />
    }
  </>;
}