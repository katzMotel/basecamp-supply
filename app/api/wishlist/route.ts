import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      orderBy: { addedAt: 'desc' },
    });

    return NextResponse.json(wishlistItems);
  } catch (error) {
    console.error('Failed to fetch wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('🔵 POST /api/wishlist called');
  
  try {
    const session = await getServerSession(authOptions);
    console.log('🔵 Session:', session?.user?.email);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in' },
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    console.log('🔵 Product ID:', productId);

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log('🔵 User found:', user?.id);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('🔵 Checking for existing wishlist item...');
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId,
        },
      },
    });
    console.log('🔵 Existing item:', existing);

    if (existing) {
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 400 }
      );
    }

    console.log('🔵 Creating wishlist item...');
    const wishlistItem = await prisma.wishlistItem.create({  // FIXED: lowercase 'l'
      data: {
        userId: user.id,
        productId: productId,
      },
    });
    console.log('🔵 Created:', wishlistItem);

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    console.error('🔴 Failed to add to wishlist');
    console.error('🔴 Error:', error);
    if (error instanceof Error) {
      console.error('🔴 Error message:', error.message);
      console.error('🔴 Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}