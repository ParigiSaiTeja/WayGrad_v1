import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the university information from the current user
  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { university: true } // Select only the university field
  });

  if (!user || !user.university) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    gender,
    location,
    roomType,
    leaseType,
    imageSrc,
    price,
    utilities,
    guestCount,
    roomCount,
    bathroomCount,
    startingFrom, // Add startingFrom field
    tillDate // Add tillDate field
  } = body;

  // Check for required fields
  const requiredFields = [
    gender,
    location,
    roomType,
    leaseType,
    imageSrc,
    price,
    utilities,
    guestCount,
    roomCount,
    bathroomCount,
    startingFrom, // Include startingFrom in the required fields check
    tillDate // Include tillDate in the required fields check
  ];
  
  if (requiredFields.some(field => field === undefined || field === null)) {
    return NextResponse.error();
  }

  if (!Array.isArray(imageSrc) || !imageSrc.every(src => typeof src === 'string' && src.startsWith('http'))) {
    return NextResponse.json({ error: "Invalid image source(s)" }, { status: 400 });
  }
  const university="NYU";

  // Create a new sublet listing
  const newSublet = await prisma.subleaseListing.create({
    data: {
      gender,
      location, // Serialize the location as a JSON string
      roomType,
      leaseType,
      imageSrc,
      price: parseFloat(price), // Convert the price to a float
      utilities,
      guestCount,
      roomCount,
      bathroomCount,
      university,
      startingFrom: startingFrom, // Convert startingFrom to a Date object
      tillDate: tillDate, // Convert tillDate to a Date object
      userId: currentUser.id, // Use the userId fetched from the current user
    }
  });

  return NextResponse.json(newSublet);
}
