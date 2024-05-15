import axios from '../axios';
import renderEmailHTML from '../../utils/renderEmail.jsx';

export default async function PostWelcomeEmail( {userName, email}) {

    console.log('Sending welcome email to:', email, 'for user:', userName);

    try {
        const emailData = {
            emailHTML: renderEmailHTML(userName),
            email,
            userName
        };
    
        
        await axios.post('/emails/send-welcome-email', emailData);
        } catch (error) {
            console.error('Error posting email:', error);
    }
};
