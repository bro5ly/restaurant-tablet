import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const orderedTableIds = await prisma.table.findMany({
      where: {
        orders: {
          some: {
            status: {
              name: "CONFIRM",
            },
          },
        },
      },
      select: {
        id: true,
      },

      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(orderedTableIds);
  } catch (err) {
    console.log("tableIds api error: ", err);
    return NextResponse.json(
      { error: "failed to fetch tableIds" },
      { status: 500 }
    );
  }
}
