import styled from 'styled-components';
import ProfileImg from '../../assets/images/profile-img.jpeg';
import { differenceInDays } from 'date-fns';
import { useState } from 'react';
import { Tabs } from 'flowbite-react';


const TABS = {
    All: 'All',
    Open: 'Open',
    Closed: 'Closed'
};

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
    }, {
        avatar: 'https://via.placeholder.com/50',
        name: 'Guy 3',
        lastMessage: 'Did you finish that report yet?',
        time: '21:21'
    }, {
        avatar: 'https://via.placeholder.com/50',
        name: 'Guy 3',
        lastMessage: 'Did you finish that report yet?',
        time: '21:21'
    }, {
        avatar: 'https://via.placeholder.com/50',
        name: 'Guy 3',
        lastMessage: 'Did you finish that report yet?',
        time: '21:21'
    }, {
        avatar: 'https://via.placeholder.com/50',
        name: 'Guy 3',
        lastMessage: 'Did you finish that report yet?',
        time: '21:21'
    }, {
        avatar: 'https://via.placeholder.com/50',
        name: 'Guy 3',
        lastMessage: 'Did you finish that report yet?',
        time: '21:21'
    },
];


const calcRealtiveDay = (date1, date2) => {
    let x = differenceInDays(date1.toString(), date2.toString())
    if (x === 0)
        return date2.getHours() + ':' + (date2.getMinutes() < 10 ? '0' : '') + date2.getMinutes()
    else if (x === 1)
        return "Yesterday"
    else if (x < 7)
        return x + " day ago"
    // else 
    return date2.getDate().toString() + '/' + (date2.getMonth() + 1).toString()
}


export default function ChatContacts({ onContactClick, selectedChatId }) {
    const [selectedTab, setSelectedTab] = useState(TABS.All);
    const [currentSelected, setCurrentSelected] = useState();

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        // changeChat(contact);
    };


    const contactsList = <div className='contacts'>
        <ul>
            {contacts.map((contact, index) => <li className={`${index === currentSelected ? "selected" : ""}`} onClick={() => changeCurrentChat(index, contact)} key={index}>
                <div className='profile-img'>
                    <img className="rounded-full" src={ProfileImg} alt="Profile Pic" />
                </div>
                <div className="details">

                    <div className="top">
                        <p className="title">{contact.name}</p>
                        <p className="date">{calcRealtiveDay(chatHistory[1].time, chatHistory[0].time)}</p>
                    </div>
                    <p className="msg-preview">{contact.lastMessage}</p>
                </div>

            </li>
            )}
        </ul>
    </div>;

    return <$Wrapper>
        <$Tabs>
            {Object.keys(TABS).map((currTab) =>
                <$TabItem key={currTab} $isActive={selectedTab === currTab} onClick={() => setSelectedTab(currTab)}>{currTab}</$TabItem>
            )}
        </$Tabs>
        {contactsList}
    </$Wrapper>;
};


const $Wrapper = styled.div`
display:flex;
flex-direction:column;

.contacts{
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;

    p{
        margin:0;
        padding:0;
    }

    ul{        
        li{
            position: relative;
            height: 5em;
            display: flex;
            gap: 1em;
            overflow: hidden;
            padding:.4em;
            border-bottom: 1px solid #eee;
            cursor: pointer;

            &.selected{
                border-left: #637084 .3em solid;
                background-color: #f6f6f6;
            }
            .profile-img{
                padding: .3em;
                img{
                    height: 100%;
                }
            }
            .details{
                display: flex;
                flex-direction:column;
                justify-content: space-between;
                width: calc(100% - 5em);

                .top{
                    display: flex;
                    justify-content: space-between;

                    .title{
                        font-weight: 600;
                    }
                    .date{
                        color: var(--secondary-font-color);
                        font-size: .8em;
                    }
                }

                .msg-preview{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: .9em;
                    white-space: nowrap;

                    @supports (-webkit-line-clamp: 2) {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: initial;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
}
`;

const $Tabs = styled.div`
    border-bottom: .1em solid #eee;
    height: fit-content;
`;

const $TabItem = styled.button`
    font-weight: 500;
    padding: .8em;
    border-bottom: .2em solid transparent;

    ${({ $isActive }) => $isActive && `
        border-bottom: .2em solid var(--third-color);
        color: var(--third-color);
    `}
    &:hover{
        color: var(--third-color);
    }
`;

{/* <div className="flex items-center justify-between">
<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Last Messages</h5>
</div>
<div className="flow-root" style={{ overflow: 'auto' }}>
<ul className="divide-y divide-gray-200 dark:divide-gray-700">
    {chatData.map((chat, index) => {
        return (
            <li className={`py-3 sm:py-4 ${s.rowContact}`} key={index}>
                <div onClick={onContactClick} className="flex items-center space-x-4">
                    <div className={s.imgCrop}>
                        <img className="rounded-full" src={ProfileImg} alt="Profile Pic" />
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
</div>; */}