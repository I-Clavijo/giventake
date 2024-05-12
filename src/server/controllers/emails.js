import { Resend } from "resend";
import crypto from "crypto";
import VerificationCode from '../db/model/VerificationCode.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SaveVerificationCode(email, code) {

    try {
        // Check if a verification code already exists for the email
        let existingVerificationCode = await VerificationCode.findOne({ email });

        if (existingVerificationCode) {
            // Update the existing code
            existingVerificationCode.code = code;
            await existingVerificationCode.save();

            //res.status(200).json({ message: "Verification code updated successfully" });
        } else {
            // Create a new verification code
            let VerificationCodeDB = await VerificationCode.create({ email, code });

            //res.status(201).json({ message: "Verification code created successfully" });
        }
    } catch (error) {
        console.error("Error saving verification code:", error);
        //res.status(500).json({ error: "Internal server error" });
    }

}


export const sendWelcomeEmail = async (req, res) => {

    const { emailHTML, email, userName } = req.body;

    await resend.emails.send({
        from: "noreply@giventake.org",
        to: email,
        subject: "Welcome " + userName + " to given'take",
        html: emailHTML,
    }); 

    console.log("Email sent!");

}

export const sendVerificationEmail = async (req, res) => {

    const { emailHTML, email, userName } = req.body;

    const code = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code

    
    try {
      await resend.emails.send({
        from: 'noreply@giventake.org', 
        to: email,
        subject: 'Email Verification',
        html: `
          <p>Please enter this verification code to verify your email:</p>
          <h1>${code}</h1>
        `,
      });

       SaveVerificationCode( email, code);

      res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  
}

export const verifyCode = async (req, res) => {

    const { email, code } = req.body;

    const verificationCode = await VerificationCode.findOne({ email });

        if (verificationCode.code === code) {
            console.log("correct code");
        }
        else {
            console.log("wrong code");
        }
/*
    if (storedCode && storedCode === code) {
        // Update the user's verification status
        // ...
        res.status(200).json({ message: 'Email verified' });
    } else {
        res.status(400).json({ error: 'Invalid verification code' });
    }
    */
}