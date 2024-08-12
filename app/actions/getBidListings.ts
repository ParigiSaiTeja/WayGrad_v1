import prisma from "@/app/libs/prismadb";
import { SafeListing } from "@/app/types";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  includeInvisible?: boolean;
}

export default async function getBidListings(
  params: IListingsParams
): Promise<SafeListing[]> {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
      includeInvisible,
    } = params;

    let query: any = {
      visible: true,
      isBid: true,
    };

    if (!includeInvisible) {
      query.visible = true;
    }
    
    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Map listings to include necessary data
    const safeListings: SafeListing[] = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified,
        phonenumber: listing.user.phonenumber ?? '',
        name: listing.user.name ?? 'Unknown',
      },
      amazonLink: listing.amazonLink ?? null,
      visible: listing.visible ?? false,
      isBid: listing.isBid ?? false,
      data: undefined, // Set to `undefined` if `data` is not needed
    }));

    return safeListings;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings.");
  }
}
