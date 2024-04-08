import styles from "./Home.module.scss";
import LikedPostsFeed from "../components/LikedPostsFeed.jsx";

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


export default function LikedPosts() {
	return (
		<>
			<div className={styles.block}>
				<LikedPostsFeed posts={posts}/>
      </div>			
		</>
	);
}