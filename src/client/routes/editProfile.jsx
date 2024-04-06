import { useState } from 'react';
import { Label, TextInput, Textarea, Dropdown, Button } from "flowbite-react";

import styles from './EditProfile.module.scss';
import ProfileImg from '../assets/images/profile-img.jpeg';

const user = {
    name: 'John Bush',
    location: 'San Francisco, CA',
    rating: 4.5,
    interests: ['Photography', 'Travel', 'Coding'],
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod bibendum laoreet.',
};
const interests = ['Photography', 'Travel', 'Coding', 'Music', 'Sports', 'Reading', 'Cooking', 'Gaming', 'Art', 'Fashion', 'Fitness', 'Dancing'];
const EditProfile = () => {
    // State for selected interests
    const [selectedInterests, setSelectedInterests] = useState([]);

    // Function to handle interest selection
    const handleInterestClick = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const interestsPicker = interests.map((interest, index) => {

        const btnSelectedClass = selectedInterests.includes(interest) ? styles.selected : '';
        return <Button
            color="gray"
            key={index}
            onClick={() => handleInterestClick(interest)}
            className={`${styles.interestBtn} ${btnSelectedClass}`}>
            {interest}
        </Button>;
    });

    return (
        <div className={styles.profileContainer}>
            <img src={ProfileImg} alt="Profile Picture" className={styles.picture} />
            <h2 className={styles.username}>{user.name}</h2>
            <p className={styles.location}>{user.location}</p>
            <div className={styles.interestsGrid}>{interestsPicker}</div>

            <Label htmlFor="fname" value="First Name" className="mb-2 block" />
            <TextInput id="fname" type="text" className="mb-4 block" />

            <Label htmlFor="lname" value="Last Name" className="mb-2 block" />
            <TextInput id="lname" type="text" className="mb-4 block" />

            <Label htmlFor="bio" value="Bio" className="mb-2 block" />
            <Textarea id="bio" placeholder="Write description here..." required rows={4} className={styles.customTextarea} />

            <Label htmlFor="country" value="Country" className="mb-2 block" />
            <Dropdown id="country" label="Select your Country" color='light'>
                {/* TODO: generate countries dynamically */}
                <Dropdown.Item>Israel</Dropdown.Item>
                <Dropdown.Item>Cyprus</Dropdown.Item>
                <Dropdown.Item>Egypt</Dropdown.Item>
            </Dropdown>

            <Label htmlFor="city" value="City" className="mb-2 block" />
            <TextInput id="city" type="text" className="mb-4 block" />

            <Label htmlFor="address" value="Address" className="mb-2 block" />
            <TextInput id="address" type="text" className="mb-4 block" />

            <Button>Save changes</Button>
        </div>
    );
};

export default EditProfile;
