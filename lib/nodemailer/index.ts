import nodemailer from 'nodemailer'
import WelcomeEmailData from '../../types/global'
import { WELCOME_EMAIL_TEMPLATE } from './templates'
export const transporter = nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        }
    }
)


export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
      .replace('{{name}}', name)
      .replace('{{intro}}', intro);
  
    const mailOptions = {
      from: `"Nocturn" <${process.env.NODEMAILER_EMAIL}>`, // use your real Gmail address here
      to: email,
      subject: `Welcome to Nocturn - your stock market toolkit is ready!`,
      text: 'Thanks for joining Nocturn',
      html: htmlTemplate,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email delivered:", info.response);
      return { success: true, response: info.response };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false, error: error };
    }
  };
  