"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Categories } from "@/types/menu";

interface CategoryTabsProps {
  categories: { name: Categories; label: string }[];
  selectedCategory: Categories;
  onCategoryChange: (category: Categories) => void;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className={
                selectedCategory === category.name
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "text-gray-700 hover:text-red-600 hover:border-red-600"
              }
              onClick={() => onCategoryChange(category.name)}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevPage}
              disabled={currentPage === 0}
              className="text-gray-600 border-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
              disabled={currentPage === totalPages - 1}
              className="text-gray-600 border-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTabs;