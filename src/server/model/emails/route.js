//import Welcome from "../emails/Welcome.jsx";
import { Resend } from "resend";

const resend = new Resend('re_85raAmLA_8YuF9Fa3BVjfwYGiNmCuZkZB');

export default async function POST() {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "eilatcasa@gmail.com",
        subject: "Welcome!",
        react: <p> """"</p>,
    });
}