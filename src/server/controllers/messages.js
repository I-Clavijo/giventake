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
    console.log("conversationParticipants", conversationParticipants)
    const conversation = {
        users: conversationParticipants,
        otherUsers: conversationParticipants?.filter((user) => !user?.isSelf),
        messages: userConversationMessages
    }
    console.log(conversation)
    res.status(200).json(conversation)
};


export const addMessage = async (req, res) => {
    const { from, to, message } = req.body;
    const data = await Message.create({
        message: { text: message },
        users: [from, to],
        sender: from,
    });

    if (data) return res.sendStatus(201);
    else throw new AppError('Failed to add message to the database', 500);
};

// const conversation = {
//     _id: '',
//     users: [{
//         _id: '',
//         firstName: '',
//         lastName: '',
//         imgUrl: ''
//     }],
//     messages: [
//         {
//             sender: '',
//             fromSelf: boolean,
//             message: {
//                 text: ''
//             },
//             createdAt: '',
//         }
//     ]
//     },
//     post?: {
//         _id: '',
//         imgUrl: '',
//         title: ''
//     }
// }