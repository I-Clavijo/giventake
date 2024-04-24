import React from 'react';
import styles from "./ChatMessage.module.scss";

const ChatMessage = ({message}) => {
    return (
        <div className={message.sender === 'Bob' ? styles.messageWrapper : `${styles.messageWrapper} ${styles.alignRight}`}>
            <div className={message.sender !== 'Bob' ? `${styles.profileImg} ${styles.right}` : styles.profileImg}>
                <img src="https://via.placeholder.com/50" alt="Profile Pic"/>
            </div>
            <div className={styles.message}>
                {message.message}
                <p className={styles.time}>12:23</p>
            </div>
        </div>
    )
            
};

export default ChatMessage;