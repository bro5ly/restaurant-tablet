import { prisma } from "@/lib/prisma";
import { Categories } from "@/types/menu";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: Categories }> }
) {
  const { category } = await params;

  try {
    let whereCondition: any = {};
    
    if (category === "RECOMMENDED") {
      // おすすめカテゴリーの場合は、isRecommendedがtrueのメニューを取得
      whereCondition = {
        isRecommended: true,
      };
    } else {
      // 通常のカテゴリーの場合
      whereCondition = {
        category: {
          name: category,
        },
      };
    }

    const categoryMenu = await prisma.menu.findMany({
      where: whereCondition,
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
