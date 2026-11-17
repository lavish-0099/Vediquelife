import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const { productId, rating, review } = await req.json();
    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const existingReview = await db.reviews.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    });

    if (existingReview) {
      return NextResponse.json("You have already reviewed on this product", {
        status: 400,
      });
    }

    const savedReview = await db.reviews.create({
      data: {
        productId,
        userId: user.id,
        rating,
        comment: review,
      },
    });

    return NextResponse.json(savedReview, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_REVIEWS]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
