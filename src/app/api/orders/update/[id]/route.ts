import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const orderId = parseInt(id);

  try {
    const orderItem = await prisma.orderItem.update({
      where: {
        id: orderId,
      },
      data: {
        statusId: 3,
      },
    });

    return NextResponse.json(orderItem);
  } catch (err) {
    console.log("orderItem api error: ", err);
    return NextResponse.json(
      { error: "failed to fetch orderItem" },
      { status: 500 }
    );
  }
}
