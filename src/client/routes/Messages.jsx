import { useState } from "react";
import styles from "./Messages.module.scss";
import { Button, TextInput, Card } from 'flowbite-react';
import ChatMessage from "../components/ChatMessage";
import ChatHeader from "../components/ChatHeader";
import { format, formatDistanceToNow ,formatRelative, differenceInDays, isYesterday} from 'date-fns';

const chatHistory = [
    { 
        sender: 'Alice', 
        message: 'Hi Bob! How are you doing today?', 
        time: new Date('2024-04-20T12:00:00') 
    },
    { 
        sender: 'Bob', 
        message: 'Hey Alice! I\'m good, thanks. How about you?', 
        time: new Date('2024-04-21T12:15:00') 
    },
    { 
        sender: 'Alice', 
        message: 'I\'m doing well too, thanks! Did you have a good weekend?', 
        time: new Date('2024-04-27T12:30:00') 
    },
    { 
        sender: 'Bob', 
        message: 'Yeah, it was nice. I went hiking with some friends. What about you?', 
        time: new Date('2024-04-28T13:00:00') 
    },
    { 
        sender: 'Alice', 
        message: 'That sounds fun! I mostly relaxed at home and caught up on some reading.', 
        time: new Date('2024-04-28T13:15:00') 
    },
    { 
        sender: 'Bob', 
        message: 'Nice! Any good books you\'d recommend?', 
        time: new Date('2024-04-30T13:30:00') 
    },
    { 
        sender: 'Alice', 
        message: 'Definitely! I just finished "The Night Circus" by Erin Morgenstern. It\'s magical!', 
        time: new Date('2024-05-01T14:00:00') 
    },
];



const chatData = [
	{ 
		avatar: 'https://via.placeholder.com/50', 
		name: 'Guy 1', 
		// lastMessage: 'Hey, how are you?' ,
		lastMessage: chatHistory[chatHistory.length - 1].message ,
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
	{ 
		avatar: 'https://via.placeholder.com/50', 
		name: 'Guy 1', 
		lastMessage: 'Hey, how are you?' ,
		// lastMessage: chatHistory[chatHistory.length]["message"] ,
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
];

export default function Messages() {
	// const [chatHistory, setChatHistory] = useState([]);
	const [openChat, setOpenChat] = useState(false)
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
	const currDate = new Date()
	return (
<>			<div>{}</div>
			<div className={styles.chatPage}>
					<Card className={`max-w-sm ${styles.cardWrapper}`}>
					<div className="flex items-center justify-between">
						<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Last Messages</h5>
					</div>
					<div className="flow-root" style={{ overflow: 'auto'}}>
						<ul className="divide-y divide-gray-200 dark:divide-gray-700">
						{
							chatData.map((chat, index) => {
								return (
									<li className="py-3 sm:py-4" key={index}>
										<div onClick={() => setOpenChat(true)} className="flex items-center space-x-4">
											<div className="shrink-0">
												<img className="rounded-full" src={chat.avatar} alt="Profile Pic"/>
											</div>
											<div className="min-w-0 flex-1">
												<p className="truncate text-sm font-medium text-gray-900 dark:text-white">{chat.name}</p>
												<div className="flex justify-between">
													<p className="truncate text-sm text-gray-500 dark:text-gray-400">{chat.lastMessage}</p>
													<p className="text-sm text-gray-500 dark:text-gray-400 me-2">{calcRealtiveDay(chatHistory[1].time, chatHistory[0].time)}</p>
												</div>
											</div>
										</div>
									</li>
								)
							})
						}
						</ul>
					</div>
				</Card>
				
				<div className={`${styles.lastChat} ${openChat && styles.show}`}>
					<ChatHeader setOpenChat={setOpenChat}/>					
					<div className={styles.chatBody}>			
						<div className={styles.logo}>
							<h1>Given'take logo</h1>
						</div>
						{chatHistory.map((message, index) => {
							const previousDate = (index > 0) ? chatHistory[index - 1].time : chatHistory[0].time;
							return (
								<ChatMessage key={index} message={message} previousDate={previousDate} index={index}/>
							)
						})}
					</div>						
					<div className={styles.chatFooter}>
						<TextInput className={styles.inputMessage} id="messageText" type="message" placeholder="Enter message" required shadow />
						<Button type="submit" className="button">send</Button>
					</div>
				</div>
				</div>

		</>
	);
}
