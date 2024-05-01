import styles from "./Home.module.scss";
import Feed from "../components/Feed.jsx";
import CityRadiusSelector from "../components/CityRadiusSelector.jsx";
import InterestsLocationModal from "../components/InterestsLocationModal.jsx";


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
  return (
    <>
      <CityRadiusSelector country={user.country} city={user.city} lat={user.lat} lng={user.lng}/>
      <InterestsLocationModal />
      <Feed posts={posts} />
    </>
  );
}