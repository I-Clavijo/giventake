//import Welcome from "../emails/Welcome.jsx";
import { Resend } from "resend";

const resend = new Resend('re_85raAmLA_8YuF9Fa3BVjfwYGiNmCuZkZB');

export default async function sendWelcomeEmail() {

    const htmlContent = `<p>test</p>`;
    
    console.log("sending email");

    await resend.emails.send({
        from: "noreply@giventake.org",
        to: "giventake@zohomail.com",
        subject: "Welcome!",
        //react: <html><p> test</p></html>,
        html: htmlContent,
    });

    console.log("email sent!");
}