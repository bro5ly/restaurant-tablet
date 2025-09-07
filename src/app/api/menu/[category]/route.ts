import { prisma } from "@/lib/prisma";
import { Categories } from "@/types/menu";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: Categories }> }
) {
  const { category } = await params;

  try {
    const categoryMenu = await prisma.menu.findMany({
      where: {
        category: {
          name: category,
        },
      },
      include: {
        category: true,
        allergies: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(categoryMenu);
  } catch (error) {
    console.log("category-menu api error:", error);
    return NextResponse.json(
      { error: "failed to fetch category-menu" },
      { status: 500 }
    );
  }
}
