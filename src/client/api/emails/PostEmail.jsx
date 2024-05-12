import React from 'react';
import axios from '../axios';

export default async function PostWelcomeEmail( {emailHTML, userName, email}) {

  try {
    const emailData = {
        emailHTML,
        email,
        userName
    };
    
    const response = await axios.post('/emails/send-welcome-email', emailData);
    console.log(response.data);
    } catch (error) {
        console.error('Error posting email:', error);
    }
};
