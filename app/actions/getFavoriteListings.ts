import prisma from "@/app/libs/prismadb";
import { SafeListing, SafeUser } from "@/app/types";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    // Fetch favorite listings with user data included
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      },
      include: {
        user: true, // Include user data
      }
    });

    // Map favorites to include necessary data
    const safeFavorites: SafeListing[] = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
      user: {
        ...favorite.user,
        createdAt: favorite.user.createdAt.toISOString(),
        updatedAt: favorite.user.updatedAt.toISOString(),
      } as SafeUser,
      imageSrc: favorite.imageSrc ?? [], // Ensure imageSrc is always an array
      amazonLink: favorite.amazonLink ?? null, // Ensure amazonLink is either string or null
      visible: favorite.visible ?? true, // Ensure visible is boolean
      isBid: favorite.isBid ?? false, // Ensure isBid is boolean
    }));

    return safeFavorites;
  } catch (error: any) {
    console.error("Error fetching favorite listings:", error);
    throw new Error("Failed to fetch favorite listings.");
  }
}
