import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const fixedOtp = '804351'; // Fixed OTP

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, phonenumber, university, password, otp } = body;

  console.log('Received OTP:', otp); // Log the OTP received in the request

  // If OTP is provided, verify it and create user if valid
  if (otp) {
    if (otp !== fixedOtp) {
      console.log('Invalid OTP entered');
      return NextResponse.json({ error: 'Invalid OTP.' }, { status: 400 });
    }

    // Create user if OTP is valid
    try {
      await prisma.user.create({
        data: {
          email,
          name,
          phonenumber,
          university,
          hashedPassword: await bcrypt.hash(password, 12)
        }
      });

      console.log('User registration successful');
      return NextResponse.json({ message: 'Registration successful.' });
    } catch (error) {
      console.error('Error processing registration:', error);
      return NextResponse.json({ error: 'Wrong OTP entered.' }, { status: 500 });
    }
  }

  // If OTP is not provided, send OTP
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <html>
          <body>
           
            <p>Dear User,</p>
            <p>Your OTP code is <strong>${fixedOtp}</strong>.</p>
            <p>Please use this code to complete your registration process.</p>
            <p>Thank you,</p>
            <img src="https://i.postimg.cc/K1JHwm1D/logo1.png" alt="Your Company Logo" style="width: 200px;"/>
            
          </body>
        </html>
      `
    });

  

    console.log('OTP sent to:', email);
    return NextResponse.json({ otp: fixedOtp }); // Send OTP back to the client
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ error: 'An error occurred while sending OTP.' }, { status: 500 });
  }
}
