import prisma from "@/app/libs/prismadb";

interface IParams {
  subleaseListingId?: string;
}

export default async function getListingById(
  params: IParams
) {
  try {
    const { subleaseListingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: subleaseListingId,
      },
      include: {
        user: true
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified === true,
      },
      visible: listing.visible ?? false, // Ensure `visible` is always a boolean
      isBid: listing.isBid ?? false,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
