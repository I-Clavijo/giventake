import styles from "./Home.module.scss";
import { usePosts } from "../api/posts/usePosts.jsx";
import { Spinner } from "flowbite-react";
import Feed, { showAs } from "../components/Feed.jsx";

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


export default function SavedPosts() {
  const { data: posts, isLoading } = usePosts();

  // only for test purposes
  // if (posts && !isLoading) {
  //   const postExample = posts[0];
  //   for (let i = 0; i < 10; i++) {
  //     posts.push(postExample);
  //   }
  //   console.log(posts);
  // }

  return <>
    {posts && !isLoading ?
      <div className={styles.feedWrap}>
        <h4 className='mb-0'>Saved for later</h4>
        <Feed {...{ posts }} styleOrder={showAs.GRID} />
      </div>
      :
      <Spinner />
    }
  </>;
}