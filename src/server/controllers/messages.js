import mongoose from 'mongoose';
import { Conversation, Message } from '../db/model/index.js';
import AppError from '../utils/AppError.js';
import { getContactsQuery } from '../db/queries/messages.js';
import { getImageUrl } from '../utils/S3.js';
const ObjectId = mongoose.Schema.ObjectId;




export const getContacts = async (req, res) => {
    const authUserId = req.user._id;

    const userContacts = await getContactsQuery(authUserId)

    for (const contact of userContacts) {
        const imgName = contact.lastMessage.sender?.imgName;
        const url = imgName ? await getImageUrl(imgName) : '';
        contact.lastMessage.sender.imgUrl = url;

        for (const participant of contact.otherParticipants) {
            const imgName = participant?.imgName;
            const url = imgName ? await getImageUrl(imgName) : '';
            participant.imgUrl = url;
        }
    }
    // const messages = await Message.find({
    //     users: {
    //         $all: [from, to],
    //     },
    // }).sort({ updatedAt: 1 });

    // const projectedMessages = messages.map((msg) => {
    //     return {
    //         fromSelf: msg.sender.toString() === from,
    //         message: msg.message.text,
    //     };
    // });

    // res.status(200).json(projectedMessages);
    res.status(200).json(userContacts)
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