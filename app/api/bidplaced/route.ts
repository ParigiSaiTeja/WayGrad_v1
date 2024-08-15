import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import querystring from 'querystring';

const domain = 'https://waygrad.com'; 


export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { bidAmount, listingId, username, email, phone, university, userId,name, category,dataId } = body;

  if (!bidAmount || !listingId || !username || !email || !phone || !university || !userId) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // Create the bid
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

    if (!listing || !listing.user) {
      return NextResponse.json({ error: 'Listing or seller not found' }, { status: 404 });
    }

    const sellerEmail = listing.user.email;

    if (!sellerEmail) {
      return NextResponse.json({ error: 'Seller email is missing' }, { status: 500 });
    }

    // Create the WhatsApp link
    const listingUrl = `${domain}/listings/${dataId}`;
    const messageText = `Hello ${name}, Thank your placing a bid of $${bidAmount} on my listing ${category} which was listed at ${listingUrl}.`;
    const encodedMessage = querystring.escape(messageText);
    const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Send email to the seller
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: sellerEmail,
      subject: 'New Bid Placed on Your Listing',
      text: `A new bid of $${bidAmount} has been placed on your listing by ${username}.\n\nContact Information:\nPhone: ${phone}\nUniversity: ${university}\n\nYou can contact the bidder via WhatsApp using the following link: ${whatsappLink}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Bid placed successfully', bidId: bid.id }, { status: 200 });
  } catch (error) {
    console.error('Failed to place bid:', error);
    return NextResponse.json({ error: 'Failed to place bid' }, { status: 500 });
  }
}
