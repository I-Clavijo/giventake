import React from 'react';
import axios from '../axios';
import { useUser} from '../users/useUser.jsx';

export default async function PostVerificationCode( emailVerificationData ) {
    
    
    const { email, code } = emailVerificationData;

    try {
        const emailData = {
            email,
            code
        };
    
        const response = await axios.post('/emails/verify-code', emailData);
        console.log(response.data);
     } catch (error) {
        console.error('Error posting email:', error);
    }
    
};