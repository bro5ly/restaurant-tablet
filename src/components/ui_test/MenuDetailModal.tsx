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
import { Plus, Minus, Check } from "lucide-react";
import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";

interface MenuDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menu: MenuItem | null;
  quantity: number;
  selectedSides: number[];
  selectedAllergies: string[];
  onQuantityChange: (change: number) => void;
  onSideToggle: (sideId: number) => void;
  onAllergyToggle: (allergyId: string) => void;
  onAddToCart: () => void;
  hasSelectedAllergy: (menu: MenuItem) => boolean;
  getAllergyDisplayName: (allergyName: string) => string;
  calculateModalTotal: () => number;
  getModalBreakdown: () => {
    basePrice: number;
    sidesTotal: number;
    total: number;
  };
}

const MenuDetailModal: React.FC<MenuDetailModalProps> = ({
  isOpen,
  onOpenChange,
  menu,
  quantity,
  selectedSides,
  selectedAllergies,
  onQuantityChange,
  onSideToggle,
  onAllergyToggle,
  onAddToCart,
  hasSelectedAllergy,
  getAllergyDisplayName,
  calculateModalTotal,
  getModalBreakdown,
}) => {
  if (!menu) return null;

  const modalBreakdown = getModalBreakdown();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-2xl bg-white border-gray-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{menu.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400">画像</span>
            </div>

            <div>
              <p className="text-gray-600 mb-4">{menu.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  ¥{menu.price.toLocaleString()}
                </span>
                {menu.isRecommended && (
                  <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                    おすすめ
                  </Badge>
                )}
              </div>
            </div>

            {/* サイドメニュー選択 */}
            {menu.sides && menu.sides.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3">サイドメニュー</h4>
                <div className="grid grid-cols-1 gap-2">
                  {menu.sides.map((side) => (
                    <div
                      key={side.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedSides.includes(side.id)
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                      onClick={() => onSideToggle(side.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{side.name}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            +¥{side.price.toLocaleString()}
                          </span>
                        </div>
                        {selectedSides.includes(side.id) && (
                          <Check className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* アレルギー情報 */}
            {menu.allergies && menu.allergies.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3">アレルギー情報</h4>
                <div className="grid grid-cols-2 gap-2">
                  {menu.allergies.map((allergy) => (
                    <div
                      key={allergy.id}
                      className={`border rounded-lg p-2 cursor-pointer transition-colors ${
                        selectedAllergies.includes(allergy.id)
                          ? "border-red-500 bg-red-50"
                          : "border-orange-300 bg-orange-50"
                      }`}
                      onClick={() => onAllergyToggle(allergy.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">
                          {getAllergyDisplayName(allergy.name)}
                        </span>
                        {selectedAllergies.includes(allergy.id) && (
                          <Check className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {hasSelectedAllergy(menu) && (
                  <p className="text-sm text-orange-600 mt-2">
                    ※
                    選択されたアレルギー成分が含まれています。ご注意ください。
                  </p>
                )}
              </div>
            )}

            {/* 数量選択 */}
            <div>
              <h4 className="text-lg font-semibold mb-3">数量</h4>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(1)}
                  className="w-10 h-10 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 価格計算 */}
            <div className="border-t pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>メニュー価格</span>
                  <span>¥{modalBreakdown.basePrice.toLocaleString()}</span>
                </div>
                {modalBreakdown.sidesTotal > 0 && (
                  <div className="flex justify-between">
                    <span>サイドメニュー</span>
                    <span>¥{modalBreakdown.sidesTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>合計</span>
                  <span className="text-red-600">
                    ¥{modalBreakdown.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={onAddToCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
            >
              カートに追加 - ¥{calculateModalTotal().toLocaleString()}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuDetailModal;