import React from 'react';
import styles from './InterestsLocationModal.module.css';
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import InterestsSelection from './InterestsSelection.jsx';
import LocationSelection from './LocationSelection.jsx';
import LocationSelection2 from './LocationSelection2.jsx';


const InterestsLocationModal = () => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
            <div className={styles.title}>Thank you for joining!</div>
            <div className={styles.subtitle}>To get a more presonalized experience, we would like to know a little more about you</div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.body}>
            <label>
              where are you located?
            </label>
            <LocationSelection/>
            <LocationSelection2/>
            <label>
              what are your interests? select the ones you like
            </label>
            <InterestsSelection/>
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



export default InterestsLocationModal;