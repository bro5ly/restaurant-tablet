"use client";

import React, { useState } from "react";
import MenuCard from "@/components/MenuCard";
import { useMenus } from "@/hooks/useMenu";
import { MenuItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useDetail } from "@/hooks/useDetail";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import {
  cartAtom,
  addAtom,
  editAtom,
  removeAtom,
  CartItem,
} from "@/atoms/atom";

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

  const [selecetedMenuId, setSelectedMenuId] = useState<number | null>(1);
  const { detail } = useDetail(selecetedMenuId);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cart] = useAtom(cartAtom);
  const [, addToCart] = useAtom(addAtom);
  const [, editCart] = useAtom(editAtom);
  const [, removeFromCart] = useAtom(removeAtom);

  const handleMenuClick = (menuId: number) => {
    setSelectedMenuId(menuId);
    setIsOpen(true);
  };

  const handleAddToCart = (detail: MenuItem) => {
    const { categoryId, id, price, name } = detail;
    addToCart({
      categoryId,
      menuId: id,
      price,
      quantity: 1,
      statusId: 1,
      name,
    });
  };

  const handleRemoveFromCart = (item: CartItem) => {
    const { categoryId, menuId, price, name } = item;
    removeFromCart({
      categoryId,
      menuId,
      price,
      quantity: 1,
      statusId: 1,
      name,
    });
  };

  console.log("menuDetail: ", detail);
  console.log("カート: ", cart);

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
              <Card
                key={menu.id}
                className="w-[250px] h-[200px]"
                onClick={() => handleMenuClick(menu.id)}
              >
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

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>{detail ? detail.name : "loading..."}</DialogTitle>
            </DialogHeader>
            <div>
              {detail ? (
                <div>
                  <p>{detail.image}</p>
                  <p>{detail.description}</p>
                  <p>{detail.category.name}</p>
                  {detail.allergies ? (
                    detail.allergies.map((a: any) => (
                      <p key={a.id}>{a.displayName}</p>
                    ))
                  ) : (
                    <p></p>
                  )}
                  {detail.availableSides ? (
                    detail.availableSides.map((side: any) => (
                      <p key={side.id}>{side.name}</p>
                    ))
                  ) : (
                    <p></p>
                  )}
                  <p>{detail.price}</p>
                </div>
              ) : (
                <div>loading...</div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => handleAddToCart(detail)}>
                カートに追加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="bg-gray-100">
          {cart ? (
            <div>
              {cart.map((item) => (
                <p key={item.menuId} onClick={() => handleRemoveFromCart(item)}>
                  {item.name}
                </p>
              ))}
            </div>
          ) : (
            <p>カートに商品がありません。</p>
          )}
        </div>
      </div>
    </>
  );
}
