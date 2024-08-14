import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const fixedOtp = '945610'; // Fixed OTP for demonstration

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    // Check if the email exists in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    // Setup Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    
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

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
