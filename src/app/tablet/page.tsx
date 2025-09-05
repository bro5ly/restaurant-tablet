"use client";

import React, { useState } from "react";
import MenuCard from "@/components/MenuCard";
import { useMenus } from "@/hooks/useMenu";
import { MenuItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "SET",
    displayName: "セットメニュー",
  },
  {
    name: "SINGLE",
    displayName: "単品",
  },
  {
    name: "SIDE",
    displayName: "サイドメニュー",
  },
  {
    name: "DRINK_DESERT",
    displayName: "ドリンク/デザート",
  },
];

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState<any>("SET");
  const { menus } = useMenus(selectedCategory);
  console.log(menus);
  return (
    <>
      <div>
        {categories.map((item: any) => {
          return (
            // <button
            //   key={item.name}
            //   onClick={() => setSelectedCategory(item.name)}
            // >
            //   {item.displayName}
            // </button>
            <Button
              key={item.name}
              onClick={() => setSelectedCategory(item.name)}
              className="bg-gray-100"
            >
              {item.displayName}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {menus ? (
          // menus.map((menu: MenuItem) => {
          //   return (
          //     <div key={menu.id}>
          //       <div>
          //         <img src={menu.image} alt="画像" />
          //       </div>
          //       <p>{menu.name}</p>
          //       <p>{menu.description}</p>
          //       {/* <p>{menu.category}</p> */}
          //       <p>{menu.price}</p>
          //     </div>
          //   );
          // })
          menus.map((menu: MenuItem) => {
            return (
              <Card key={menu.id} className="w-[250px] h-[200px]">
                <CardContent>
                  <div>
                    <img src={menu.image} alt="画像" />
                  </div>
                  <p>{menu.name}</p>
                  <p>{menu.description}</p>
                  {/* <p>{menu.category}</p> */}
                  <p>{menu.price}</p>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </>
  );
}
