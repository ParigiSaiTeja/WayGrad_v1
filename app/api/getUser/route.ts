// app/api/getUser/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Replace this with actual logic to get the current user ID from session or auth
    const userId = 'user-id'; // Example user ID

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { city: true }
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
