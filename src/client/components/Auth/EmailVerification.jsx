import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import PostVerificationEmail from "../../api/emails/PostVerificationEmail";
import { useState } from "react";

const EmailVerification = () => {
/*
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
  
    const handleSendVerification = async () => {
      const response = await fetch('/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // ... handle response
    };
  
    const handleVerifyCode = async () => {
      const response = await fetch('/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      // ... handle response
    };

    const emailData = {
        emailHTML : <html><h1>test</h1></html>,
        userEmail : user.email,
        userName : user.firstName,
    };

    PostVerificationEmail(emailData);
  */
    return (
        <> 
        <form className="flex max-w-sm flex-col gap-4">
        <div>
            <div className="mb-2 block">
            <Label htmlFor="code" value="Enter the code you received:" />
            </div>
            <TextInput id="email1" type="email" placeholder="" required />
        </div>
        

        <Button type="submit">Submit</Button>
        </form>
        </>  
    );
}

export default EmailVerification;