import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Fetch the current user
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    // Fetch the user information, including university and city
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        university: true,
        city: true, // Include both fields in a single select
      },
    });
  
    if (!user || !user.university) {
      return NextResponse.json({ error: "User information is incomplete" }, { status: 400 });
    }
  
    const body = await request.json();
    const { 
      description,
      imageSrc,
      category,
      price,
      locationValue,
      title,
      isBid,
      amazonLink,
    } = body;
  const name=currentUser.name;
  const phonenumber= currentUser.phonenumber;
    // Check for required fields
    const requiredFields = [description, imageSrc, category, price, title];
    if (requiredFields.some(field => !field)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
  
    // Create a new listing
    const listing = await prisma.listing.create({
      data: {
        description,
        title,
        university: user.university, // Use the university fetched from the user
        imageSrc: Array.isArray(imageSrc) ? imageSrc : [imageSrc],
        category,
        roomCount: 1,
        bathroomCount: 1,
        guestCount: 1,
        locationValue, // Use the city fetched from the user
        price: parseInt(price, 10),
        userId: currentUser.id,
        isBid,
        amazonLink,
        name,
        phonenumber,
      },
    });
  
    return NextResponse.json(listing);
  } catch (error) {
    console.error("POST handler error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
