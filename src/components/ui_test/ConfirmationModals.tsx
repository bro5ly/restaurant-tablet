"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ConfirmationModalsProps {
  // Delete confirmation
  isDeleteModalOpen: boolean;
  onDeleteModalClose: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  deletingItem: any;

  // Clear cart confirmation
  isClearCartModalOpen: boolean;
  onClearCartModalClose: () => void;
  onConfirmClearCart: () => void;
  onCancelClearCart: () => void;
}

const ConfirmationModals: React.FC<ConfirmationModalsProps> = ({
  isDeleteModalOpen,
  onDeleteModalClose,
  onConfirmDelete,
  onCancelDelete,
  deletingItem,
  isClearCartModalOpen,
  onClearCartModalClose,
  onConfirmClearCart,
  onCancelClearCart,
}) => {
  return (
    <>
      {/* Delete Item Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={onDeleteModalClose}>
        <DialogContent className="!max-w-md bg-white border-gray-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                アイテムを削除
              </DialogTitle>
              <DialogDescription>
                「{deletingItem?.name}」をカートから削除しますか？
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={onCancelDelete}>
                キャンセル
              </Button>
              <Button
                variant="destructive"
                onClick={onConfirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                削除
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Clear Cart Confirmation Modal */}
      <Dialog open={isClearCartModalOpen} onOpenChange={onClearCartModalClose}>
        <DialogContent className="!max-w-md bg-white border-gray-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <X className="w-5 h-5" />
                カートをクリア
              </DialogTitle>
              <DialogDescription>
                カート内の全てのアイテムを削除しますか？この操作は取り消せません。
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={onCancelClearCart}>
                キャンセル
              </Button>
              <Button
                variant="destructive"
                onClick={onConfirmClearCart}
                className="bg-red-600 hover:bg-red-700"
              >
                クリア
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmationModals;