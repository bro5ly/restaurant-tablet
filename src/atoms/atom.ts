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

interface CartItem {
  categoryId: number;
  menuId: number;
  quantity: number;
  statusId: number;
  price: number;
}

export const cartAtom = atomWithStorage<CartItem[]>("cart", []);

export const addAtom = atom(null, (get, set, item: CartItem) => {
  const cart = get(cartAtom);
  const existing = cart.find((i) => i.menuId === item.menuId);
  if (existing) {
    existing.quantity += item.quantity || 1;
    set(cartAtom, [...cart]);
  } else {
    set(cartAtom, [...cart, item]);
  }
});

export const removeAtom = atom(null, (get, set, item: CartItem) => {
  const cart = get(cartAtom);
  set(
    cartAtom,
    cart.filter((i) => i.menuId !== item.menuId)
  );
});

export const editAtom = atom(
  null,
  (get, set, { menuId, quantity }: { menuId: number; quantity: number }) => {
    const cart = get(cartAtom);
    const existing = cart.find((i) => i.menuId === menuId);
    if (quantity <= 0) {
      set(
        cartAtom,
        cart.filter((i) => i.menuId !== menuId)
      );
    } else {
      if (existing) {
        existing.quantity += quantity;
      }
      set(
        cartAtom,
        cart.map((item) =>
          item.menuId === menuId ? { ...item, quantity } : item
        )
      );
    }
  }
);
