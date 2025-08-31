"use client";

import { Categories, MenuItem } from "@/types/menu";
import React, { useEffect, useState } from "react";

const categoryName: Categories[] = ["SET", "SINGLE", "SIDE", "DRINK_DESERT"];

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState<Categories>("SET");
  const [categoryMenu, setCategoryMenu] = useState<MenuItem[]>();

  useEffect(() => {
    const fetchCategoryMenu = async () => {
      try {
        const res = await fetch(`/api/menu/${selectedCategory}`);
        if (!res.ok) throw new Error("menu not found");
        const data: MenuItem[] = await res.json();
        setCategoryMenu(data);
      } catch (error) {
        console.log("category-menu api error", error);
        throw new Error("failed to fetch category-menu");
      }
    };
    fetchCategoryMenu();
  }, [selectedCategory]);
  return (
    <>
      <div className="flex gap-4 mb-5">
        {categoryName.map((item) => (
          <button key={item} onClick={() => setSelectedCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        {categoryMenu ? (
          categoryMenu.map((item) => <p key={item.id}>{item.name}</p>)
        ) : (
          <p>loading...</p>
        )}
      </div>
    </>
  );
}
