import React, { useState } from 'react';
import styles from './InterestsSelection.module.css';
import { Button } from "flowbite-react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaComputer, FaHandHoldingHand } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { FaCar , FaHammer, FaStarOfDavid, FaUmbrellaBeach, FaLightbulb} from "react-icons/fa";





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




  const InterestsSelection = ({ selectedInterests, onInterestSelection }) => {

    const handleClick = ( interestName) => {
      onInterestSelection(interestName);
    }

    return (
      <div className={styles.interestsSelection}>
        <div className= {styles.gridContainer}>
            {interests.map((interest) => (
                <Button color="lightgrey" onClick={() => handleClick(interest.name)}
                className={`${styles.interestButton} ${
                    selectedInterests.includes(interest.name) ? styles.selectedButton : ''}`}
                > 
                <div className={styles.buttonIcon}>{interest.icon}</div>
                {interest.name}</Button>
            ))}
        </div>
      </div>
    );
  };
  

export default InterestsSelection;