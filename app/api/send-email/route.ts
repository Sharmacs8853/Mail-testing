import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, age, gender, email } = await request.json();

    if (!name || !age || !gender || !email) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Configure transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Form Submission Details',
      html: `
        <h1>Thank you for your submission, ${name}!</h1>
        <p>Here is a copy of your details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Age:</strong> ${age}</li>
          <li><strong>Gender:</strong> ${gender}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <p>We have received your information successfully.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
