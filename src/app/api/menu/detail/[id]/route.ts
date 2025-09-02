import { prisma } from "@/lib/prisma";
import { Categories, MenuItem } from "@/types/menu";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const menuId = parseInt(id);

  try {
    const menuDetail = await prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    return NextResponse.json(menuDetail);
  } catch (error) {
    console.log("menu-detail api error:", error);
    return NextResponse.json(
      { error: "failed to fetch menu-detail" },
      { status: 500 }
    );
  }
}
