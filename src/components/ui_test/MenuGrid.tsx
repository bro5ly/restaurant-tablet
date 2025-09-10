"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types/menu";

interface MenuGridProps {
  menus: MenuItem[];
  onMenuClick: (menuId: number) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ menus, onMenuClick }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md hover:border-red-300 transition-all duration-200"
            onClick={() => onMenuClick(menu.id)}
          >
            <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">画像</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{menu.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {menu.description}
            </p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-red-600">
                ¥{menu.price.toLocaleString()}
              </span>
              {menu.isRecommended && (
                <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                  おすすめ
                </Badge>
              )}
            </div>
            {menu.allergies && menu.allergies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {menu.allergies.map((allergy) => (
                  <Badge
                    key={allergy.id}
                    variant="outline"
                    className="text-xs border-orange-300 text-orange-600"
                  >
                    {allergy.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;