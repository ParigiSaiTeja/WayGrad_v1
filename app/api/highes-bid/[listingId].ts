import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { listingId } = req.query;

  if (req.method === 'GET') {
    if (!listingId || typeof listingId !== 'string') {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    try {
      // Fetch the highest bid for the given listing ID
      const highestBid = await prisma.bid.findFirst({
        where: { listingId: listingId },
        orderBy: { bidAmount: 'desc' },
        select: { bidAmount: true },
      });

      return res.status(200).json({ highestBid: highestBid?.bidAmount || 0 });
    } catch (error) {
      console.error('Error fetching highest bid:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
