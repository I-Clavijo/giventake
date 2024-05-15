import React from 'react';
import axios from '../axios';

export default async function PostVerificationEmail( email) {

  try {
    const emailData = {
        email : email,
    };
    
    const response = await axios.post('/emails/send-verification-email', emailData);
    console.log(response.data);
    } catch (error) {
        console.error('Error posting email:', error);
    }

    console.log("Verification email sent to:", email);
};
