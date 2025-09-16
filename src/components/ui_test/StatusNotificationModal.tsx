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
import { Clock, UtensilsCrossed, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface StatusNotificationProps {
  orderId: number;
  status: string;
  message: string;
  menuNames?: string[];
}

interface StatusNotificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  statusNotification: StatusNotificationProps | null;
}

const StatusNotificationModal: React.FC<StatusNotificationModalProps> = ({
  isOpen,
  onOpenChange,
  statusNotification,
}) => {
  if (!statusNotification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-md bg-white border-gray-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {statusNotification && (
            <div className="text-center py-6">
              <div className="mb-6">
                {statusNotification.status === "COOKING" && (
                  <Clock className="w-16 h-16 text-orange-500" />
                )}
                {statusNotification.status === "READY" && (
                  <UtensilsCrossed className="w-16 h-16 text-green-500" />
                )}
                {statusNotification.status === "SERVED" && (
                  <Sparkles className="w-16 h-16 text-green-600" />
                )}
              </div>
              <div className="mb-2">
                {statusNotification.menuNames && statusNotification.menuNames.length > 0 ? (
                  <div>
                    <p className="text-lg font-semibold mb-1">更新されたメニュー:</p>
                    <div className="space-y-1">
                      {statusNotification.menuNames.map((menuName, index) => (
                        <p key={index} className="text-base bg-gray-100 px-3 py-1 rounded-lg">
                          {menuName}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-lg font-semibold">
                    注文番号: ORDER-{statusNotification.orderId}
                  </p>
                )}
              </div>
              <p className="text-gray-700">{statusNotification.message}</p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              OK
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusNotificationModal;