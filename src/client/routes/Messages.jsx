import { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.scss';
import ChatBox from '../components/Messages/ChatBox';
import { useUser } from '../api/users/useUser';
import { BASE_URL } from '../api/axios';
import { io } from 'socket.io-client';
import ContactSelector from '../components/Messages/ContactSelector';
import { useContacts } from '../api/messages/useContacts';
import { useLocation } from 'react-router-dom';
import { useConversation } from '../api/messages/useConversation';
import NoConversationsImg from '../assets/images/empty-states/no-contacts.svg';
import { useSendMessage } from '../api/messages/useSendMessage';

export default function Messages() {
  const { state } = useLocation();
  const { selectedContactDirect } = state || {};

  const { data: user } = useUser();
  const socket = useRef();
  const [showChatBox, setShowChatBox] = useState(false);
  const [newContact, setNewContact] = useState();

  const { data: contacts } = useContacts();

  const [currentContact, setCurrentContact] = useState();
  const { data: conversation } = useConversation({
    conversationId: currentContact?.conversationId,
    enabled: !!currentContact?.conversationId
  });

  const { mutate: sendMessageMutation } = useSendMessage({ userId: user._id });

  //set the first contact to be selected
  useEffect(() => {
    if (contacts) {
      setCurrentContact({
        conversationId: contacts?.[0].conversationId
      });
    }
  }, [contacts]);

  // Handler: if got navigated to the messages page with a message action or interest action
  useEffect(() => {
    if (selectedContactDirect && contacts) {
      const foundContact = contacts.find((contact) =>
        contact.otherUsers.find((user) => user._id === selectedContactDirect.user._id)
      );

      if (foundContact) {
        setNewContact(null);
        setCurrentContact({
          conversationId: foundContact.conversationId
        });
      } else {
        setNewContact({ user: selectedContactDirect.user });
        setCurrentContact({
          userId: selectedContactDirect.user._id
        });
      }
    }
  }, [selectedContactDirect, contacts]);

  useEffect(() => {
    if (user) {
      socket.current = io(BASE_URL);
      socket.current.emit('add-user', user._id);
    }
  }, [user]);

  const changeContactHandler = (contactIdObj) => {
    setCurrentContact(contactIdObj);
    setShowChatBox(true);
  };

  const sendMessage = (message) => {
    sendMessageMutation({ contact: currentContact, message });
  };

  const allContacts = [...(newContact ? [newContact] : []), ...(contacts ?? [])];

  const newConversation = newContact
    ? {
        otherUsers: [newContact.user]
      }
    : null;

  return (
    <>
      <div className={styles.chatPage}>
        <div className={styles.contactsWrap}>
          {contacts?.length ? (
            <ContactSelector
              contacts={allContacts}
              selectedContact={currentContact}
              onContactSelect={changeContactHandler}
            />
          ) : (
            <>
              <div className={styles.emptyState}>
                <img src={NoConversationsImg} />
                <h5>No Conversations</h5>
              </div>
            </>
          )}
        </div>
        <div className={`${styles.chatBox} ${showChatBox && styles.show}`}>
          <ChatBox
            {...{ socket, sendMessage }}
            conversation={conversation || newConversation}
            onClose={() => setShowChatBox(false)}
          />
        </div>
      </div>
    </>
  );
}
