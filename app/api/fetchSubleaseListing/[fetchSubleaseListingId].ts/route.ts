import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const subleaseListingId = url.searchParams.get('subleaseListingId');

  if (!subleaseListingId || typeof subleaseListingId !== 'string') {
    return NextResponse.json({ error: 'Invalid subleaseListingId' }, { status: 400 });
  }

  try {
    const listing = await prisma.subleaseListing.findUnique({
      where: { id: subleaseListingId },
      include: { user: true },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
