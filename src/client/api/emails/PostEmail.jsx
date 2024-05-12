import React from 'react';
import axios from '../axios';

export default async function PostWelcomeEmail( {emailHTML, userName, userEmail}) {

  try {
    const emailData = {
        emailHTML,
        userEmail,
        userName
    };
    
    const response = await axios.post('/emails/send-welcome-email', emailData);
    console.log(response.data);
    } catch (error) {
        console.error('Error posting email:', error);
    }
};
