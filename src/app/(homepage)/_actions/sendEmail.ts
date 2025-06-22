'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const formSchema = z.object({
  message: z.string().min(1, 'Message is required')
});

export async function sendEmail(prevState: any, formData: FormData) {
  const message = formData.get('message') as string;

  const result = formSchema.safeParse({ message });
  await new Promise((res, rej) => setTimeout(() => res(null), 3000));

  if (!result.success) {
    return {
      status: 'error',
      message: result.error.errors[0].message
    };
  }

  try {
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.your-provider.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS
    //   }
    // });

    // await transporter.sendMail({
    //   from: '"Contact Form" <no-reply@example.com>',
    //   to: process.env.CONTACT_EMAIL,
    //   subject: 'New Message from Website',
    //   text: message
    // });

    return {
      status: 'success'
    };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: 'Failed to send email.'
    };
  }
}
