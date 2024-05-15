import { Resend } from "resend";
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
        from: "given'take <noreply@giventake.org>",
        to: email,
        subject: "Welcome " + userName + " to given'take",
        html: emailHTML,
    }); 

    console.log("Welcome email sent!");
}

export const sendVerificationEmail = async (req, res) => {

    const {email} = req.body;

    const code = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code

    console.log("Sending verification email to: ", email);
    
    try {
      await resend.emails.send({
        from: "given'take <noreply@giventake.org>", 
        to: email,
        subject: 'Email Verification',
        html: `
        <html dir="ltr" lang="en">   
          <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          </head>
          <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
          Email Verification
          <div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
          </div>
          <body style="font-family:&quot;Google Sans&quot;,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;background-color:#fff;margin:0;padding:10px">
            <section style="width:100%;background-color:#fff;margin:0 auto;z-index:999"><img alt="given&#x27;take logo" 
            src="https://onedrive.live.com/embed?resid=B8BC9B049BB1AE95%215590&amp;authkey=%21AFj_phHaUAj2iTc&amp;width=846&amp;height=196" 
            style="display:block;outline:none;border:none;text-decoration:none;margin:auto;max-width:100%;width:640px" /></section>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:0 auto;width:648px;text-align:left">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <h1 style="font-size:30px;margin:10px 0 0 0">
                      <h2>Verify your email address </h2>
                    </h1>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:18px;line-height:1.5;margin:16px 0">
                            Thanks for starting the account creation process.
                             We want to make sure it&#x27;s really you. Please enter the following verification code when prompted.
                              If you don&#x27;t want to create an account, you can ignore this message.</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:#f9f9f9;padding:20px;border-radius:5px;margin:20px 0">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:20px;line-height:24px;margin:0;font-weight:bold;text-align:center">Verification code</p>
                            <p style="font-size:36px;line-height:24px;margin:10px 0;font-weight:bold;text-align:center">${code}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:left">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:17px;line-height:24px;margin:16px 0">Best,<br />given&#x27;take team</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <section><img alt="given&#x27;take logo" src="https://onedrive.live.com/embed?resid=B8BC9B049BB1AE95%215591&amp;authkey=%21AHOpi78OvmJEL3g&amp;width=1037&amp;height=691" style="display:block;outline:none;border:none;text-decoration:none;margin:auto;max-width:100%;width:640px" />
                      <p style="font-size:14px;line-height:24px;margin:16px 0"><strong>&quot;Only a life lived for others is a life worthwhile.&quot; Albert Einstein</strong></p>
                    </section>
                  </td>
                </tr>
              </tbody>
            </table>
          </body> 
        </html>`
        
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
        res.status(200).json({ message: 'Email verified' });
    }
    else {
        console.log("User entered the wrong code");
        res.status(401).json({ error: 'Invalid verification code' });
    }
}