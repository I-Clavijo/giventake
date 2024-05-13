import { Button, Label, TextInput } from "flowbite-react";
import PostVerificationEmail from "../../api/emails/PostVerificationEmail";
import { useState } from "react";
import PostVerificationCode from "../../api/emails/PostVerificationCode";
import { useForm } from "react-hook-form";

const EmailVerification = ({ email , setIsVerified}) => {
   const [error, setError] = useState(null);
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
       //event.preventDefault();
        setIsLoading(true);
        setError('');
        

        const emailVerificationData = {
            email: email,
            code: code,
        };

        console.log(emailVerificationData.email);
        
        
        try {
            const response = await PostVerificationCode(emailVerificationData);
            if (response.status == 401) {
                setError("Code is not valid");
                console.log("test"); 
            } else {
                // Code is valid, handle success (e.g., redirect, update state)
            }
        } catch (error) {
            if (error)
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
        setIsVerified(true);
    }

    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="code" value="Check your inbox and enter the code you received:" />
                </div>
                <TextInput
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                {error && <Label color="failure">{error}</Label>} 
            </div>
            <Button onClick={handleSubmit}>
                {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
        </>
    );
};

export default EmailVerification;