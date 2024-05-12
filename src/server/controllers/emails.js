import { Resend } from "resend";
import crypto from "crypto";
import { ObjectVersionStorageClass } from "@aws-sdk/client-s3";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (req, res) => {

    const { emailHTML, userEmail, userName } = req.body;

    await resend.emails.send({
        from: "noreply@giventake.org",
        to: userEmail,
        subject: "Welcome " + userName + " to given'take",
        html: emailHTML,
    }); 

    console.log("Email sent!");

}

export const sendVerificationEmail = async (req, res) => {

    const { emailHTML, userEmail, userName } = req.body;

    const secretCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
  
    console.log("secret code: " + secretCode);
    /*
    try {
      await resendClient.emails.send({
        from: 'noreply@giventake.org', 
        to: userEmail,
        subject: 'Email Verification',
        html: `
          <p>Please enter this verification code to verify your email:</p>
          <h1>${secretCode}</h1>
        `,
      });
      // Store the code and email (e.g., in a database) for later verification
      // ...
      res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }

    */
  
}

export const verifyCode = async (req, res) => {

    const { userEmail, code } = req.body;

    /*
    // Retrieve stored code for the given email (e.g., from the database)
    // ...
    const storedCode = ... 
    if (storedCode && storedCode === code) {
        // Update the user's verification status
        // ...
        res.status(200).json({ message: 'Email verified' });
    } else {
        res.status(400).json({ error: 'Invalid verification code' });
    }
    */
}