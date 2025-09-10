"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, CheckCircle, RefreshCw, UtensilsCrossed, Beef, Salad, Coffee, Grid, List } from "lucide-react";
import { Order, OrderItem, Status } from "@/types/menu";

const KitchenDisplay = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // データ取得
  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log("キッチンUI: 注文データを取得中...");

      const [confirmedRes, cookingRes, readyRes] = await Promise.all([
        fetch("/api/orders/category?status=CONFIRM"),
        fetch("/api/orders/category?status=COOKING"),
        fetch("/api/orders/category?status=READY"),
      ]);

      console.log("APIレスポンス状態:", {
        confirmed: confirmedRes.status,
        cooking: cookingRes.status,
        ready: readyRes.status,
      });

      const [confirmed, cooking, ready] = await Promise.all([
        confirmedRes.json(),
        cookingRes.json(),
        readyRes.json(),
      ]);

      console.log("取得した注文データ:", {
        confirmed: confirmed,
        cooking: cooking,
        ready: ready,
        confirmedLength: confirmed?.length || 0,
        cookingLength: cooking?.length || 0,
        readyLength: ready?.length || 0,
      });

      setOrders([...confirmed, ...cooking, ...ready]);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // 注文状態更新
  const updateOrderStatus = async (orderId: number, newStatus: Status) => {
    setUpdating(orderId);
    try {
      const response = await fetch(`/api/orders/update/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // 成功したらデータを再取得
        await fetchOrders();
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchOrders();

    // WebSocket接続を設定
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("キッチンUI: WebSocket接続開始");
    };

    ws.onmessage = (event) => {
      console.log("キッチンUI: WebSocketメッセージ受信:", event.data);
      try {
        const message = JSON.parse(event.data);
        if (
          message.type === "order-updated" ||
          message.type === "order-status-updated"
        ) {
          // 注文データを再取得
          fetchOrders();
        }
      } catch (error) {
        console.log("WebSocketメッセージ解析エラー:", error);
      }
    };

    ws.onclose = () => {
      console.log("キッチンUI: WebSocket接続終了");
    };

    ws.onerror = (error) => {
      console.error("キッチンUI: WebSocketエラー:", error);
    };

    // 30秒ごとにデータを更新（WebSocketの補完として）
    const interval = setInterval(fetchOrders, 30000);

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, []);

  // ステータス名を取得するヘルパー関数
  const getStatusName = (status: any): string => {
    if (typeof status === "string") {
      return status;
    }
    if (status && typeof status === "object" && status.name) {
      return status.name;
    }
    return "";
  };

  // カテゴリーでフィルタリングした注文を取得
  const getFilteredOrders = () => {
    if (!selectedCategory) return orders;
    
    return orders.filter((order) => {
      return order.orderItems.some((item) => {
        const categoryName = typeof item.category === 'string' 
          ? item.category 
          : item.category?.name || 'その他';
        return categoryName === selectedCategory;
      });
    });
  };

  const filteredOrders = getFilteredOrders();

  // 各ステータスの注文をフィルタリング
  const confirmedOrders = filteredOrders.filter((order) => {
    console.log(
      "フィルタリング中:",
      order.id,
      "status:",
      order.status,
      typeof order.status
    );
    const statusName = getStatusName(order.status);
    return statusName === "CONFIRM";
  });
  const cookingOrders = filteredOrders.filter((order) => {
    const statusName = getStatusName(order.status);
    return statusName === "COOKING";
  });
  const readyOrders = filteredOrders.filter((order) => {
    const statusName = getStatusName(order.status);
    return statusName === "READY";
  });

  console.log("フィルタリング結果:", {
    totalOrders: orders.length,
    confirmedCount: confirmedOrders.length,
    cookingCount: cookingOrders.length,
    readyCount: readyOrders.length,
  });


  // 経過時間計算
  const getElapsedTime = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60)
    );
    return `${diffMinutes}分前`;
  };

  // カテゴリー別アイテムグループ化
  const groupItemsByCategory = (
    items: OrderItem[]
  ): Record<string, OrderItem[]> => {
    return items.reduce((acc, item) => {
      const categoryName =
        typeof item.category === "string"
          ? item.category
          : item.category?.name || "その他";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(item);
      return acc;
    }, {} as Record<string, OrderItem[]>);
  };

  interface OrderCardProps {
    order: Order;
    actionLabel: string;
    actionIcon: React.ComponentType<any>;
    onAction: (orderId: number, newStatus: Status) => void;
    disabled?: boolean;
  }

  const OrderCard: React.FC<OrderCardProps> = ({
    order,
    actionLabel,
    actionIcon: ActionIcon,
    onAction,
    disabled = false,
  }) => {
    const groupedItems = groupItemsByCategory(order.orderItems);

    const getNextStatus = (): Status => {
      const currentStatus = getStatusName(order.status);
      switch (currentStatus) {
        case "CONFIRM":
          return "COOKING";
        case "COOKING":
          return "READY";
        case "READY":
          return "SERVED";
        default:
          return "COOKING";
      }
    };

    const getCardBackgroundColor = (): string => {
      const currentStatus = getStatusName(order.status);
      switch (currentStatus) {
        case "CONFIRM":
          return "bg-blue-50 border-blue-200";
        case "COOKING":
          return "bg-orange-50 border-orange-200";
        case "READY":
          return "bg-green-50 border-green-200";
        default:
          return "bg-white border-gray-200";
      }
    };

    return (
      <div
        className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-black`}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">
                {typeof order.table === "string"
                  ? order.table
                  : order.table?.name || `テーブル ${order.tableId}`}
              </Badge>
              <span className="text-sm text-gray-500">#{order.id}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {getElapsedTime(order.createdAt.toString())}
            </div>
          </div>
          <Button
            className="flex items-center gap-1 border"
            size="sm"
            onClick={() => onAction(order.id, getNextStatus())}
            disabled={disabled}
          >
            {disabled ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <ActionIcon className="w-4 h-4" />
            )}
            {actionLabel}
          </Button>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedItems).map(([category, items]) => {
            const getCategoryIcon = (category: string): React.ReactNode => {
              switch (category) {
                case "SET":
                  return <UtensilsCrossed className="w-5 h-5" />;
                case "SINGLE":
                  return <Beef className="w-5 h-5" />;
                case "SIDE":
                  return <Salad className="w-5 h-5" />;
                case "DRINK_DESERT":
                  return <Coffee className="w-5 h-5" />;
                default:
                  return <ChefHat className="w-5 h-5" />;
              }
            };

            const getCategoryColor = (category: string): string => {
              switch (category) {
                case "SET":
                  return "bg-blue-50 border-blue-200";
                case "SINGLE":
                  return "bg-green-50 border-green-200";
                case "SIDE":
                  return "bg-yellow-50 border-yellow-200";
                case "DRINK_DESERT":
                  return "bg-purple-50 border-purple-200";
                default:
                  return "bg-gray-50 border-gray-200";
              }
            };

            const getCategoryTextColor = (category: string): string => {
              switch (category) {
                case "SET":
                  return "text-blue-800";
                case "SINGLE":
                  return "text-green-800";
                case "SIDE":
                  return "text-yellow-800";
                case "DRINK_DESERT":
                  return "text-purple-800";
                default:
                  return "text-gray-800";
              }
            };

            return (
              <div
                key={category}
                className={`p-3 rounded-lg border border-gray-200 `}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center">{getCategoryIcon(category)}</span>
                  <h4 className={`font-bold text-sm `}>
                    {getCategoryDisplayName(category)}
                  </h4>
                  <Badge variant="outline" className={`ml-auto`}>
                    {items.length}品
                  </Badge>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-md p-2 border border-gray-100 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {item.menu?.name || "メニュー名不明"}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              ×{item.quantity}
                            </Badge>
                          </div>
                          {item.note && (
                            <div className="mt-1">
                              <span className="text-orange-600 text-xs bg-orange-50 px-2 py-1 rounded">
                                ※{item.note}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // カテゴリー表示名の取得
  const getCategoryDisplayName = (category: string): string => {
    switch (category) {
      case "SET":
        return "セットメニュー";
      case "SINGLE":
        return "単品";
      case "SIDE":
        return "サイドメニュー";
      case "DRINK_DESERT":
        return "ドリンク・デザート";
      default:
        return category;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>注文データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              キッチンディスプレイ
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchOrders}
                disabled={loading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`}
                />
                更新
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">カテゴリー:</span>
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={selectedCategory === null ? "bg-gray-600 hover:bg-gray-700 text-white" : ""}
                >
                  全て
                </Button>
                <Button
                  variant={selectedCategory === "SET" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("SET")}
                  className={selectedCategory === "SET" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                >
                  <UtensilsCrossed className="w-4 h-4 mr-1" />
                  セット
                </Button>
                <Button
                  variant={selectedCategory === "SINGLE" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("SINGLE")}
                  className={selectedCategory === "SINGLE" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                >
                  <Beef className="w-4 h-4 mr-1" />
                  単品
                </Button>
                <Button
                  variant={selectedCategory === "SIDE" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("SIDE")}
                  className={selectedCategory === "SIDE" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : ""}
                >
                  <Salad className="w-4 h-4 mr-1" />
                  サイド
                </Button>
                <Button
                  variant={selectedCategory === "DRINK_DESERT" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("DRINK_DESERT")}
                  className={selectedCategory === "DRINK_DESERT" ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                >
                  <Coffee className="w-4 h-4 mr-1" />
                  ドリンク
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>確認済み ({confirmedOrders.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>調理中 ({cookingOrders.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>完成 ({readyOrders.length})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* 確認済み注文 */}
        <div className="flex-1 p-4 border-r bg-blue-50">
          <h2 className="text-lg font-bold mb-4 text-blue-800">確認済み注文</h2>
          <div className="space-y-4 overflow-y-auto h-full">
            {confirmedOrders.length > 0 ? (
              confirmedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actionLabel="調理開始"
                  actionIcon={ChefHat}
                  onAction={updateOrderStatus}
                  disabled={updating === order.id}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                確認済み注文はありません
              </div>
            )}
          </div>
        </div>

        {/* 調理中 */}
        <div className="flex-1 p-4 border-r bg-orange-50">
          <h2 className="text-lg font-bold mb-4 text-orange-800">調理中</h2>
          <div className="space-y-4 overflow-y-auto h-full">
            {cookingOrders.length > 0 ? (
              cookingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actionLabel="完了"
                  actionIcon={CheckCircle}
                  onAction={updateOrderStatus}
                  disabled={updating === order.id}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                調理中の注文はありません
              </div>
            )}
          </div>
        </div>

        {/* 完成済み */}
        <div className="flex-1 p-4 bg-green-50">
          <h2 className="text-lg font-bold mb-4 text-green-800">完成済み</h2>
          <div className="space-y-4 overflow-y-auto h-full">
            {readyOrders.length > 0 ? (
              readyOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actionLabel="配膳完了"
                  actionIcon={CheckCircle}
                  onAction={updateOrderStatus}
                  disabled={updating === order.id}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                完成済みの注文はありません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenDisplay;
