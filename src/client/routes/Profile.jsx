import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button, Tabs } from "flowbite-react";
import Stars from '../components/Stars';
import { useUser } from '../api/hooks/useUser';
import { HiChartSquareBar, HiClipboardList, HiUserCircle } from "react-icons/hi";
import styles from './Profile.module.scss';
import ProfileImg from '../assets/images/profile-img.jpeg';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import FeaturedPostsFeed from "../components/FeaturedPostsFeed.jsx";
import ReviewsFeed from "../components/Reviews.jsx"


const postExample = posts[0];
for (let i = 0; i < 10; i++) {
  posts.push(postExample);
}
const Profile = () => {
  const { data: user } = useUser();

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  {/* filter only the posts that belong to this profile*/}
  const filterUserPosts = (posts, user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return posts.filter(post => post.name === fullName);
  };
  const userPosts = filterUserPosts(posts, user);

  const interestsSepByDots = user.interests?.map((interest, index) => (
    <span key={index}>
      {interest} {index < user.interests.length - 1 ? '•' : ''}
    </span>
  ));

  return <>
    <Card>
      <div className={styles.profileInfo}>
        <div className={styles.profileLeft}>
          <img className="w-28 h-28 mb-2  rounded-full shadow-lg" src={ProfileImg} alt="Profile image" />
          <h5 className="ml-2 text-xxl font-large text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user.location || 'unknown location'}</span>
          <div className="pb-1">
            <Stars grade={user.rating || 0} />
            <p className={styles.interests}>{interestsSepByDots}</p>
            <p className={styles.info}>{user.bio}</p>
          </div>
        </div>

        <div className={styles.profileRight}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <p className={styles.statNumber}>3</p>
              <p className={styles.statText}>Posts</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statNumber}>10</p>
              <p className={styles.statText}>Followers</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statNumber}>20</p>
              <p className={styles.statText}>Following</p>
            </div>
          </div>
          {isOwnProfile && (
          <div className={styles.topActions}>
            <Link to='/account/edit'>
              <Button color="light" pill className={styles.btnEdit}>
                <HiOutlinePencilSquare className="mr-2 h-5 w-5" />
                Edit
              </Button>
            </Link>
          </div>
          )}
          {!isOwnProfile && (
          <div className={styles.actions}>
            <Button color="light">Message</Button>
            <Button>Follow Me</Button>
          </div>
          )}
        </div>
      </div>
    </Card>

    <Tabs aria-label="Default tabs" style="default" className="flex justify-center mt-2">
      {isOwnProfile && (
      <Tabs.Item active title="My Posts" icon={HiUserCircle} className="tabItem">
            <FeaturedPostsFeed posts={userPosts} showTitle={false} />
      </Tabs.Item>
      )}
      {!isOwnProfile && (
      <Tabs.Item active title="Posts" icon={HiUserCircle} className="tabItem">
          {/* should change to userPosts also when is ready */}
      <FeaturedPostsFeed posts={posts} showTitle={false} />
      </Tabs.Item>
       )}
      <Tabs.Item title="Reviews" icon={HiChartSquareBar} className="tabItem">
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.

       {/*<ReviewsFeed reviews={reviews}/>*/}
      </Tabs.Item>

      <Tabs.Item title="Contacts" icon={HiClipboardList} className="tabItem">
        This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
     
      </Tabs.Item>

    </Tabs>


  </>;
};

export default Profile;