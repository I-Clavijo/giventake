import axios from '../axios';
import renderEmailHTML from '../../utils/renderEmail.jsx';

export default async function PostWelcomeEmail( {userName, email}) {

    console.log('PostWelcomeEmail:', userName, email);
    /*
  try {
    const emailData = {
        emailHTML: renderEmailHTML(userName),
        email,
        userName
    };
   
    const response = await axios.post('/emails/send-welcome-email', emailData);
    console.log(response.data);
    } catch (error) {
        console.error('Error posting email:', error);
    }*/
};
