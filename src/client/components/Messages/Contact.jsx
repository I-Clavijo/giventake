import styled from 'styled-components';
import ProfileImg from '../../assets/images/profile-img.jpeg';
import { string } from 'prop-types';

const chatHistory = [
  {
    sender: 'Alice',
    message: 'Hi Bob! How are you doing today?',
    time: new Date('2024-04-20T12:00:00')
  },
  {
    sender: 'Bob',
    message: "Hey Alice! I'm good, thanks. How about you?",
    time: new Date('2024-04-21T12:15:00')
  },
  {
    sender: 'Alice',
    message: "I'm doing well too, thanks! Did you have a good weekend?",
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
    message: "Nice! Any good books you'd recommend?",
    time: new Date('2024-04-30T13:30:00')
  },
  {
    sender: 'Alice',
    message: 'Definitely! I just finished "The Night Circus" by Erin Morgenstern. It\'s magical!',
    time: new Date('2024-05-01T14:00:00')
  }
];

export default function Contact({
  contactIdObj,
  isSelected,
  onContactSelect,
  contactImg,
  title,
  message = '',
  date
}) {
  return (
    <$ListItem
      className={`${isSelected ? 'selected' : ''}`}
      onClick={() => onContactSelect(contactIdObj)}
    >
      <div className="profile-img">
        <img className="rounded-full" src={contactImg || ProfileImg} alt="Profile Pic" />
      </div>
      <div className="details">
        <div className="top">
          <p className="title">{title}</p>
          <p className="date">{date}</p>
        </div>
        <p className="msg-preview">{message}</p>
      </div>
    </$ListItem>
  );
}

const $ListItem = styled.li`
  position: relative;
  height: 5em;
  display: flex;
  gap: 1em;
  overflow: hidden;
  padding: 0.4em;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &.selected {
    border-left: #637084 0.3em solid;
    background-color: #f6f6f6;
  }
  .profile-img {
    padding: 0.3em;
    width: fit-content;
    img {
      height: 100%;
      width: auto;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 5em);

    .top {
      display: flex;
      justify-content: space-between;

      .title {
        font-weight: 600;
      }
      .date {
        color: var(--secondary-font-color);
        font-size: 0.8em;
      }
    }

    .msg-preview {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.9em;
      white-space: nowrap;
      font-size: 0.85em;
      font-weight: 300;

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
`;
