"use client";

import { Categories, MenuItem, OrderItem } from "@/types/menu";
import React, { useEffect, useState } from "react";

const categoryName: Categories[] = ["SET", "SINGLE", "SIDE", "DRINK_DESERT"];

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState<Categories>("SET");
  const [categoryMenu, setCategoryMenu] = useState<MenuItem[]>();
  const [menuDetail, setMenuDetail] = useState<MenuItem>();

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

  const handleClick = async () => {
    try {
      const res = await fetch(`/api/menu/detail/1`);
      if (!res.ok) throw new Error("detail not found");
      const data = await res.json();
      setMenuDetail(data);
    } catch (error) {
      console.log("detail api error", error);
      throw new Error("failed to fetch detail");
    }
  };
  console.log(categoryMenu);
  console.log(menuDetail);
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

      <button onClick={handleClick}>メニュー詳細</button>
      <div>
        <p>{menuDetail?.name}</p>
      </div>
    </>
  );
}
