// app/api/getUserBid/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listingId');
  const userId = searchParams.get('userId');

  if (!listingId || !userId) {
    return NextResponse.json({ error: 'Invalid listingId or userId' }, { status: 400 });
  }

  try {
    const mostRecentBid = await prisma.bid.findMany({
      where: {
        userId: userId,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        createdAt: true,
      },
    });

    if (mostRecentBid.length > 0) {
      return NextResponse.json({ createdAt: mostRecentBid[0].createdAt });
    } else {
      return NextResponse.json({ error: 'No bid found for the specified user' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user bid time:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
