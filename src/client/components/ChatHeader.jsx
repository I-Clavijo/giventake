import React from 'react'
import styles from "./ChatHeader.module.scss";

function ChatHeader() {
  return (
    <div className={styles.chatTop}>
        <div>
            <img className="rounded-full" src="https://via.placeholder.com/50" alt="Profile Pic"/>
        </div>
        <div className={styles.userInfo}>
            <p><strong>Users name</strong></p>
            <p>online..</p>
        </div>
    </div>
  )
}

export default ChatHeader
