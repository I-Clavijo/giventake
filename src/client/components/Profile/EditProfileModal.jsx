import React from 'react';
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export function EditProfileModal() {
  const [openModal, setOpenModal] = useState(true);
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState([]); // Array to store selected interests

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleInterestChange = (event) => {
    const isChecked = event.target.checked;
    const interest = event.target.value;

    if (isChecked) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter((i) => i !== interest));
    }
  };

  return (
    <>
      <Modal size="xl" position="center" dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div>Edit Profile</div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>
              where are you located?
            </label>
            <input type="text" value={location} onChange={handleLocationChange} />
            <br/>
            <label>
              what are your interests? select the ones you like
            </label>
            {/* Replace with your actual interests */}
            <div>
              <input type="checkbox" id="interest1" value="Sports" onChange={handleInterestChange} />
              <label htmlFor="interest1">Sports</label>
            </div>
            <div>
              <input type="checkbox" id="interest2" value="Music" onChange={handleInterestChange} />
              <label htmlFor="interest2">Music</label>
            </div>
            {/* Add more interest checkboxes as needed */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Update</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Later
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
