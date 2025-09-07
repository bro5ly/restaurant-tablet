import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { broadcast } from "../../../../../../server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const orderId = parseInt(id);
  const { status } = await req.json();

  try {
    // Get the status ID from status name
    const statusRecord = await prisma.status.findFirst({
      where: {
        name: status,
      },
    });

    if (!statusRecord) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update the order status and all its order items
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        statusId: statusRecord.id,
        orderItems: {
          updateMany: {
            where: {
              orderId: orderId,
            },
            data: {
              statusId: statusRecord.id,
            },
          },
        },
      },
      include: {
        table: true,
        status: true,
        orderItems: {
          include: {
            menu: {
              include: {
                category: true,
              },
            },
            category: true,
            status: true,
          },
        },
      },
    });

    // Broadcast the update to all connected clients
    broadcast(
      JSON.stringify({ type: "order-status-updated", order: updatedOrder })
    );

    return NextResponse.json(updatedOrder);
  } catch (err) {
    console.log("order update api error: ", err);
    return NextResponse.json(
      { error: "failed to update order" },
      { status: 500 }
    );
  }
}
