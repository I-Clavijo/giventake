import React from 'react';
import styles from './InterestsLocationModal.module.css';
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InterestsSelection from './InterestsSelection.jsx';
import CitySelector from './CitySelector.jsx';
import useUserCountryCodeUsingIP from './useUserCountryCodeUsingIP.jsx';
import useUserCountryCodeUsingNavGeo from './useUserCountryCodeUsingNavGeo.jsx';


const InterestsLocationModal = () => {

  const [openModal, setOpenModal] = useState(true);
  const countryCodeUsingIP = useUserCountryCodeUsingIP();
  const countryCodeUsingNavGeo = useUserCountryCodeUsingNavGeo();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const displayedCountryCode = countryCodeUsingIP || countryCodeUsingNavGeo;

  const handleSelectedInterest = (selectedInterest) => {

    const newSelectedInterests = [...selectedInterests]; // Create a copy

    if (newSelectedInterests.includes(selectedInterest)) {
        newSelectedInterests.splice(newSelectedInterests.indexOf(selectedInterest), 1);
    } else {
        newSelectedInterests.push(selectedInterest);
    }
    setSelectedInterests(newSelectedInterests);
  }
  
  const onSubmit = (data) => {
    // Combine form data with selected interests
    const formDataWithInterests = { ...data, interests: selectedInterests };
    console.log('Form data with interests:', formDataWithInterests);
    setOpenModal(false);
    
  }

  return (
    <>
   <form onSubmit={handleSubmit(onSubmit)}>
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
              <p style={{ marginLeft: '5px' }}>Country: {displayedCountryCode}</p>
              <div className={styles.citySelector}>
                <CitySelector setValue={setValue}/>
                {errors.city && <span className="error">{errors.city.message}</span>}
              </div>
              <label>
                What are your interests? Select the ones you like
              </label>
              <InterestsSelection selectedInterests={selectedInterests} onInterestSelection={handleSelectedInterest}/>
              {errors.interests && <span className="error">{errors.interests.message}</span>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit(onSubmit)}>Update</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Later
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default InterestsLocationModal;