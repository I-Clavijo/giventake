import styles from "./Messages.module.scss";
import { Button, TextInput, Card } from 'flowbite-react';
import ChatMessage from "../components/ChatMessage";
import ChatHeader from "../components/ChatHeader";

const chatHistory = [
	{ sender: 'Alice', message: 'Hi Bob! How are you doing today? Hi Bob! How are you doing today? Hi Bob! How are you doing today?' },
	{ sender: 'Bob', message: 'Hey Alice! I\'m good, thanks. How about you?' },
	{ sender: 'Alice', message: 'I\'m doing well too, thanks! Did you have a good weekend?' },
	{ sender: 'Bob', message: 'Yeah, it was nice. I went hiking with some friends. What about you?' },
	{ sender: 'Alice', message: 'That sounds fun! I mostly relaxed at home and caught up on some reading.' },
	{ sender: 'Bob', message: 'Nice! Any good books you\'d recommend?' },
	{ sender: 'Alice', message: 'Definitely! I just finished "The Night Circus" by Erin Morgenstern. It\'s magical!' },
	{ sender: 'Bob', message: 'Oh, I\'ve heard about that one. I\'ll add it to my list!' },
	{ sender: 'Alice', message: 'You should! So, how\'s work going?' },
	{ sender: 'Bob', message: 'It\'s busy as usual, but things are going well. How about your job?' },
	{ sender: 'Alice', message: 'Pretty good! We\'re working on an exciting project right now.' },
	{ sender: 'Bob', message: 'That\'s awesome to hear. What\'s the project about?' },
	{ sender: 'Alice', message: 'It\'s a new app for tracking daily habits and goals. I think it\'ll be really helpful.' },
	{ sender: 'Bob', message: 'Sounds interesting! Let me know when it\'s ready—I\'d love to try it out.' },
	{ sender: 'Alice', message: 'Will do! By the way, are you free this weekend? We could grab coffee.' },
	{ sender: 'Bob', message: 'I think I should be free. Coffee sounds great!' },
	{ sender: 'Alice', message: 'Perfect! How about Saturday afternoon?' },
	{ sender: 'Bob', message: 'Works for me. See you then!' },
	{ sender: 'Alice', message: 'Great! Looking forward to it.' },
	{ sender: 'Bob', message: 'Hey Alice, quick question—do you know any good sushi places around here?' },
	{ sender: 'Alice', message: 'Yes, there\'s a great sushi place called Sakura Sushi. I can show you the location.' },
	{ sender: 'Bob', message: 'Awesome, thanks! Let\'s go there after coffee on Saturday.' },
	{ sender: 'Alice', message: 'Sounds like a plan!' },
	{ sender: 'Bob', message: 'By the way, have you watched any good movies lately?' },
	{ sender: 'Alice', message: 'Not recently. Any recommendations?' },
	{ sender: 'Bob', message: 'I watched "Parasite" last week. It\'s fantastic!' },
	{ sender: 'Alice', message: 'Oh, I\'ve heard great things about that one. I\'ll check it out.' },
	{ sender: 'Bob', message: 'Definitely do! So, what else is new with you?' },
	{ sender: 'Alice', message: 'Not much, just trying to stay productive. How about you?' },
	{ sender: 'Bob', message: 'Same here. Hey, I\'ve been meaning to ask—do you play any musical instruments?' },
	{ sender: 'Alice', message: 'Yes, I play the piano. I used to take lessons when I was younger.' },
	{ sender: 'Bob', message: 'That\'s impressive! I\'ve always wanted to learn the guitar.' },
];
const chatData = [
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
	
	return (
		<>
			<div>
				<h1>Messages</h1>
				<div className={styles.chatPage}>
					 <Card className={`max-w-sm ${styles.cardWrapper}`}>
						<div className="flex items-center justify-between">
							<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Last Messages</h5>
						</div>
						<div className="flow-root" style={{ overflow: 'auto', maxHeight: '350px' }}>
							<ul className="divide-y divide-gray-200 dark:divide-gray-700">
							{
								chatData.map((chat, index) => {
									return (
										<li className="py-3 sm:py-4" key={index}>
											<div className="flex items-center space-x-4">
												<div className="shrink-0">
													<img className="rounded-full" src={chat.avatar} alt="Profile Pic"/>
												</div>
												<div className="min-w-0 flex-1">
													<p className="truncate text-sm font-medium text-gray-900 dark:text-white">{chat.name}</p>
													<div className="flex justify-between">
														<p className="truncate text-sm text-gray-500 dark:text-gray-400">{chat.lastMessage}</p>
														<p className="text-sm text-gray-500 dark:text-gray-400 me-2">{chat.time}</p>
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
					<div className={styles.lastChat}>
						<ChatHeader/>					
						<div className={styles.chatBody}>			
							<div className={styles.logo}>
								<h1>Given'take logo</h1>
							</div>
							{chatHistory.map((message, index) => (
								<ChatMessage key={index} message={message} />
							))}
						</div>						
						<div className={styles.chatFooter}>
							<TextInput className={styles.inputMessage} id="messageText" type="message" placeholder="Enter message" required shadow />
							<Button className={styles.sendButton} gradientMonochrome="info">send</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}