import React from 'react';
import axios from '../axios';

export default async function postVerificationEmail( {emailHTML, userName, userEmail}) {

  try {
    const emailData = {
        emailHTML,
        userEmail,
        userName
    };
    
    const response = await axios.post('/emails/send-verification-email', emailData);
    console.log(response.data);
    } catch (error) {
        console.error('Error posting email:', error);
    }
};
