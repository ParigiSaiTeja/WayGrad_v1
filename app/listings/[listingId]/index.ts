// src/pages/api/listings/index.ts

import prisma from '@/app/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, university } = req.query;

  const filters: any = {};
  if (category) {
    filters.category = category;
  }
  if (university) {
    filters.university = university;
  }

  try {
    const listings = await prisma.listing.findMany({
      where: filters,
      include: {
        university: true, // Ensure university is included
      },
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
}
