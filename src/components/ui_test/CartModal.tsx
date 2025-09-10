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
import { Trash2, Edit3, Plus, Minus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem } from "@/atoms/atom";

interface CartModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: any[];
  getTotalPrice: () => number;
  onItemClick: (item: any) => void;
  onDeleteClick: (item: any) => void;
  onClearCartClick: () => void;
  onOrderConfirm: () => Promise<void>;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onOpenChange,
  cartItems,
  getTotalPrice,
  onItemClick,
  onDeleteClick,
  onClearCartClick,
  onOrderConfirm,
}) => {
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
              <ShoppingCart className="w-5 h-5" />
              カート
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 max-h-[60vh] overflow-hidden">
            {cartItems.length > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.menuId}-${item.cartItemId || index}`}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{item.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              ×{item.quantity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            単価: ¥{item.price.toLocaleString()}
                          </p>
                          {item.sides && item.sides.length > 0 && (
                            <div className="mb-2">
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                サイドメニュー:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {item.sides.map((side: any, sideIndex: number) => (
                                  <Badge
                                    key={sideIndex}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {side.name} (+¥{side.price})
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {item.allergies && item.allergies.length > 0 && (
                            <div className="mb-2">
                              <p className="text-sm font-medium text-orange-700 mb-1">
                                アレルギー対応:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {item.allergies.map((allergy: string, allergyIndex: number) => (
                                  <Badge
                                    key={allergyIndex}
                                    variant="outline"
                                    className="text-xs border-orange-300 text-orange-600"
                                  >
                                    {allergy}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="text-lg font-bold text-red-600">
                            小計: ¥{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onItemClick(item)}
                            className="flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            編集
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDeleteClick(item)}
                            className="flex items-center gap-1 text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                            削除
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">合計金額:</span>
                    <span className="text-2xl font-bold text-red-600">
                      ¥{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onClearCartClick}
                      className="flex-1 text-gray-600 border-gray-300"
                    >
                      カートをクリア
                    </Button>
                    <Button
                      onClick={onOrderConfirm}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      注文を確定
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">カートは空です</p>
              </div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;