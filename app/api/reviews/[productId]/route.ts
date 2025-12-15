import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { productId: string } }

){
    try{
        const reviews = await prisma.review.findMany({
            where: {
                productId: params.productId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(reviews);
    } catch(error) {
        console.error('Failed to fetch reviews:', error);
        return NextResponse.json(
            {error: 'Failed to fetch reviews'},
            {status: 500}
        );
    }
}