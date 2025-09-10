"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, Smartphone, Receipt, Users, ArrowLeft } from "lucide-react";
import { useAtom } from "jotai";
import { tableInfoAtom } from "@/atoms/atom";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("cash");
  const [splitBill, setSplitBill] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const [needsReceipt, setNeedsReceipt] = useState(false);
  const [tableInfo] = useAtom(tableInfoAtom);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 注文データを取得
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('会計画面: 注文データを取得中...');
        const response = await fetch(`/api/orders/table/${tableInfo.tableId}?includeServed=true`);
        
        if (!response.ok) {
          throw new Error(`注文データの取得に失敗しました: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('取得した注文データ:', data);
        setOrders(data);
        
      } catch (error) {
        console.error("注文データ取得エラー:", error);
        // サンプルデータをフォールバックとして使用
        setOrders([
          {
            id: 1,
            orderNumber: "001",
            createdAt: new Date().toISOString(),
            orderItems: [
              { menu: { name: "ハンバーグ定食" }, price: 980, quantity: 1 },
              { menu: { name: "ドリンクバー" }, price: 280, quantity: 1 },
            ],
            total: 1260,
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [tableInfo.tableId]);

  const totalAmount = orders.reduce((sum, order) => sum + (order.total || order.subtotal || 0), 0);
  const tax = Math.floor(totalAmount * 0.1);
  const finalAmount = totalAmount + tax;

  const paymentMethods = [
    { id: "cash", name: "現金", icon: Banknote },
    { id: "card", name: "クレジットカード", icon: CreditCard },
    { id: "digital", name: "デジタル決済", icon: Smartphone },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
        style={{
          width: "min(1280px, 95vw)",
          height: "min(800px, 80vh)",
        }}
      >
        {/* ヘッダー */}
        <nav className="h-14 bg-red-600 text-white flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold">会計</h1>
            <span className="text-sm bg-red-700 px-2 py-1 rounded">
              {tableInfo.tableName}
            </span>
            {tableInfo.partySize && (
              <span className="text-sm bg-red-500 px-2 py-1 rounded flex items-center gap-1">
                <Users className="w-3 h-3" />
                {tableInfo.partySize}名
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700"
              onClick={() => router.push('/ui_test')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              メニューに戻る
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700"
            >
              店員を呼ぶ
            </Button>
          </div>
        </nav>

        <div className="flex-1 flex min-h-0">
          {/* 左側: 注文リスト */}
          <main className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">ご注文内容</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                  <p>注文データを読み込み中...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <Card key={order.id} className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            注文 #{order.id}
                          </CardTitle>
                          <Badge variant="outline">
                            {new Date(order.createdAt).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {(order.orderItems || order.items || []).map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between items-center"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">
                                  {item.menu?.name || item.name || 'メニュー名不明'}
                                </span>
                                {item.quantity > 1 && (
                                  <Badge variant="secondary" className="text-xs">
                                    ×{item.quantity}
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                ¥{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <Separator className="my-2" />
                          <div className="flex justify-between items-center font-semibold">
                            <span>小計</span>
                            <span>¥{(order.total || order.subtotal || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>注文データがありません</p>
                  </div>
                )}
              </div>
            )}
          </main>

          {/* 右側: 決済エリア */}
          <aside className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-white">
              <h3 className="font-bold text-lg">お会計</h3>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* 合計金額 */}
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>小計</span>
                      <span>¥{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>消費税(10%)</span>
                      <span>¥{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold text-red-600">
                      <span>合計</span>
                      <span>¥{finalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 割り勘設定 */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>割り勘</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={splitBill ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSplitBill(!splitBill)}
                        className={
                          splitBill ? "bg-red-600 hover:bg-red-700" : ""
                        }
                      >
                        {splitBill ? "有効" : "無効"}
                      </Button>
                    </div>
                    {splitBill && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setSplitCount(Math.max(2, splitCount - 1))
                            }
                            className="w-8 h-8 p-0"
                          >
                            -
                          </Button>
                          <span className="text-center w-12">
                            {splitCount}人
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSplitCount(splitCount + 1)}
                            className="w-8 h-8 p-0"
                          >
                            +
                          </Button>
                        </div>
                        <div className="text-sm text-gray-600">
                          一人あたり: ¥
                          {Math.ceil(finalAmount / splitCount).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 支払い方法 */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">支払い方法</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <Button
                          key={method.id}
                          variant={
                            selectedPaymentMethod === method.id
                              ? "default"
                              : "outline"
                          }
                          className={`w-full justify-start ${
                            selectedPaymentMethod === method.id
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "border-2 border-gray-200"
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {method.name}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 領収書 */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Receipt className="w-4 h-4" />
                    <span>領収書</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant={needsReceipt ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNeedsReceipt(!needsReceipt)}
                    className={
                      needsReceipt
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : ""
                    }
                  >
                    {needsReceipt ? "発行する" : "不要"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 決済ボタン */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-bold">
                {splitBill ? `${splitCount}人で` : ""}決済する
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
