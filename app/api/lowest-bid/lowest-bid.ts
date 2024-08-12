import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { listingId } = req.query;

  if (!listingId || typeof listingId !== 'string') {
    return res.status(400).json({ error: 'Invalid listing ID' });
  }

  try {
    const lowestBid = await prisma.bid.findFirst({
      where: { listingId },
      orderBy: { bidAmount: 'asc' },
    });
    res.status(200).json({ bidAmount: lowestBid?.bidAmount || 0 });
  } catch (error) {
    console.error('Error fetching lowest bid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}