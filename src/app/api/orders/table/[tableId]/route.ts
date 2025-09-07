import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tableId: string }> }
) {
  const { tableId } = await params;

  try {
    console.log(`API: テーブル${tableId}の注文進捗を取得中...`);
    
    // Get orders for specific table that are not served yet
    const orders = await prisma.order.findMany({
      where: {
        tableId: parseInt(tableId),
        status: {
          name: {
            in: ["CONFIRM", "COOKING", "READY"]
          }
        }
      },
      include: {
        table: true,
        status: true,
        orderItems: {
          include: {
            menu: {
              include: {
                category: true
              }
            },
            category: true,
            status: true
          },
          orderBy: {
            categoryId: "asc"
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    console.log(`API: テーブル${tableId}の注文進捗を${orders.length}件取得しました`);

    return NextResponse.json(orders);
  } catch (err) {
    console.log("table orders api error: ", err);
    return NextResponse.json(
      { error: "failed to fetch table orders" },
      { status: 500 }
    );
  }
}