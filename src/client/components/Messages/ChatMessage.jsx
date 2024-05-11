import React from 'react';
import styles from "./ChatMessage.module.scss";
import { format, formatDistanceToNow ,formatRelative, differenceInDays, isYesterday} from 'date-fns';


const ChatMessage = ({message, previousDate, index}) => {

    const currDate = new Date()
    const calcRealtiveDay = (date1, date2) => {
        let x = differenceInDays(date1.toString(), date2.toString())
        if (x === 0)
            return date2.getHours() + ':' + (date2.getMinutes() < 10 ? '0' : '') + date2.getMinutes()
        else if (x === 1)  
            return "Yesterday" 
        else if (x < 7)
            return x + " day ago"
        // else 
        return date2.getDate().toString() + '/' + (date2.getMonth()+1).toString()
    }


    
    return (
        <>
            <div className={message.time.getDate() - previousDate.getDate() !== 0  || index === 0 ? styles.test : `${styles.test} ${styles.testHidden}`}>
                {calcRealtiveDay(currDate,message.time)}
            </div>
            <div className={message.sender === 'Bob' ? styles.messageWrapper : `${styles.messageWrapper} ${styles.alignRight}`}>
                <div className={message.sender !== 'Bob' ? `${styles.profileImg} ${styles.right}` : styles.profileImg}>
                    <img src="https://via.placeholder.com/50" alt="Profile Pic"/>
                </div>
                <div className={styles.message}>
                    {message.message}
                    <p className={styles.time}>{message.time.getHours()}:{(message.time.getMinutes() < 10 ? '0' : '') + message.time.getMinutes()}</p>
                </div>
            </div>
        </>
    )
            
};

export default ChatMessage;
