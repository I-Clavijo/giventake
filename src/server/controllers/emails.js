import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {

    console.log(resend.apiKeys);
    const { emailHTML, userEmail, userName } = req.body;

    await resend.emails.send({
        from: "noreply@giventake.org",
        to: userEmail,
        subject: "Welcome " + userName + " to given'take",
        html: emailHTML,
    }); 

    console.log("Email sent!");

}