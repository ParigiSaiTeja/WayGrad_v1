import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function PATCH(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const body = await request.json();
  const { visible } = body;

  const listing = await prisma.listing.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id
    },
    data: {
      visible: visible
    }
  });

  return NextResponse.json(listing);
}
