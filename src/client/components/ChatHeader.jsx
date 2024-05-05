import React from 'react'
import styles from "./ChatHeader.module.scss";
import CloseIcon from "../assets/images/CloseIcon.svg"

function ChatHeader({setOpenChat}) {
  return (
    <div className={styles.chatTop}>
        <div>
            <img className="rounded-full" src="https://via.placeholder.com/50" alt="Profile Pic"/>
        </div>
        <div className={styles.userInfo}>
              
              <p style={{padding : '10px'}}><strong>Users name</strong></p>
              {
                window.innerWidth < 768 &&
                <div className={styles.exitIcon} onClick={() => setOpenChat(false)}>
                  <img src={CloseIcon} alt="Exit Icon"/>
                </div>
              }
            
        </div>
        


    </div>
  )
}

export default ChatHeader
