import { prisma } from "@/lib/prisma";
import { Categories, MenuItem, Order, OrderItem, Status } from "@/types/menu";
import { NextRequest, NextResponse } from "next/server";
import { broadcast } from "../../../../server";

export async function POST(req: NextRequest) {
  const { tableId, orderItems } = await req.json();

  try {
    const menuIds = orderItems.map((item: any) => item.menuId);
    const menus = await prisma.menu.findMany({
      where: {
        id: { in: menuIds },
      },
    });

    const confirmStatus = await prisma.status.findFirst({
      where: {
        name: "CONFIRM",
      },
    });
    const total = orderItems.reduce((sum: number, item: OrderItem) => {
      const menu = menus.find((m) => m.id === item.menuId);
      return sum + (menu?.price || 0) * item.quantity;
    }, 0);
    const createdOrder = await prisma.order.create({
      data: {
        tableId,
        total,
        statusId: confirmStatus?.id || 1,
        orderItems: {
          create: orderItems.map((item: OrderItem) => {
            const menu = menus.find((m) => m.id === item.menuId);
            return {
              categoryId: menu?.categoryId,
              menuId: item.menuId,
              quantity: item.quantity,
              statusId: confirmStatus?.id || 1,
              price: menu?.price || 0,
            };
          }),
        },
      },
      include: {
        orderItems: true,
      },
    });

    broadcast(JSON.stringify({ type: "order-updated" }));
    return NextResponse.json(createdOrder);
  } catch (error) {
    console.log("create-order api error:", error);
    return NextResponse.json(
      { error: "failed to fetch create-order" },
      { status: 500 }
    );
  }
}
