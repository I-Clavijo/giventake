import React from 'react';
import styles from './UserProfile.module.scss';

const user = {
  name: 'John Bush',
  location: 'San Francisco, CA',
  rating: 4.5,
  interests: ['Photography', 'Travel', 'Coding'],
  info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod bibendum laoreet.',
};

const Profile = () => {
  const profilePicture = "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg";

  return (
    <div className={styles.profileContainer}> 
      <img src={profilePicture} alt="Profile Picture" className={styles.picture} />
      <h2 className={styles.username}>{user.name}</h2>
      <p className={styles.location}>{user.location}</p>
      <p className={styles.rating}>{user.rating}/5</p>
      <p className={styles.interests}>
        {user.interests.map((interest, index) => (
          <span key={index}>
            {interest} {index < user.interests.length - 1 ? '•' : ''}
          </span>
        ))}
      </p>
      <p className={styles.info}>{user.info}</p>
      <div className={styles.buttons}>
        <button className={styles.followBtn}>עקוב אחרי</button>
        <button className={styles.contactBtn}>צור קשר</button>
      </div>
    </div>
  );
};

export default Profile;