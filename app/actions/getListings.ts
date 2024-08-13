import prisma from "@/app/libs/prismadb";
import { SafeListing, SafeUser } from "@/app/types"; // Adjust import path as necessary

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
  amazonLink?: string;
  university?:string;
}

export default async function getListings(
  params: IListingsParams
) {
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
      university,
      amazonLink,
      includeInvisible,
    } = params;

    let query: any = {
      // Ensure only visible listings are fetched
      isBid: false, // Only fetch listings where isBid is false
    };

    if (!includeInvisible) {
      query.visible = true; // Only fetch visible listings by default
    }

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    if (university) {
      query.university = university;
    }
    if (amazonLink) {
      query.amazonLink = amazonLink;
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
        user: true, // Include user data
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
      } as SafeUser,
      imageSrc: listing.imageSrc ?? [], // Ensure imageSrc is always an array
      amazonLink: listing.amazonLink ?? null, // Ensure amazonLink is either string or null
      visible: listing.visible ?? true, // Ensure visible is boolean
      isBid: listing.isBid ?? false, // Ensure isBid is boolean
    }));

    return safeListings;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings.");
  }
}
