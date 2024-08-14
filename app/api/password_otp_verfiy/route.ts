import { NextRequest, NextResponse } from 'next/server';

const fixedOtp = '945610'; // Fixed OTP for demonstration

export async function POST(request: NextRequest) {
  const { email, otp } = await request.json();

  if (otp === fixedOtp) {
    return NextResponse.json({ message: 'OTP verified', email });
  } else {
    return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
  }
}
