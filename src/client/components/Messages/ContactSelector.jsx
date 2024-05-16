import styled from 'styled-components';
import { useState } from 'react';
import Contact from './Contact';
import { getRelativeTime } from '../../utils/lib';

const TABS = {
  All: 'All',
  Open: 'Open',
  Closed: 'Closed'
};

const postsConversations = [
  {
    post: {
      _id: '6635f1e045bc959052495dbd',
      description: `🌟 New Release Alert!📚 Exciting news for all bookworms out there! 📚🎉 We're thrilled to announce the release of our latest novel, "Shadows of Destiny" by acclaimed author, Sarah Johnson. Dive into a world of mystery, suspense, and romance as you follow the captivating journey of our protagonist, Emily, through the twists and turns of fate.📖 Synopsis:In the quaint town of Willow Creek, secrets lurk in the shadows, waiting to be unearthed. When Emily discovers an ancient diary hidden in her grandmother's attic, she sets off on a quest to unravel the mysteries of her family's past. But as she delves deeper, she realizes that some secrets are better left buried. Will Emily uncover the truth before it's too late?🌟 Grab your copy today!Available in paperback, ebook, and audiobook formats. Don't miss out on the adventure that readers are calling "spellbinding" and "unputdownable"!📢 Special offer: Use code SHADOWS15 for 15% off your purchase!#NewRelease #Books #Mystery #Suspense #Romance #MustRead`,
      createdAt: '2024-05-04T08:29:20.291Z',
      usersInterested: [
        '6635f1e045bc959052495dasc',
        '6635f1e045bc959052495dafgv',
        '6635f1e045bc959052495da5b'
      ]
    },
    conversations: [
      {
        _id: '',
        users: ['66197bc771671388122f52a5', '662a05789d0bc8ab6d4905f2']
      },
      {
        _id: '',
        users: ['66197bc771671388122f523r', '662a05789d0bc8ab6d4905sv']
      }
    ]
  },
  {
    post: {
      _id: '663cefb1049d7722c1ba148e',
      description: `Hello everybody, I need your help with traveling with me to Italy to hike in the mountains, and help me with my wheelchair.`,
      createdAt: '2024-05-04T08:29:20.291Z',
      usersInterested: ['66197bc771671388122f52a5', '662a05789d0bc8ab6d4905f2']
    },
    conversations: [
      {
        _id: '',
        users: ['66197bc771671388122f52a5', '662a05789d0bc8ab6d4905f2']
      },
      {
        _id: '',
        users: ['66197bc771671388122f523r', '662a05789d0bc8ab6d4905sv']
      }
    ]
  }
];

const conversations_data = [
  {
    avatar: 'https://via.placeholder.com/50',
    name: 'Guy 1',
    // lastMessage: 'Hey, how are you?' ,
    lastMessage: 'What time are we meeting tomorrow?',
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
  {
    avatar: 'https://via.placeholder.com/50',
    name: 'Guy 3',
    lastMessage: 'Did you finish that report yet?',
    time: '21:21'
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: 'Guy 3',
    lastMessage: 'Did you finish that report yet?',
    time: '21:21'
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: 'Guy 3',
    lastMessage: 'Did you finish that report yet?',
    time: '21:21'
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: 'Guy 3',
    lastMessage: 'Did you finish that report yet?',
    time: '21:21'
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: 'Guy 3',
    lastMessage: 'Did you finish that report yet?',
    time: '21:21'
  }
];

export default function ContactSelector({ contacts, selectedContact, onContactSelect }) {
  const [selectedTab, setSelectedTab] = useState(TABS.All);
  console.log('ContactSelector', contacts);
  const changeContact = (contact) => {
    onContactSelect(contact);
  };

  const contactsList = (
    <ul>
      {contacts?.map((contact) => {
        let isSelected = false;
        if (selectedContact?.isNewContact) {
          isSelected = selectedContact?.user._id === contact?.user._id;
        } else {
          isSelected = selectedContact?.conversationId === contact.conversationId;
        }

        let contactId, title, message, date, contactImg;

        if (contact?.isNewContact) {
          contactId = contact.user._id;
          title = contact.user.firstName + ' ' + contact.user.lastName;
          message = '';
          contactImg = contact.user.imgUrl;
        } else {
          contactId = contact.conversationId;
          title =
            contact.otherParticipants[0].firstName + ' ' + contact.otherParticipants[0].lastName;
          message = contact.lastMessage.message?.text;
          date = getRelativeTime(contact.lastMessage.createdAt);
          contactImg = contact.otherParticipants[0]?.imgUrl;
        }

        return (
          <Contact
            key={contactId}
            {...{ contactId, contactImg, message, title, date, isSelected }}
            onContactSelect={changeContact}
          />
        );
      })}
    </ul>
  );

  return (
    <$Wrapper>
      {/* <$Tabs>
            {Object.keys(TABS).map((currTab) =>
                <$TabItem key={currTab} $isActive={selectedTab === currTab} onClick={() => setSelectedTab(currTab)}>{currTab}</$TabItem>
            )}
        </$Tabs> */}
      <div className="list">{contactsList}</div>
    </$Wrapper>
  );
}

const $Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    border-right: 1px solid #ddd;

    p {
      margin: 0;
      padding: 0;
    }
  }
`;

const $Tabs = styled.div`
  border-bottom: 0.1em solid #eee;
  height: fit-content;
`;

const $TabItem = styled.button`
  font-weight: 500;
  padding: 0.8em;
  border-bottom: 0.2em solid transparent;

  ${({ $isActive }) =>
    $isActive &&
    `
        border-bottom: .2em solid var(--third-color);
        color: var(--third-color);
    `}
  &:hover {
    color: var(--third-color);
  }
`;
