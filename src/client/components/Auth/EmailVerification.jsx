import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import PostVerificationEmail from "../../api/emails/PostVerificationEmail";
import { useState } from "react";
import PostVerificationCode from "../../api/emails/PostVerificationCode";

const EmailVerification = ({email}) => {

    const [code, setCode] = useState('');

    function handleSubmit(){
        event.preventDefault(); // Prevent default form submission behavior
        
        const emailVerificationData = {
            email: email,
            code: code,
        }
        PostVerificationCode(emailVerificationData);
    }

    return (
        <> 
        <form className="flex max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="code" value="Enter the code you received:" />
                </div>
                <TextInput 
                    id="code" // Use the correct id
                    type="text" // Change to text for verification codes
                    value={code} // Bind the value to the state
                    onChange={(e) => setCode(e.target.value)} // Update the state on change
                    required
                />
            </div>
            <Button type="submit">Submit</Button>
        </form>
        </>  
    );
}

export default EmailVerification;