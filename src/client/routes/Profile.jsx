import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button, Tabs } from "flowbite-react";
import Stars from '../components/Stars';
import { useUser } from '../api/hooks/useUser';
import { HiChartSquareBar, HiClipboardList, HiUserCircle } from "react-icons/hi";
import styles from './Profile.module.scss';
import ProfileImg from '../assets/images/profile-img.jpeg';
import { HiOutlinePencilSquare } from "react-icons/hi2";




const Profile = () => {
  const { data: user } = useUser();

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const interestsSepByDots = user.interests?.map((interest, index) => (
    <span key={index}>
      {interest} {index < user.interests.length - 1 ? '•' : ''}
    </span>
  ));

  return <>
    <Card>
      <div className={styles.profileInfo}>
        <div className={styles.profileLeft}>
          <img className="w-28 h-28 mb-3 rounded-full shadow-lg" src={ProfileImg} alt="Profile image" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user.location || 'unknown location'}</span>
          <div className="pb-10">
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
              <p className={styles.statText}>Following</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statNumber}>20</p>
              <p className={styles.statText}>Followers</p>
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
            <Button>Follow</Button>
            <Button color="light">Message</Button>
          </div>
          )}
        </div>
      </div>

      
    </Card>


    <Tabs aria-label="Default tabs" style="default">
      {isOwnProfile && (
      <Tabs.Item active title="My Posts" icon={HiUserCircle}>
        This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
        add here posts the belong to this user
      </Tabs.Item>
      )}
      {!isOwnProfile && (
      <Tabs.Item active title="Posts" icon={HiUserCircle}>
        This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
        add here posts the belong to this user
      </Tabs.Item>
       )}
      <Tabs.Item title="Reviews" icon={HiChartSquareBar}>
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>

      <Tabs.Item title="Contacts" icon={HiClipboardList}>
        This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
        Here we gonna list all the contant the the user follows-in a list,and add the option to follow them to
        Maybe list mutaul friends as well.
      </Tabs.Item>

    </Tabs>


  </>;
};

export default Profile;