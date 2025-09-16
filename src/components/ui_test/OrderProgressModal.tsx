"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

interface OrderProgressModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  progressLoading: boolean;
  progressOrders: any[];
}

const OrderProgressModal: React.FC<OrderProgressModalProps> = ({
  isOpen,
  onOpenChange,
  progressLoading,
  progressOrders,
}) => {
  const getStatusBadge = (statusName: string) => {
    const statusConfig = {
      CONFIRM: { color: "bg-yellow-500", text: "確認中" },
      COOKING: { color: "bg-orange-500", text: "調理中" },
      READY: { color: "bg-green-500", text: "配膳準備完了" },
      SERVED: { color: "bg-blue-500", text: "配膳済み" },
    };
    const config = statusConfig[statusName as keyof typeof statusConfig] || {
      color: "bg-gray-500",
      text: statusName || "不明",
    };
    return (
      <Badge className={`${config.color} text-white hover:${config.color}`}>
        {config.text}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-4xl !max-h-[85vh] bg-white border-gray-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              注文進捗状況
            </DialogTitle>
          </DialogHeader>

          {progressLoading ? (
            <div className="flex justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                <p>注文進捗を読み込み中...</p>
              </div>
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto">
              {progressOrders.length > 0 ? (
                <div className="space-y-4">
                  {progressOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-lg">注文 #{order.id}</h4>
                          {getStatusBadge(
                            typeof order.status === "string" ? order.status : order.status?.name
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString("ja-JP")}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.orderItems?.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span>{item.menu?.name || item.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                ×{item.quantity}
                              </Badge>
                            </div>
                            <span>¥{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-3 pt-2 flex justify-between font-semibold">
                        <span>小計</span>
                        <span>¥{(order.total || order.subtotal || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">進行中の注文はありません</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              閉じる
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderProgressModal;