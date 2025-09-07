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
import Template from "@/components/Template";

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
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="border-b-1 py-7 bg-gray-100 flex">
    //     <h1 className="mx-10">レストランタブレットUI</h1>
    //     <div className="flex gap-4">
    //       <p>メニュー</p>
    //       <p>アレルギー</p>
    //       <p>操作方法</p>
    //       <p>店員呼び出し</p>
    //     </div>
    //   </div>
    //   <div className="border-b-1 py-10 bg-gray-100 mb-5">
    //     <div className="mx-10">
    //       {categories.map((item: any) => {
    //         return (
    //           // <button
    //           //   key={item.name}
    //           //   onClick={() => setSelectedCategory(item.name)}
    //           // >
    //           //   {item.displayName}
    //           // </button>
    //           <Button
    //             key={item.name}
    //             onClick={() => setSelectedCategory(item.name)}
    //           >
    //             {item.displayName}
    //           </Button>
    //         );
    //       })}
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-3 gap-4">
    //     {menus ? (
    //       // menus.map((menu: MenuItem) => {
    //       //   return (
    //       //     <div key={menu.id}>
    //       //       <div>
    //       //         <img src={menu.image} alt="画像" />
    //       //       </div>
    //       //       <p>{menu.name}</p>
    //       //       <p>{menu.description}</p>
    //       //       {/* <p>{menu.category}</p> */}
    //       //       <p>{menu.price}</p>
    //       //     </div>
    //       //   );
    //       // })
    //       menus.map((menu: MenuItem) => {
    //         return (
    //           <Card
    //             key={menu.id}
    //             className="w-[250px] h-[200px]"
    //             onClick={() => handleMenuClick(menu.id)}
    //           >
    //             <CardContent>
    //               <div>
    //                 <img src={menu.image} alt="画像" />
    //               </div>
    //               <p>{menu.name}</p>
    //               <p>{menu.description}</p>
    //               {/* <p>{menu.category}</p> */}
    //               <p>{menu.price}</p>
    //             </CardContent>
    //           </Card>
    //         );
    //       })
    //     ) : (
    //       <div>loading...</div>
    //     )}

    //     <Dialog open={isOpen} onOpenChange={setIsOpen}>
    //       <DialogContent className="bg-white">
    //         <DialogHeader>
    //           <DialogTitle>{detail ? detail.name : "loading..."}</DialogTitle>
    //         </DialogHeader>
    //         <div>
    //           {detail ? (
    //             <div>
    //               <p>{detail.image}</p>
    //               <p>{detail.description}</p>
    //               <p>{detail.category.name}</p>
    //               {detail.allergies ? (
    //                 detail.allergies.map((a: any) => (
    //                   <p key={a.id}>{a.displayName}</p>
    //                 ))
    //               ) : (
    //                 <p></p>
    //               )}
    //               {detail.availableSides ? (
    //                 detail.availableSides.map((side: any) => (
    //                   <p key={side.id}>{side.name}</p>
    //                 ))
    //               ) : (
    //                 <p></p>
    //               )}
    //               <p>{detail.price}</p>
    //             </div>
    //           ) : (
    //             <div>loading...</div>
    //           )}
    //         </div>
    //         <DialogFooter>
    //           <Button onClick={() => handleAddToCart(detail)}>
    //             カートに追加
    //           </Button>
    //         </DialogFooter>
    //       </DialogContent>
    //     </Dialog>

    //     <div className="bg-gray-100">
    //       {cart ? (
    //         <div>
    //           {cart.map((item) => (
    //             <p key={item.menuId} onClick={() => handleRemoveFromCart(item)}>
    //               {item.name}
    //             </p>
    //           ))}
    //         </div>
    //       ) : (
    //         <p>カートに商品がありません。</p>
    //       )}
    //     </div>
    //   </div>
    // </div>

    // <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
    //   <div
    //     className="bg-white rounded-lg shadow-lg w-full max-w-screen-xl flex flex-col"
    //     style={{
    //       width: "min(1280px, 95vw)",
    //       height: "min(800px, 80vh)",
    //     }}
    //   >
    //     {/* 上部 */}
    //     <header className="bg-blue-500 text-white p-4">ヘッダー</header>

    //     {/* 中央（左右配置） */}
    //     <main className="flex-1 flex">
    //       {/* 左側 */}
    //       {/* <aside className="w-64 bg-gray-50 p-4">左サイドバー</aside> */}

    //       {/* 中央コンテンツ */}
    //       <div className="flex-1 p-4">メインコンテンツ</div>

    //       {/* 右側 */}
    //       <aside className="w-64 bg-gray-50 p-4">右サイドバー</aside>
    //     </main>

    //     {/* 下部 */}
    //     <footer className="bg-gray-800 text-white p-4">フッター</footer>
    //   </div>
    // </div>

    <Template />
  );
}
