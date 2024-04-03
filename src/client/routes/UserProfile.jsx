import React from 'react';
import './UserProfile.css'; 

const user = {
  name: 'John Bush',
  location: 'San Francisco, CA',
  rating: 4.5,
  interests: ['Photography', 'Travel', 'Coding'],
  info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod bibendum laoreet.'
};

const Profile = () => {
  const profilePicture = "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg";
  

  return (
    <div className="profile-container">
    <div className="top-bar">
      <div className="left-section">
        <span className="arrow-left"></span>
      </div>
      <span className="usernameBar">{user.name}</span>
    </div>
      <img src={profilePicture} alt="Profile Picture" className="profile-picture" />
      <h2 className="username">{user.name}</h2>
      <p className="location">{user.location}</p>
      <p className="rating">{user.rating}/5</p>
      <p className="interests">
        {user.interests.map((interest, index) => (
          <span key={index}>
            {interest} {index < user.interests.length - 1 ? '•' : ''}
          </span>
        ))}
      </p>
      <p className="info">{user.info}</p>
      <div className="buttons">
        <button className="follow-btn">עקוב אחרי</button>
        <button className="contact-btn">צור קשר</button>
      </div>
    </div>
  );
};

export default Profile;
