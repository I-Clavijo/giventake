import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import PostVerificationEmail from "../../api/emails/PostVerificationEmail";
import { useState } from "react";
import PostVerificationCode from "../../api/emails/PostVerificationCode";

const EmailVerification = ({ email }) => {
    const [error, setError] = useState(null);
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const emailVerificationData = {
            email: email,
            code: code,
        };

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
    }

    return (
        <form className="flex max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="code" value="Enter the code you received:" />
                </div>
                <TextInput
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                {error && <Label color="failure">{error}</Label>} 
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Submit'}
            </Button>
        </form>
    );
};

export default EmailVerification;