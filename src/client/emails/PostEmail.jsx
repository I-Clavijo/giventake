import React from 'react';
import axios from '../api/axios';

export default async function PostEmail( {emailHTML, userName, userEmail}) {

  try {
    const emailData = {
        emailHTML,
        userEmail,
        userName
    };
    
    const response = await axios.post('/emails/welcome', emailData);
    console.log(response.data);
} catch (error) {
    console.error('Error posting email:', error);
}
};
