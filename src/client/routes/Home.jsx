import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/user/useUser.jsx";
import { Spinner } from "flowbite-react";
import InterestsLocationModal from "../components/InterestsLocationModal.jsx";
import CityRadiusSelector from "../components/CityRadiusSelector.jsx";

const posts = [
  {
    name: 'John Doe',
    profilePic: 'profile-picture-example.jpg',
    date: '2024-04-05T23:30:00',
    location: 'New York',
    postPic: 'picture-example.jpg',
    postText: 'Hello, My sweet grandmother is sick and needs someone to take care of her dog for a few days. Unfortunately, I\'m not in the city at the moment. We would be very grateful if someone could help.',
    likes: '23'
  },
  {
    name: 'John Doe',
    profilePic: 'profile-picture-example.jpg',
    date: '2024-04-05T23:30:00',
    location: 'New York',
    postPic: 'picture-example.jpg',
    postText: 'Hello, My sweet grandmother is sick and needs someone to take care of her dog for a few days. Unfortunately, I\'m not in the city at the moment. We would be very grateful if someone could help.',
    likes: '23'
  },
  {
    name: 'John Doe',
    profilePic: 'profile-picture-example.jpg',
    date: '2024-04-05T23:30:00',
    location: 'New York',
    postPic: 'picture-example.jpg',
    postText: 'Hello, My sweet grandmother is sick and needs someone to take care of her dog for a few days. Unfortunately, I\'m not in the city at the moment. We would be very grateful if someone could help.',
    likes: '23'
  },
];

const user = {
  country: "IL",
  city: "Tel Aviv",
  lat: "32.0853",
  lng: "34.7818"
}; 

export default function Home() {

  const { data: posts, isLoading } = usePosts();
  const { data: user } = useUser();

  return <>
    <InterestsLocationModal />
    <CityRadiusSelector {...{ user }}/>
    {posts && !isLoading ?
        <Feed {...{ posts }} />
        :
        <Spinner />
    }
  </>;
}