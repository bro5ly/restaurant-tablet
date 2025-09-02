import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  try {
    const orders = await prisma.orderItem.findMany({
      where: {
        categoryId: categoryId ? parseInt(categoryId) : 2,
        statusId: { in: [2, 3] },
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.log("orders api error: ", err);
    return NextResponse.json(
      { error: "failed to fetch orders" },
      { status: 500 }
    );
  }
}
