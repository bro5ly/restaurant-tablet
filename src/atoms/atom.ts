// // atoms/cartAtoms.ts
// import { atom } from "jotai";
// import { atomWithStorage } from "jotai/utils";

// interface CartItem {
//   menuId: string;
//   categoryId: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// // 1. カート（状態保存）
// export const cartAtom = atomWithStorage<CartItem[]>("cart", []);

// // 2. 追加
// export const addAtom = atom(null, (get, set, item: CartItem) => {
//   const cart = get(cartAtom);
//   const existing = cart.find((i) => i.menuId === item.menuId);

//   if (existing) {
//     existing.quantity += item.quantity || 1;
//     set(cartAtom, [...cart]);
//   } else {
//     set(cartAtom, [...cart, item]);
//   }
// });

// // 3. 削除
// export const removeAtom = atom(null, (get, set, menuId: string) => {
//   const cart = get(cartAtom);
//   set(
//     cartAtom,
//     cart.filter((item) => item.menuId !== menuId)
//   );
// });

// // 4. 編集（数量変更）
// export const editAtom = atom(
//   null,
//   (get, set, { menuId, quantity }: { menuId: string; quantity: number }) => {
//     const cart = get(cartAtom);
//     if (quantity <= 0) {
//       set(
//         cartAtom,
//         cart.filter((item) => item.menuId !== menuId)
//       );
//     } else {
//       set(
//         cartAtom,
//         cart.map((item) =>
//           item.menuId === menuId ? { ...item, quantity } : item
//         )
//       );
//     }
//   }
// );

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface CartItem {
  categoryId: number;
  menuId: number;
  quantity: number;
  statusId: number;
  price: number;
  name: string;
  cartItemId?: string;
  groupId?: string; // 個別のカートアイテムを識別するID
}

export const cartAtom = atomWithStorage<CartItem[]>("cart", []);

export const addAtom = atom(null, (get, set, item: CartItem) => {
  const cart = get(cartAtom);
  // 常に新しいアイテムとして追加（同一商品でも個別管理）
  const newItem = {
    ...item,
    cartItemId: Date.now().toString() + Math.random().toString(36).substr(2, 9), // ユニークID生成
  };
  set(cartAtom, [...cart, newItem]);
});

export const removeAtom = atom(null, (get, set, item: CartItem) => {
  const cart = get(cartAtom);
  // cartItemIdが存在する場合はそれで削除、なければmenuIdで削除
  set(
    cartAtom,
    cart.filter((i) =>
      item.cartItemId
        ? i.cartItemId !== item.cartItemId
        : i.menuId !== item.menuId
    )
  );
});

export const editAtom = atom(
  null,
  (
    get,
    set,
    { cartItemId, quantity }: { cartItemId: string; quantity: number }
  ) => {
    const cart = get(cartAtom);
    if (quantity <= 0) {
      set(
        cartAtom,
        cart.filter((i) => i.cartItemId !== cartItemId)
      );
    } else {
      set(
        cartAtom,
        cart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  }
);

// カートクリア用のatom
export const clearCartAtom = atom(null, (get, set) => {
  set(cartAtom, []);
});

// テーブル情報とパーティーサイズを管理するatom
export interface TableInfo {
  tableId: number;
  tableName: string;
  partySize: number | null;
}

export const tableInfoAtom = atomWithStorage<TableInfo>("tableInfo", {
  tableId: 1,
  tableName: "テーブル 1",
  partySize: null,
});
