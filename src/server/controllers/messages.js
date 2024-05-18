import mongoose from 'mongoose';
import { Conversation, Message } from '../db/model/index.js';
import AppError from '../utils/AppError.js';
import { getContactsQuery, getConversationMessagesQuery, getConversationParticipantsQuery } from '../db/queries/messages.js';
import { getImageUrl } from '../utils/S3.js';
const ObjectId = mongoose.Schema.ObjectId;




export const getContacts = async (req, res) => {
    const selfUserId = req.user._id;

    const userContacts = await getContactsQuery(selfUserId)

    for (const contact of userContacts) {
        const imgName = contact.lastMessage.sender?.imgName;
        const url = imgName ? await getImageUrl(imgName) : '';
        contact.lastMessage.sender.imgUrl = url;

        for (const participant of contact.otherUsers) {
            const imgName = participant?.imgName;
            const url = imgName ? await getImageUrl(imgName) : '';
            participant.imgUrl = url;
        }
    }

    res.status(200).json(userContacts)
};


export const getConversationMessages = async (req, res) => {
    const { conversationId } = req.query;
    const selfUserId = req.user._id;

    const userConversationMessages = await getConversationMessagesQuery(selfUserId, conversationId)

    const conversationParticipants = await getConversationParticipantsQuery(selfUserId, conversationId)
    for (const participant of conversationParticipants) {
        const imgName = participant?.imgName;
        const url = imgName ? await getImageUrl(imgName) : '';
        participant.imgUrl = url;
    }

    const conversation = {
        conversationId,
        users: conversationParticipants,
        otherUsers: conversationParticipants?.filter((user) => !user?.isSelf),
        messages: userConversationMessages
    }

    res.status(200).json(conversation)
};


export const addMessage = async (req, res) => {
    let { contact: { conversationId, userId, postId }, message } = req.body;
    const selfUserId = req.user._id;

    // if it's a new conversation then create new one
    let newConversation;
    if (!conversationId && userId) {
        newConversation = await Conversation.create({
            users: [selfUserId, userId],
            ...(postId && { post: postId })
        });
        conversationId = newConversation._id
        console.log('Conversation Created')
    }

    const newMessage = await Message.create({
        conversation: conversationId,
        sender: selfUserId,
        body: { text: message },
    });

    //if it's a new conversation then return it's details
    if (newConversation) {
        const conversation = {
            conversationId,
            users: newConversation.users,
            otherUsers: newConversation.users?.filter((userId) => {

                console.log(selfUserId, userId.toString())
                return userId.toString() !== selfUserId
            }),
            messages: [newMessage]
        }
        return res.status(200).json({ conversation })
    }
    if (newMessage) return res.sendStatus(201);
    else throw new AppError('Failed to add message to the database', 500);
};