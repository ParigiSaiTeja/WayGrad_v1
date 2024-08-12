// api/bid-status.ts
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();
  const url = new URL(request.url);
  const listingId = url.searchParams.get('listingId');

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!listingId) {
    return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
  }

  try {
    const bid = await prisma.bid.findFirst({
      where: {
        listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json({ hasPlacedBid: !!bid });
  } catch (error) {
    console.error('Failed to fetch bid status:', error);
    return NextResponse.json({ error: 'Failed to fetch bid status' }, { status: 500 });
  }
}
