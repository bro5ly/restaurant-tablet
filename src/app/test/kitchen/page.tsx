"use client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [tableIds, setTableIds] = useState<any>();
  const [orders, setOrders] = useState<any>();
  const [isUpdated, setIsUpdated] = useState<any>();
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const fetchTableIds = async () => {
    try {
      const res = await fetch("/api/orders/tableIds");
      if (!res.ok) throw new Error("tableIds not found");
      const data = await res.json();
      setTableIds(data);
    } catch (error) {
      console.log("tableId api error: ", error);
      throw new Error("failed to fetch tableIds");
    }
  };

  const fetchCategoryOrder = async () => {
    try {
      const res = await fetch("/api/orders/category?categoryId=1", {
        method: "GET",
      });
      if (!res.ok) throw new Error("order not found");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log("order api error: ", error);
      throw new Error("failed to fetch order");
    }
  };

  const fetchUpdateStatus = async () => {
    try {
      const res = await fetch("/api/orders/update/1");
      if (!res.ok) throw new Error("orderItem not found");
      const data = await res.json();
      setIsUpdated(data);
    } catch (error) {
      console.log("orderItem api error: ", error);
      throw new Error("failed to fetch orderItem");
    }
  };

  const handleAddOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableId: 1,
        orderItems: [
          {
            categoryId: 1,
            menuId: 24,
            quantity: 2,
            statusId: 1,
            price: 509,
          },
        ],
      }),
    });
    if (!res.ok) throw new Error("failed to created order");
    setIsSuccess(true);
  };

  useEffect(() => {
    fetchTableIds();
    fetchCategoryOrder();
    fetchUpdateStatus();

    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("WebSocket接続成功");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("通知受信:", data);
      if (data.type === "order-updated") fetchCategoryOrder();
    };
    return () => ws.close();
  }, []);

  console.log(orders);
  return (
    <>
      <div>
        {tableIds ? (
          tableIds.map((table: any) => {
            return <p key={table.id}>{table.id}</p>;
          })
        ) : (
          <p>loading...</p>
        )}
        {orders ? (
          orders.map((item: any) => {
            return (
              <div key={item.id} className="flex gap-4">
                <p className="p-4">{item.id}</p>
                <p className="p-4">{item.price}</p>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
        <button onClick={handleAddOrder}>オーダー作成</button>
      </div>
    </>
  );
}
