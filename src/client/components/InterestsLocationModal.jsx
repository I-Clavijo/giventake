import React from 'react';
import styles from './InterestsLocationModal.module.css';
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import InterestsSelection from './InterestsSelection.jsx';
import CitySelector from './CitySelector.jsx';
import GetUserCountryCodeUsingIP from './GetUserCountryCodeUsingIP.jsx';
import GetUserCountryCodeUsingNavGeo from './GetUserCountryCodeUsingNavGeo.jsx';

const InterestsLocationModal = () => {
  const [openModal, setOpenModal] = useState(true);
  const [countryCodeUsingIP, setCountryCodeUsingIP] = useState(null);
  const [countryCodeUsingNavGeo, setCountryCodeUsingNavGeo] = useState(null);

  const displayedCountryCode = countryCodeUsingIP || countryCodeUsingNavGeo;

  return (
    <>
      <GetUserCountryCodeUsingIP onCountryChangeUsingIP={setCountryCodeUsingIP} />
      <GetUserCountryCodeUsingNavGeo onCountryChangeUsingNavGeo={setCountryCodeUsingNavGeo} />
      <Modal size="xl" position="center" dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
            <div className={styles.title}>Thank you for joining!</div>
            <div className={styles.subtitle}>To get a more presonalized experience, we would like to know a little more about you</div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.body}>
            <label>
              Where are you located?
            </label>
            <p style={{ marginLeft: '10px' }}>Country: {displayedCountryCode}</p>
            <CitySelector/>
            <label>
              What are your interests? Select the ones you like
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