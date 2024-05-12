import styled from 'styled-components';
import ProfileImg from '../../assets/images/profile-img.jpeg';
import { differenceInDays } from 'date-fns';
import { useState } from 'react';
import ChatMessage from './ChatMessage';
import { Button, TextInput, Textarea } from 'flowbite-react';
import CloseIcon from "../../assets/images/CloseIcon.svg"


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

const contacts = [
    {
        avatar: 'https://via.placeholder.com/50',
        name: 'Guy 1',
        // lastMessage: 'Hey, how are you?' ,
        lastMessage: chatHistory[chatHistory.length - 1].message,
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
        lastMessage: 'Hey, how are you?',
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

export default function ChatBox({ }) {

    return <$Wrapper>
        <div className='chatHeader'>
            <div className='imgCrop'>
                <img className="rounded-full" src="https://via.placeholder.com/50" alt="Profile Pic" />
            </div>
            <div className='userInfo'>
                <p style={{ padding: '10px' }}><strong>Users name</strong></p>
                {
                    window.innerWidth < 768 &&
                    <div className='exitIcon' onClick={() => setOpenChat(false)}>
                        <img src={CloseIcon} alt="Exit Icon" />
                    </div>
                }
            </div>
        </div>

        <div className='chatBody'>
            {chatHistory.map((message, index) => {
                const previousDate = (index > 0) ? chatHistory[index - 1].time : chatHistory[0].time;
                return <ChatMessage key={index} message={message} previousDate={previousDate} index={index} />
            })}
        </div>
        <div className='chatFooter'>
            <Textarea className='inputMessage' id="messageText" type="message" placeholder="Enter message" required shadow />
        </div>
    </$Wrapper>;
};


const $Wrapper = styled.div`
    height: 100%;
    width: 100%;
    overflow:hidden;
    display: flex;
    flex-direction: column;

    .chatHeader{
        position: relative;
        display: flex;
        align-items: center;
        column-gap: 10px;
        border-top-right-radius: 5px;
        margin-bottom: 3px;
        background-color: #fff;
        height: 3.1rem;
        padding: .5em;

        .imgCrop {
            height: 100%;

            img {
                height: 100%;
            }
        }

        p {
            margin: unset;
        }

        .userInfo {
            display: flex;
            justify-content: space-between;
            flex-grow: 1;
            padding: auto;

            .exitIcon {
                // position: absolute;
                padding: 7px;
            }
        }

    }
    .chatBody{
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: 10px;
        flex-grow: 1;
        overflow: auto;
        padding-bottom: 50px;
        background-color: #f3f4f6;

        .logo{
            position: absolute;
            // margin-left: 31vw;
            color: green;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0.3;
            pointer-events: none;

            h1 {
                margin-bottom: unset;
            }
        }      
    }

    .chatFooter{
        background: #f5f5f5;
        display: flex;
        justify-content: space-between;
        width: 100%;
        bottom: 0;
        min-height: 4rem;
        max-height: 10rem;

        @media screen and (max-width: 767px){ // Mobile
            // padding-bottom: 50px;
        }


        .inputMessage{
            /* flex-grow: 1; */
            resize: none;
            input{
                width: 100%;
                border-radius: unset;
                outline: none;
            }
        }
    
        .sendButton {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;

            button {
                text-align: center;
                padding-inline: 10px;
                height: 100%;
                background-color: #8cd28e;
                color: white;
                cursor: pointer;
            }
        }  
    }
`;