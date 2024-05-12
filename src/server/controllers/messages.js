import { Message } from '../db/model/index.js';
import AppError from '../utils/AppError.js';


export const getMessages = async (req, res) => {
    // const { userId } = req.query || {};
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.status(200).json(projectedMessages);
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