import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const otpStore: Record<string, { otp: string; expires: number }> = {};

export async function POST(request: Request) {
  const body = await request.json();
  const { email, otp, name, phonenumber, university, password } = body;

  const storedOtp = otpStore[email];

  if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expires) {
    delete otpStore[email];
    return NextResponse.json({ message: 'Invalid or expired OTP.' }, { status: 400 });
  }

  delete otpStore[email];

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phonenumber,
        university,
        hashedPassword,
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'An error occurred while creating the user.' }, { status: 500 });
  }
}
