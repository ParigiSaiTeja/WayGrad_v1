import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { listingId } = req.query;

  if (typeof listingId !== 'string') {
    return res.status(400).json({ error: 'Invalid listingId' });
  }

  try {
    const highestBid = await prisma.bid.findFirst({
      where: { listingId },
      orderBy: { bidAmount: 'desc' },
    });

    const lowestBid = await prisma.bid.findFirst({
      where: { listingId },
      orderBy: { bidAmount: 'asc' },
    });

    res.status(200).json({
      highestBid: highestBid?.bidAmount || 0,
      lowestBid: lowestBid?.bidAmount || 0,
    });
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
