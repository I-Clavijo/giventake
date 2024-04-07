import styles from "./Messages.module.scss";


export default function Messages() {
	const chatData = [
        { 
            avatar: 'https://via.placeholder.com/50', 
            name: 'Guy 1', 
            lastMessage: 'Hey, how are you?' ,
			time: '14:12'
        },
        { 
            avatar: 'https://via.placeholder.com/50', 
            name: 'Guy 2', 
            lastMessage: 'What time are we meeting tomorrow?',
			time: '12:02'
        },
        { 
            avatar: 'https://via.placeholder.com/50', 
            name: 'Guy 3', 
            lastMessage: 'Did you finish that report yet?',
			time: '21:21'
        },
        // Add more chat data as needed
    ];

	return (
		<>
			<h1 className={styles.hello}>Messages</h1>
			{chatData.map((chat, index) => (
            	<div className={styles.chatContainer}>  {/*CHATCONTAINER IS PROFILE PIC, NAME AND LAST MESSAGE */}
                    <>
						<span key={index} > {/* THE PROFILE PIC */}
							<img src="https://via.placeholder.com/50" alt="Profile" className={styles.profilePicture} />
						</span>
						
						<span key={index} className={styles.chatBox}> {/* THE CHATBOX PRESENT THE USER AND LAST MESSAGE */}
							<div className={styles.chatInfo}> 
								{chat.name}
							</div>

							<div className={styles.lastMessage}> {/* THE LAST MESSAGE INCLUDE THE TIME AND THE DATA */}
								<span className={styles.leftSpan}>
									{chat.lastMessage}
								</span>
								<span className={styles.time}>
									{chat.time}
								</span>
							</div>
						</span>
					</>
            	</div> 	
			))}	
		</>
	);
}