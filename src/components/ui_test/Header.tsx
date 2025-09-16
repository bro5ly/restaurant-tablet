"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, History, ShoppingCart, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableInfo } from "@/atoms/atom";

interface HeaderProps {
  tableInfo: TableInfo;
  totalItems: number;
  onOrderHistoryClick: () => Promise<void>;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  tableInfo,
  totalItems,
  onOrderHistoryClick,
  onCartClick,
}) => {
  const router = useRouter();

  return (
    <nav className="h-14 bg-red-600 text-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">ファミリーレストラン</h1>
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
          onClick={() => router.push('/table')}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          人数変更
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-red-700 relative"
          onClick={onOrderHistoryClick}
        >
          <History className="w-4 h-4 mr-1" />
          注文履歴
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-red-700 relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          カート
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-red-700"
        >
          店員を呼ぶ
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-red-700"
          onClick={() => router.push('/account')}
        >
          会計
        </Button>
      </div>
    </nav>
  );
};

export default Header;