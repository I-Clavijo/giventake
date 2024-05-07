import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/user/useUser.jsx";
import { Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import RenderEmail from '../emails/renderEmail.jsx';
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
    
    const response = await fetch('http://your-server.com/endpoint', { // replace with your actual server URL and endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailHTML }),
  });

  if (!response.ok) {
    console.error('Server response was not ok');
  } else {
    const responseData = await response.json();
    console.log(responseData);
  }
  
  };

  
  return <>
  {/*  <button onClick={async () =>{
      await fetch('/api/emails', { method: 'POST', bost: JSON.stringify({
        email: "blabla@test.com",
        firstname= "pepe",
      });
    }}
  > 
      send
    </button>
    */}
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