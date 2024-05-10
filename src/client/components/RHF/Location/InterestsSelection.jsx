import React, { useState } from 'react';
import styles from './InterestsSelection.module.css';
import { Button } from "flowbite-react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaComputer, FaHandHoldingHand } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { FaCar, FaHammer, FaStarOfDavid, FaUmbrellaBeach, FaLightbulb } from "react-icons/fa";
import { useController } from 'react-hook-form';

const interests = [
  { id: 1, icon: <AiOutlineGlobal />, name: 'General' },
  { id: 2, icon: <FaComputer />, name: 'Technology' },
  { id: 3, icon: <MdOutlinePets />, name: 'Pets' },
  { id: 4, icon: <FaCar />, name: 'Transport' },
  { id: 5, icon: <FaHammer />, name: 'Repairs' },
  { id: 6, icon: <FaStarOfDavid />, name: 'Together' },
  { id: 7, icon: <FaUmbrellaBeach />, name: 'Leisure' },
  { id: 8, icon: <FaLightbulb />, name: 'Advice' },
  { id: 9, icon: <FaHandHoldingHand />, name: 'Lending' }, // Added another interest to fill the 3x3 grid
];

const InterestsSelection = ({ name, control }) => {
  const { field, fieldState: { error } } = useController({ name, control });


  const handleSelectedInterest = (btnVal) => {
    const newSelectedInterests = [...field.value]; // Create a copy

    if (newSelectedInterests.includes(btnVal)) {
      newSelectedInterests.splice(newSelectedInterests.indexOf(btnVal), 1);
    } else {
      newSelectedInterests.push(btnVal);
    }

    field.onChange(newSelectedInterests);
  }

  return (
    <>
      <div className={styles.interestsSelection}>
        <div className={styles.gridContainer}>
          {interests.map((interest, index) => (
            <Button key={index}
              color="lightgrey"
              onClick={() => handleSelectedInterest(interest.name)}
              className={`${styles.interestButton} ${field.value.includes(interest.name) ? styles.selectedButton : ''}`}
            >
              <div className={styles.buttonIcon}>{interest.icon}</div>
              {interest.name}</Button>
          ))}
        </div>
      </div>
      {error?.message && <span className="error">{error?.message}</span>}
    </>
  );
};


export default InterestsSelection;