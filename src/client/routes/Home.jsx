import styles from "./Home.module.scss";
import Feed, { showAs } from "../components/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { Spinner } from "flowbite-react";

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


export default function Home() {

  const { data: posts, isLoading } = usePosts();
  console.log(posts);
  return <>
    {posts && !isLoading ?
        <Feed {...{ posts }} />
        :
        <Spinner />
    }
  </>;
}