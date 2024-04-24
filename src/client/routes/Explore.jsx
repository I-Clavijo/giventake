import styles from "./Explore.module.scss";
import FeaturedCategories from "../components/FeaturedCategories.jsx";
import FeaturedPostsFeed from "../components/FeaturedPostsFeed.jsx";

const posts = [
  {
    name: 'John Doe',
    profilePic: 'profile-picture-example.jpg',
    date: '2024-04-05T23:30:00',
    location: 'New York',
    postPic: 'picture-example.jpg',
    postText: 'Hello, My sweet grandmother is sick and needs someone to take care of her dog for a few days. Unfortunately, I\'m not in the city at the moment. We would be very grateful if someone could help.',
    likes: '23'
  }

];

// adds more posts to the posts array
const postExample = posts[0];
for (let i = 0; i < 10; i++) {
  posts.push(postExample);
}


export default function Explore() {
  return (
    <>
      <FeaturedCategories />
      <FeaturedPostsFeed posts={posts} />
    </>
  );
}