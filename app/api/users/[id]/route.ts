import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; // Use NextResponse for handling responses

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (typeof id !== 'string') {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        // Add more fields as necessary
      },
    });

    if (user) {
      const safeUser = {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        // Ensure all necessary fields are included and transformed
      };

      return NextResponse.json(safeUser);
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma Client is properly disconnected
  }
}
