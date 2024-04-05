import styles from "./home.module.scss";
import Feed from "../components/Feed.jsx";

const posts = [
    {
      name: 'John Doe',
      profilePic: 'profile-picture-example.jpg',
      time: '13:00',
      date: 'April 3',
      location: 'New York',
      postPic: 'picture-example.jpg',
      postText: 'Hello, My sweet grandmother is sick and needs someone to take care of her dog for a few days. Unfortunately, I\'m not in the city at the moment. We would be very grateful if someone could help.',
      likes: '23'
    },
    {
      name: 'John Doe',
      profilePic: 'profile-picture-example.jpg',
      time: '13:00',
      date: 'April 3',
      location: 'New York',
      postPic: 'picture-example.jpg',
      postText: 'Hello, My sweet grandmother is sick and needs someone to take care of her dog for a few days. Unfortunately, I\'m not in the city at the moment. We would be very grateful if someone could help.',
      likes: '23'
    },
    {
      name: 'John Doe',
      profilePic: 'profile-picture-example.jpg',
      time: '13:00',
      date: 'April 3',
      location: 'New York',
      postPic: 'picture-example.jpg',
      postText: 'Hello, My sweet grandmother is sick and needs someone to take care of her dog for a few days. Unfortunately, I\'m not in the city at the moment. We would be very grateful if someone could help.',
      likes: '23'
    },
  ];


export default function Home() {
	return (
		<>
			<div className={styles.block}>
				<Feed posts={posts}/>
            </div>			
		</>
	);
}