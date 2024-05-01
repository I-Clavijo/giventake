import { Link } from 'react-router-dom';
import { Card, Button } from "flowbite-react";
import Stars from '../components/Stars';
import { useUser } from '../api/user/useUser';

import styles from './Profile.module.scss';
import ProfileImg from '../assets/images/profile-img.jpeg';
import { HiOutlinePencilSquare } from "react-icons/hi2";


const user = {
  name: 'John Bush',
  location: 'San Francisco, CA',
  rating: 4.5,
  interests: ['Photography', 'Travel', 'Coding'], 
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod bibendum laoreet.',
};

const Profile = () => {
  const { data: user } = useUser();

  const interestsSepByDots = user.interests?.map((interest, index) => (
    <span key={index}>
      {interest} {index < user.interests.length - 1 ? '•' : ''}
    </span>
  ));

  return <>
    <div className={styles.profileContainer}>
      <Card>
        <div className={styles.topActions}>
          <Link to='/account/edit'>
            <Button color="light" pill className={styles.btnEdit}>
              <HiOutlinePencilSquare className="mr-2 h-5 w-5" />
              Edit
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-28 mb-3 rounded-full shadow-lg" src={ProfileImg} alt="Profile image" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user.location || 'unknown location'}</span>
          <Stars grade={user.rating || 0} />
          <p className={styles.interests}>{interestsSepByDots}</p>
          <p className={styles.info}>{user.bio}</p>

          <div className={styles.actions}>
            <Button>Follow</Button>
            <Button color="light">Message</Button>
          </div>
        </div>
      </Card>
    </div>
  </>;
};

export default Profile;
