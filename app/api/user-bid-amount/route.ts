// app/api/getUserBid/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listingId');
  const userId = searchParams.get('userId');

  if (!listingId || !userId) {
    return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
  }

  try {
    // Fetch the user's most recent bid for the listing
    const bid = await prisma.bid.findFirst({
      where: {
        listingId: listingId,
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc', // Assumes you have a `createdAt` field to determine the most recent bid
      },
      select: {
        bidAmount: true,
        createdAt: true,
      },
    });

    // Return the bid amount if found
    if (bid) {
      return NextResponse.json({ bidAmount: bid.bidAmount,createdAt:bid.createdAt });
    } else {
      return NextResponse.json({ error: 'Bid not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to fetch user bid amount:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
