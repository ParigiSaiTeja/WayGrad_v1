import { PrismaClient } from '@prisma/client';
import { SafeUser } from '../types';

const prisma = new PrismaClient();

export interface ISubleasesParams {
  userId?: SafeUser; // Make sure the type aligns with your database schema (could be string if using UUIDs)
  gender?: string;
  roomType?: string;
  leaseType?: string;
  imageSrc?: string[];
  price?: number;
  utilities?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startingFrom?: string; // Add startingFrom field
  tillDate?: string; // Add tillDate field
}

export async function getSublets(params: ISubleasesParams) {
  try {
    const {
      userId,
      gender,
      roomType,
      leaseType,
      price,
      utilities,
      guestCount,
      roomCount,
      bathroomCount,
      startingFrom,
      tillDate,
    } = params;

    let query: any = {};

    // Adding conditions based on provided parameters
    if (userId) query.userId = userId;
    if (gender) query.gender = gender;
    if (roomType) query.roomType = roomType;
    if (leaseType) query.leaseType = leaseType;
    if (price) query.price = price;
    if (utilities) query.utilities = utilities;
    if (guestCount) query.guestCount = { gte: guestCount };
    if (roomCount) query.roomCount = { gte: roomCount };
    if (bathroomCount) query.bathroomCount = { gte: bathroomCount };
    if (startingFrom && tillDate) {
      query.startingFrom = { lte: new Date(tillDate) };
      query.tillDate = { gte: new Date(startingFrom) };
    }

    const subleases = await prisma.subleaseListing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      },
    });

    // Convert Date objects to ISO strings
    const safeSubleases = subleases.map(sublease => ({
      ...sublease,
      createdAt: sublease.createdAt.toISOString(),
      startingFrom: sublease.startingFrom.toString(), // Ensure startingFrom is handled as an ISO string
      tillDate: sublease.tillDate.toString(), // Ensure tillDate is handled as an ISO string
    }));

    return safeSubleases;
  } catch (error: any) {
    console.error("Error fetching subleases:", {
      message: error.message,
      stack: error.stack,
      params: JSON.stringify(params)
    });
    throw new Error("Failed to fetch subleases.");
  }
}
