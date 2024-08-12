import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const listingId = url.searchParams.get('listingId');

  if (!listingId) {
    return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
  }

  try {
    const mostRecentBid = await prisma.bid.findFirst({
      where: { listingId },
      orderBy: { createdAt: 'desc' },
      select: {
        bidAmount: true,
        createdAt: true,
      },
    });

    // If no bids are found, return a default response
    const response = mostRecentBid
      ? mostRecentBid
      : { bidAmount: 0, createdAt: null };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch most recent bid:', error);
    return NextResponse.json({ error: 'Failed to fetch most recent bid' }, { status: 500 });
  }
}
