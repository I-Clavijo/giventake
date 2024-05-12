import { useEffect, useRef, useState } from "react";
import styles from "./Messages.module.scss";
import ChatBox from "../components/Messages/ChatBox";
import { useUser } from '../api/users/useUser';
import { BASE_URL } from "../api/axios";
import { io } from 'socket.io-client';
import ChatSelector from "../components/Messages/ChatSelector";

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



export default function Messages() {
	const { data: user } = useUser();
	const socket = useRef();
	const [openChat, setOpenChat] = useState(false);
	const [currentChat, setCurrentChat] = useState();


	useEffect(() => {
		if (user) {
			socket.current = io(BASE_URL);
			socket.current.emit("add-user", user._id);
		}
	}, [user]);

	const chatChangeHandler = (chat) => {
		setOpenChat(true);
	};

	return (
		<>
			<div className={styles.chatPage}>
				<div className={`max-w-sm ${styles.cardWrapper}`}>
					<ChatSelector onChatChange={chatChangeHandler} />

				</div>
				<div className={`${styles.chatBox} ${openChat && styles.show}`}>
					<ChatBox {...{ socket }} />
				</div>
			</div>

		</>
	);
}
