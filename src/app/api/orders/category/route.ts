import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // CONFIRM, COOKING, READY

  try {
    console.log(`API: ${status}状態の注文を取得中...`);
    
    // Get orders with specific status and include all necessary relations
    const orders = await prisma.order.findMany({
      where: {
        status: {
          name: status as any || "CONFIRM"
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
        createdAt: "asc"
      }
    });

    console.log(`API: ${status}状態の注文を${orders.length}件取得しました`);
    console.log('取得した注文:', orders.map(o => ({ id: o.id, status: o.status, itemsCount: o.orderItems.length })));

    return NextResponse.json(orders);
  } catch (err) {
    console.log("orders api error: ", err);
    return NextResponse.json(
      { error: "failed to fetch orders" },
      { status: 500 }
    );
  }
}
