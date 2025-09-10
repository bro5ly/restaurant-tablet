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
import { CartItem } from "@/atoms/atom";

interface EditItemModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: any;
  editQuantity: number;
  editSelectedSides: number[];
  editSelectedAllergies: string[];
  onQuantityChange: (change: number) => void;
  onSideToggle: (sideId: number) => void;
  onAllergyToggle: (allergyId: string) => void;
  onUpdateCartItem: () => void;
  getAllergyDisplayName: (allergyName: string) => string;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onOpenChange,
  editingItem,
  editQuantity,
  editSelectedSides,
  editSelectedAllergies,
  onQuantityChange,
  onSideToggle,
  onAllergyToggle,
  onUpdateCartItem,
  getAllergyDisplayName,
}) => {
  if (!editingItem) return null;

  const calculateEditTotal = () => {
    let total = editingItem.basePrice * editQuantity;
    if (editingItem.availableSides) {
      editSelectedSides.forEach(sideId => {
        const side = editingItem.availableSides.find((s: any) => s.id === sideId);
        if (side) {
          total += side.price * editQuantity;
        }
      });
    }
    return total;
  };

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
            <DialogTitle className="text-xl font-bold">
              {editingItem.name} の編集
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* サイドメニュー選択 */}
            {editingItem.availableSides && editingItem.availableSides.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3">サイドメニュー</h4>
                <div className="grid grid-cols-1 gap-2">
                  {editingItem.availableSides.map((side: any) => (
                    <div
                      key={side.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        editSelectedSides.includes(side.id)
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
                        {editSelectedSides.includes(side.id) && (
                          <Check className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* アレルギー情報 */}
            {editingItem.availableAllergies && editingItem.availableAllergies.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3">アレルギー情報</h4>
                <div className="grid grid-cols-2 gap-2">
                  {editingItem.availableAllergies.map((allergy: any) => (
                    <div
                      key={allergy.id}
                      className={`border rounded-lg p-2 cursor-pointer transition-colors ${
                        editSelectedAllergies.includes(allergy.id)
                          ? "border-red-500 bg-red-50"
                          : "border-orange-300 bg-orange-50"
                      }`}
                      onClick={() => onAllergyToggle(allergy.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">
                          {getAllergyDisplayName(allergy.name)}
                        </span>
                        {editSelectedAllergies.includes(allergy.id) && (
                          <Check className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
                  disabled={editQuantity <= 1}
                  className="w-10 h-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-8 text-center">
                  {editQuantity}
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

            {/* 価格表示 */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>合計</span>
                <span className="text-red-600">
                  ¥{calculateEditTotal().toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={onUpdateCartItem}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
            >
              更新する
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemModal;