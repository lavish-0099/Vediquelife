import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    const user = await currentUser();
    if (!productId) {
      return NextResponse.json(`Product ID is required`, { status: 400 });
    }

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const reviews = await db.reviews.findMany({
      where: {
        productId: productId as string,
        AND: [
          {
            OR: [{ isPublished: true }, { userId: user.id }],
          },
        ],
      },
      include: {
        user: true,
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("[GET_REVIEWS]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
