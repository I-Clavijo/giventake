import axios from '../axios';

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