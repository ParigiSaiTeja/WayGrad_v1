import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, phonenumber } = await request.json();

    if (!name || !phonenumber) {
      return NextResponse.json({ message: 'Name and phone number are required' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phonenumber,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}