import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { bidAmount, listingId, username, email, phone, university, userId } = body;

  if (!bidAmount || !listingId || !username || !email || !phone || !university || !userId) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const bid = await prisma.bid.create({
      data: {
        bidAmount,
        username,
        email,
        phone,
        university,
        listingId,
        userId,
      },
    });

    // Fetch the listing and seller details
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
      },
    });

    // Check if listing or listing.user is null
    if (!listing || !listing.user) {
      return NextResponse.json({ error: 'Listing or seller not found' }, { status: 404 });
    }

    const sellerEmail = listing.user.email;

    // Ensure sellerEmail is not null
    if (!sellerEmail) {
      return NextResponse.json({ error: 'Seller email is not available' }, { status: 404 });
    }

    // Ensure process.env.GMAIL_USER is defined
    const gmailUser = process.env.GMAIL_USER;
    if (!gmailUser) {
      return NextResponse.json({ error: 'Gmail user environment variable is not set' }, { status: 500 });
    }

    // Log the email details for debugging
    console.log(`Sending email to ${sellerEmail}`);

    // Send email to the seller
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: gmailUser,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: gmailUser,
      to: sellerEmail,  // Ensure this is always a string
      subject: 'New Bid Placed on Your Listing',
      text: `A new bid of $${bidAmount} has been placed on your listing by ${username}.`,
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log('Email sent:', emailResult);

    return NextResponse.json({ message: 'Bid placed successfully', bidId: bid.id }, { status: 200 });
  } catch (error) {
    console.error('Failed to place bid or send email:', error);
    return NextResponse.json({ error: 'Failed to place bid' }, { status: 500 });
  }
}
