import { Resend } from 'resend';

const resend = new Resend('re_85raAmLA_8YuF9Fa3BVjfwYGiNmCuZkZB');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'giventake@zohomail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});