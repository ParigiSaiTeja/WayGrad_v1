// app/api/user/route.ts
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const session = await getServerSession();
  const { name, phonenumber } = await request.json();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!name || !phonenumber) {
    return NextResponse.json({ message: 'Name and phone number are required' }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { name, phonenumber },
    });

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
