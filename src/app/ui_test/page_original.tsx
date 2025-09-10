"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Trash2,
  Edit3,
  X,
  History,
  Users,
  UtensilsCrossed,
  ClipboardList,
  Sparkles,
  Clock,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenus } from "@/hooks/useMenu";
import { useDetail } from "@/hooks/useDetail";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  cartAtom,
  addAtom,
  removeAtom,
  clearCartAtom,
  CartItem,
  tableInfoAtom,
} from "@/atoms/atom";
import { MenuItem, Categories } from "@/types/menu";

const categories: { name: Categories; label: string }[] = [
  { name: "SET", label: "メイン" },
  { name: "SINGLE", label: "単品" },
  { name: "SIDE", label: "サイド" },
  { name: "DRINK_DESERT", label: "ドリンク・デザート" },
];

const UiTestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Categories>("SET");
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [tableInfo] = useAtom(tableInfoAtom);
  const router = useRouter();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCartEditModalOpen, setIsCartEditModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSides, setSelectedSides] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageDirection, setPageDirection] = useState<"left" | "right">("right");
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(
    null
  );
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [isClearCartConfirmModalOpen, setIsClearCartConfirmModalOpen] =
    useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [isOrderProgressModalOpen, setIsOrderProgressModalOpen] =
    useState(false);
  const [orderProgress, setOrderProgress] = useState<any[]>([]);
  const [isStatusNotificationModalOpen, setIsStatusNotificationModalOpen] =
    useState(false);
  const [statusNotification, setStatusNotification] = useState<{
    orderId: number;
    status: string;
    message: string;
    menuNames: string[];
  } | null>(null);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // アレルギー一覧
  const allergyOptions = [
    { id: "GLUTEN", name: "小麦", icon: "🌾" },
    { id: "DAIRY", name: "乳製品", icon: "🥛" },
    { id: "EGG", name: "卵", icon: "🥚" },
    { id: "PEANUT", name: "ピーナッツ", icon: "🥜" },
    { id: "TREE_NUTS", name: "ナッツ", icon: "🌰" },
    { id: "SOY", name: "大豆", icon: "🫘" },
    { id: "FISH", name: "魚", icon: "🐟" },
    { id: "SHELLFISH", name: "甲殻類", icon: "🦐" },
    { id: "SESAME", name: "ごま", icon: "🫰" },
  ];

  // アレルギーチェック関数
  const hasSelectedAllergy = (menu: MenuItem) => {
    if (selectedAllergies.length === 0) return false;
    if (!menu.allergies || menu.allergies.length === 0) return false;

    return menu.allergies.some((allergy: any) =>
      selectedAllergies.includes(allergy.name)
    );
  };

  // アレルギー切り替え関数
  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  const { menus } = useMenus(selectedCategory);
  const { detail } = useDetail(selectedMenuId);

  const [cart] = useAtom(cartAtom);
  const [, addToCart] = useAtom(addAtom);
  const [, removeFromCart] = useAtom(removeAtom);
  const [, clearCart] = useAtom(clearCartAtom);

  // WebSocket接続とイベントリスナー
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("UI_TEST: WebSocket接続開始");
    };

    ws.onmessage = (event) => {
      console.log("UI_TEST: WebSocketメッセージ受信:", event.data);
      try {
        const message = JSON.parse(event.data);
        if (message.type === "order-status-updated") {
          // 注文状態更新通知
          const order = message.order;
          const statusMessages = {
            COOKING: "調理を開始いたします",
            READY: "お料理が完成いたしました！",
            SERVED: "お料理をお持ちいたします",
          };

          const statusName =
            typeof order.status === "string"
              ? order.status
              : order.status?.name;
          const statusMessage =
            statusMessages[statusName as keyof typeof statusMessages];

          if (statusMessage) {
            // 注文に含まれるメニュー名を取得
            const menuNames = order.orderItems?.map((item: any) => 
              item.menu?.name || 'メニュー名不明'
            ) || [];

            setStatusNotification({
              orderId: order.id,
              status: statusName,
              message: statusMessage,
              menuNames: menuNames,
            });
            setIsStatusNotificationModalOpen(true);
          }
        }
      } catch (error) {
        console.log("WebSocketメッセージ解析エラー:", error);
      }
    };

    ws.onclose = () => {
      console.log("UI_TEST: WebSocket接続終了");
    };

    ws.onerror = (error) => {
      console.error("UI_TEST: WebSocketエラー:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleMenuClick = (menuId: number) => {
    setSelectedMenuId(menuId);
    setQuantity(1);
    setSelectedSides([]);
    setIsDetailModalOpen(true);
  };

  const handleCartItemClick = (item: any) => {
    setSelectedCartItem(item);
    setSelectedMenuId(item.menuId);
    setQuantity(item.quantity);

    if (item.associatedSides && item.associatedSides.length > 0) {
      const sideIds = item.associatedSides.map((side: CartItem) => side.menuId);
      setSelectedSides(sideIds);
    } else {
      setSelectedSides([]);
    }

    setIsCartEditModalOpen(true);
  };

  // const handleAddToCart = () => {
  //   if (!detail) return;

  //   const mainCartItem: CartItem = {
  //     categoryId: detail.categoryId,
  //     menuId: detail.id,
  //     quantity: quantity,
  //     statusId: 1,
  //     price: detail.price,
  //     name: detail.name,
  //   };
  //   addToCart(mainCartItem);

  //   selectedSides.forEach((sideId) => {
  //     const side = detail.availableSides?.find((s: any) => s.id === sideId);
  //     if (side) {
  //       const sideCartItem: CartItem = {
  //         categoryId: side.categoryId,
  //         menuId: side.id,
  //         quantity: 1,
  //         statusId: 1,
  //         price: side.price,
  //         name: side.name,
  //       };
  //       addToCart(sideCartItem);
  //     }
  //   });

  //   setIsDetailModalOpen(false);
  //   setIsCompletionModalOpen(true);
  // };

  // const handleUpdateCartItem = () => {
  //   if (!detail || !selectedCartItem) return;

  //   removeFromCart(selectedCartItem);

  //   if ((selectedCartItem as any).associatedSides) {
  //     (selectedCartItem as any).associatedSides.forEach((side: CartItem) => {
  //       removeFromCart(side);
  //     });
  //   }

  //   const updatedMainCartItem: CartItem = {
  //     categoryId: detail.categoryId,
  //     menuId: detail.id,
  //     quantity: quantity,
  //     statusId: 1,
  //     price: detail.price,
  //     name: detail.name,
  //   };
  //   addToCart(updatedMainCartItem);

  //   selectedSides.forEach((sideId) => {
  //     const side = detail.availableSides?.find((s: any) => s.id === sideId);
  //     if (side) {
  //       const sideCartItem: CartItem = {
  //         categoryId: side.categoryId,
  //         menuId: side.id,
  //         quantity: 1,
  //         statusId: 1,
  //         price: side.price,
  //         name: side.name,
  //       };
  //       addToCart(sideCartItem);
  //     }
  //   });

  //   setIsCartEditModalOpen(false);
  //   setIsCompletionModalOpen(true);
  // };

  // handleAddToCart の修正版
  const handleAddToCart = () => {
    if (!detail) return;

    // グループIDを生成（セットとサイドを関連付けるため）
    const groupId = `group_${Date.now()}_${Math.random()}`;

    const mainCartItem: CartItem = {
      categoryId: detail.categoryId,
      menuId: detail.id,
      quantity: quantity,
      statusId: 1,
      price: detail.price,
      name: detail.name,
      // グループIDを設定（サイドメニューがある場合のみ）
      ...(selectedSides.length > 0 && { groupId }),
    };
    addToCart(mainCartItem);

    // サイドメニューも同じグループIDで追加
    selectedSides.forEach((sideId) => {
      const side = detail.availableSides?.find((s: any) => s.id === sideId);
      if (side) {
        const sideCartItem: CartItem = {
          categoryId: side.categoryId,
          menuId: side.id,
          quantity: 1,
          statusId: 1,
          price: side.price,
          name: side.name,
          groupId: groupId, // 同じグループID
        };
        addToCart(sideCartItem);
      }
    });

    setIsDetailModalOpen(false);
    setIsCompletionModalOpen(true);
  };

  // handleUpdateCartItem の修正版
  const handleUpdateCartItem = () => {
    if (!detail || !selectedCartItem) return;

    // 古いアイテムとその関連サイドを削除
    removeFromCart(selectedCartItem);
    if ((selectedCartItem as any).associatedSides) {
      (selectedCartItem as any).associatedSides.forEach((side: CartItem) => {
        removeFromCart(side);
      });
    }

    // 新しいグループIDを生成
    const groupId = `group_${Date.now()}_${Math.random()}`;

    const updatedMainCartItem: CartItem = {
      categoryId: detail.categoryId,
      menuId: detail.id,
      quantity: quantity,
      statusId: 1,
      price: detail.price,
      name: detail.name,
      ...(selectedSides.length > 0 && { groupId }),
    };
    addToCart(updatedMainCartItem);

    selectedSides.forEach((sideId) => {
      const side = detail.availableSides?.find((s: any) => s.id === sideId);
      if (side) {
        const sideCartItem: CartItem = {
          categoryId: side.categoryId,
          menuId: side.id,
          quantity: 1,
          statusId: 1,
          price: side.price,
          name: side.name,
          groupId: groupId,
        };
        addToCart(sideCartItem);
      }
    });

    setIsCartEditModalOpen(false);
    setIsCompletionModalOpen(true);
  };

  const getCartDisplayItems = () => {
    if (cart.length === 0) return [];

    const groupedItems = new Map<string, CartItem[]>();
    const ungroupedItems: CartItem[] = [];

    // グループ化とグループ化されていないアイテムに分ける
    cart.forEach((item) => {
      if ((item as any).groupId) {
        const groupId = (item as any).groupId;
        if (!groupedItems.has(groupId)) {
          groupedItems.set(groupId, []);
        }
        groupedItems.get(groupId)!.push(item);
      } else {
        ungroupedItems.push(item);
      }
    });

    const result: any[] = [];

    // グループ化されたアイテムを処理（サイドメニュー付き商品）
    groupedItems.forEach((items) => {
      // カテゴリIDでソート
      const sortedItems = [...items].sort(
        (a, b) => a.categoryId - b.categoryId
      );

      // メインアイテム: SINGLE(1) または SET(3)
      const mainItem = sortedItems.find((item) => item.categoryId === 3);

      if (mainItem) {
        // サイドアイテム: SIDE(2) または DRINK_DESERT(4)
        const sideItems = sortedItems.filter((item) => item.categoryId === 2);

        result.push({
          ...mainItem,
          associatedSides: sideItems,
        });
      } else {
        // メインアイテムがない場合は個別表示
        items.forEach((item) => result.push({ ...item, associatedSides: [] }));
      }
    });

    // グループ化されていないアイテムを処理（単品商品の数量まとめ）
    const itemMap = new Map<number, CartItem>();

    ungroupedItems.forEach((item) => {
      if (itemMap.has(item.menuId)) {
        // 同じmenuIdのアイテムがある場合は数量を加算
        const existingItem = itemMap.get(item.menuId)!;
        existingItem.quantity += item.quantity;
      } else {
        // 新しいアイテムとして追加
        itemMap.set(item.menuId, { ...item });
      }
    });

    // まとめられたアイテムを結果に追加
    itemMap.forEach((item) => {
      result.push({ ...item, associatedSides: [] });
    });

    return result;
  };
  const handleRemoveCartItem = () => {
    if (!selectedCartItem) return;

    removeFromCart(selectedCartItem);

    if ((selectedCartItem as any).associatedSides) {
      (selectedCartItem as any).associatedSides.forEach((side: CartItem) => {
        removeFromCart(side);
      });
    }

    setIsCartEditModalOpen(false);
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    removeFromCart(itemToDelete);

    if ((itemToDelete as any).associatedSides) {
      (itemToDelete as any).associatedSides.forEach((side: CartItem) => {
        removeFromCart(side);
      });
    }

    setIsDeleteConfirmModalOpen(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmModalOpen(false);
    setItemToDelete(null);
  };

  const handleClearCartClick = () => {
    setIsClearCartConfirmModalOpen(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setIsClearCartConfirmModalOpen(false);
  };

  const cancelClearCart = () => {
    setIsClearCartConfirmModalOpen(false);
  };

  const handleOrderConfirm = async () => {
    if (cart.length === 0) return;

    setIsOrderProcessing(true);

    try {
      // カートデータを注文形式に変換
      const orderItems = cart.map((item) => ({
        menuId: item.menuId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        categoryId: item.categoryId,
        statusId: item.statusId,
      }));

      const orderData = {
        tableId: 1,
        orderItems: orderItems,
      };

      console.log("Sending order data:", orderData);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`注文の送信に失敗しました: ${response.status}`);
      }

      const result = await response.json();

      console.log("Order response:", result);

      // 注文番号を設定（APIレスポンスから取得、なければ生成）
      const generatedOrderNumber = result.orderNumber || `ORDER-${Date.now()}`;
      setOrderNumber(generatedOrderNumber);

      // カートをクリア
      clearCart();

      // 成功モーダルを表示
      setIsOrderSuccessModalOpen(true);
    } catch (error) {
      console.error("注文エラー:", error);
      alert("注文の送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsOrderProcessing(false);
    }
  };

  // 注文進捗を取得する関数
  const handleOrderProgressClick = async () => {
    try {
      console.log("注文進捗を取得中...");
      const tableId = 1; // テーブルIDは固定（実際は動的に取得）

      const response = await fetch(`/api/orders/table/${tableId}`);

      if (!response.ok) {
        throw new Error(`注文進捗の取得に失敗しました: ${response.status}`);
      }

      const orders = await response.json();
      console.log("取得した注文進捗:", orders);

      setOrderProgress(orders);
      setIsOrderProgressModalOpen(true);
    } catch (error) {
      console.error("注文進捗取得エラー:", error);
      alert("注文進捗の取得に失敗しました。もう一度お試しください。");
    }
  };

  // 注文履歴を取得する関数
  const handleOrderHistoryClick = async () => {
    setHistoryLoading(true);
    try {
      console.log("注文履歴を取得中...");
      const tableId = 1; // テーブルIDは固定（実際は動的に取得）

      const response = await fetch(
        `/api/orders/table/${tableId}?includeServed=true`
      );

      if (!response.ok) {
        throw new Error(`注文履歴の取得に失敗しました: ${response.status}`);
      }

      const orders = await response.json();
      console.log("取得した注文履歴:", orders);

      setOrderHistory(orders);
      setIsOrderHistoryModalOpen(true);
    } catch (error) {
      console.error("注文履歴取得エラー:", error);
      alert("注文履歴の取得に失敗しました。もう一度お試しください。");
    } finally {
      setHistoryLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateModalTotal = () => {
    if (!detail) return 0;
    let total = detail.price * quantity;
    selectedSides.forEach((sideId) => {
      const side = detail.availableSides?.find((s: any) => s.id === sideId);
      if (side) {
        total += side.price;
      }
    });
    return total;
  };

  const toggleSideSelection = (sideId: number) => {
    setSelectedSides((prev) => {
      if (prev.includes(sideId)) {
        return prev.filter((id) => id !== sideId);
      } else {
        return [...prev, sideId];
      }
    });
  };

  const getAllergyDisplayName = (allergyName: string) => {
    const displayNames: { [key: string]: string } = {
      GLUTEN: "小麦",
      DAIRY: "乳製品",
      EGG: "卵",
      PEANUT: "ピーナッツ",
      TREE_NUTS: "ナッツ",
      SOY: "大豆",
      FISH: "魚",
      SHELLFISH: "甲殻類",
      SESAME: "ごま",
    };
    console.log(displayNames[allergyName]);
    return displayNames[allergyName] || allergyName;
  };

  const itemsPerPage = 4;
  const totalPages = menus ? Math.ceil(menus.length / itemsPerPage) : 0;
  const currentMenus = menus
    ? menus.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setPageDirection("right");
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setPageDirection("left");
      setCurrentPage(currentPage - 1);
    }
  };

  const getModalBreakdown = () => {
    if (!detail) return [];
    const items = [];
    items.push({ name: detail.name, price: detail.price, quantity });
    selectedSides.forEach((sideId) => {
      const side = detail.availableSides?.find((s: any) => s.id === sideId);
      if (side) {
        items.push({ name: side.name, price: side.price, quantity: 1 });
      }
    });
    return items;
  };

  // const getCartDisplayItems = () => {
  //   if (cart.length === 0) return [];

  //   const result = [];
  //   const processedIndices = new Set<number>();

  //   for (let i = 0; i < cart.length; i++) {
  //     if (processedIndices.has(i)) continue;

  //     const item = cart[i];
  //     const associatedSides: CartItem[] = [];

  //     const isMainItemById = item.categoryId === 1 || item.categoryId === 2;
  //     const isMainItemByName =
  //       /定食|セット|ハンバーグ|チキン|ステーキ|パスタ/.test(item.name);
  //     const isMainItem =
  //       isMainItemById || (item.categoryId && isMainItemByName);

  //     if (isMainItem) {
  //       for (let j = i + 1; j < cart.length; j++) {
  //         if (processedIndices.has(j)) continue;

  //         const nextItem = cart[j];
  //         const isSideById =
  //           nextItem.categoryId === 3 || nextItem.categoryId === 4;
  //         const isSideByName = /ドリンク|サラダ|サイド|デザート|コーヒー/.test(
  //           nextItem.name
  //         );
  //         const isSideItem = isSideById || isSideByName;

  //         if (isSideItem) {
  //           associatedSides.push(nextItem);
  //           processedIndices.add(j);
  //         } else if (
  //           nextItem.categoryId === 1 ||
  //           nextItem.categoryId === 2 ||
  //           isMainItemByName
  //         ) {
  //           break;
  //         }
  //       }

  //       const displayItem = { ...item, associatedSides };
  //       result.push(displayItem);
  //       processedIndices.add(i);
  //     } else {
  //       const displayItem = { ...item, associatedSides: [] };
  //       result.push(displayItem);
  //       processedIndices.add(i);
  //     }
  //   }

  //   return result;
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
        style={{
          width: "min(1280px, 95vw)",
          height: "min(800px, 80vh)",
        }}
      >
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
            >
              ホーム
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700"
              onClick={handleOrderHistoryClick}
            >
              注文履歴
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700"
            >
              ヘルプ
            </Button>
          </div>
        </nav>

        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? "default" : "ghost"
                }
                size="sm"
                className={
                  selectedCategory === category.name
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : ""
                }
                onClick={() => {
                  setSelectedCategory(category.name);
                  setCurrentPage(0);
                  setPageDirection("right");
                }}
              >
                {category.label}
              </Button>
            ))}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAllergyModalOpen(true)}
              className={
                selectedAllergies.length > 0
                  ? "border-orange-300 bg-orange-50"
                  : ""
              }
            >
              アレルギー{" "}
              {selectedAllergies.length > 0 && `(${selectedAllergies.length})`}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              店員を呼ぶ
            </Button>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">
          <main className="flex-1 p-10 overflow-y-auto">
            <div className="flex items-center justify-between gap-4 h-full">
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-md shrink-0"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
              <AnimatePresence mode="wait">
                {currentMenus && currentMenus.length > 0 ? (
                  <motion.div
                    key={`${selectedCategory}-${currentPage}`}
                    initial={{
                      opacity: 0,
                      x: pageDirection === "right" ? 300 : -300,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: pageDirection === "left" ? -300 : 300,
                    }}
                    transition={{ duration: 0.3 }}
                    className="col-span-2 grid grid-cols-2 gap-6"
                  >
                    {currentMenus.map((menu: MenuItem) => {
                      const isDisabled = hasSelectedAllergy(menu);
                      return (
                        <div
                          key={menu.id}
                          className={`bg-white border rounded-lg p-4 shadow-sm transition-shadow flex ${
                            isDisabled
                              ? "opacity-50 cursor-not-allowed border-red-200"
                              : "hover:shadow-md cursor-pointer border-gray-100"
                          }`}
                          onClick={() =>
                            !isDisabled && handleMenuClick(menu.id)
                          }
                        >
                          <div className="w-1/2 flex items-center justify-center relative">
                            {isDisabled && (
                              <div className="absolute inset-0 bg-red-100 bg-opacity-75 flex items-center justify-center rounded">
                                <span className="text-red-600 text-xs font-medium">
                                  アレルギー対象
                                </span>
                              </div>
                            )}
                            {menu.image && menu.image.startsWith("http") ? (
                              <img
                                src={menu.image}
                                alt={menu.name}
                                className="w-full h-24 object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const nextElement =
                                    target.nextElementSibling as HTMLElement;
                                  if (nextElement)
                                    nextElement.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className="w-full h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500 text-center px-2"
                              style={{
                                display:
                                  menu.image && menu.image.startsWith("http")
                                    ? "none"
                                    : "flex",
                              }}
                            >
                              {menu.image || "No Image"}
                            </div>
                          </div>
                          <div className="w-1/2 flex flex-col justify-center space-y-2 pl-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-bold text-lg">{menu.name}</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {menu.description || "美味しい料理です"}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                  {
                                    categories.find(
                                      (c) => c.name === menu.category
                                    )?.label
                                  }
                                </Badge>
                              </div>
                              <p className="text-red-600 font-bold text-xl">
                                ¥{menu.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <div className="col-span-2 flex items-center justify-center h-64">
                    <p className="text-gray-500">メニューを読み込み中...</p>
                  </div>
                )}
              </AnimatePresence>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-md shrink-0"
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </main>

          <aside className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <h3 className="font-bold text-lg">ご注文詳細</h3>
              {cart.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleClearCartClick}
                  title="カートをクリア"
                >
                  <X className="w-4 h-4 mr-1" />
                  クリア
                </Button>
              )}
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {cart.length > 0 ? (
                  getCartDisplayItems().map((item: any, index: number) => (
                    <div
                      key={`item-${item.cartItemId || item.menuId}-${index}`}
                      className="bg-white rounded border border-gray-200 p-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="font-medium text-sm flex items-center">
                            {item.name}
                            {item.quantity > 1 && (
                              <span className="ml-2 text-xs text-gray-500">
                                ×{item.quantity}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            ¥{item.price.toLocaleString()}
                          </div>

                          {item.associatedSides &&
                            item.associatedSides.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <div className="text-xs text-gray-500 mb-1">
                                  サイドメニュー:
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {item.associatedSides.map((side: any) => (
                                    <span
                                      key={side.menuId}
                                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                    >
                                      {side.name} (¥
                                      {side.price.toLocaleString()})
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleCartItemClick(item)}
                            title="編集"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteClick(item)}
                            title="削除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">カートは空です</p>
                    <p className="text-sm">カートに商品を追加してください</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>合計</span>
                <span>¥{getTotalPrice().toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white mb-3"
                disabled={cart.length === 0 || isOrderProcessing}
                onClick={handleOrderConfirm}
              >
                {isOrderProcessing
                  ? "注文処理中..."
                  : `注文確定 (${getTotalItems()}品)`}
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/account")}
                >
                  決済
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleOrderProgressClick}
                >
                  注文状況
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleOrderHistoryClick}
                >
                  <History className="w-4 h-4 mr-1" />
                  履歴
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Allergy Selection Modal */}
        <Dialog open={isAllergyModalOpen} onOpenChange={setIsAllergyModalOpen}>
          <DialogContent className="max-w-lg bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                アレルギー設定
              </DialogTitle>
              <DialogDescription>
                除外したいアレルギーを選択してください
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {allergyOptions.map((allergy) => (
                <div
                  key={allergy.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
                    selectedAllergies.includes(allergy.id)
                      ? "border-orange-300 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleAllergy(allergy.id)}
                >
                  <div className="flex flex-col items-center space-y-2 relative">
                    <span className="text-2xl">{allergy.icon}</span>
                    <span className="font-medium text-sm">{allergy.name}</span>
                    {selectedAllergies.includes(allergy.id) && (
                      <Check className="w-4 h-4 text-orange-600 absolute -top-1 -right-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedAllergies([])}
                disabled={selectedAllergies.length === 0}
              >
                すべて解除
              </Button>
              <Button
                onClick={() => setIsAllergyModalOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                適用
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Menu Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="!max-w-[1000px] !max-h-[800px] overflow-y-auto bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            {detail && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {detail ? detail?.name : "loading"}
                  </DialogTitle>
                  <DialogDescription>
                    {detail.description || "美味しい料理です"}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex gap-6 mt-6 max-w-[1000px] max-h-[700px]">
                  {/* Left side - Image and basic info */}
                  <div className="flex-1">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      {detail.image ? (
                        <div className="text-8xl">{detail.image}</div>
                      ) : (
                        <UtensilsCrossed className="w-24 h-24 text-gray-400" />
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 items-start ">
                        <div className="flex flex-col mr-5">
                          <h3 className="font-semibold mb-2">カテゴリー</h3>
                          <Badge variant="outline">
                            {
                              categories.find(
                                (c) => c.name === detail.category?.name
                              )?.label
                            }
                          </Badge>
                        </div>

                        {detail.allergies && detail.allergies.length > 0 && (
                          <div className="flex flex-col">
                            <h3 className="font-semibold mb-2">
                              アレルギー情報
                            </h3>

                            <div className="flex flex-wrap gap-2">
                              {detail.allergies.map((allergy: any) => (
                                <Badge
                                  key={allergy.id}
                                  className="text-xs border border-black"
                                >
                                  {getAllergyDisplayName(allergy.name)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-2xl font-bold text-red-600">
                        ¥{detail.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Side menus and quantity */}
                  <div className="flex-1">
                    {detail.availableSides &&
                      detail.availableSides.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-semibold mb-4">サイドメニュー</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {detail.availableSides.map((side: any) => (
                              <div
                                key={side.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                  selectedSides.includes(side.id)
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => toggleSideSelection(side.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium">
                                      {side.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      ¥{side.price.toLocaleString()}
                                    </div>
                                  </div>
                                  {selectedSides.includes(side.id) && (
                                    <Check className="w-5 h-5 text-red-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="mb-6">
                      <h3 className="font-semibold mb-4">数量</h3>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12"
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <span className="text-2xl font-semibold w-12 text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-12"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2 mb-3">
                        <h3 className="font-semibold text-sm text-gray-600">
                          明細
                        </h3>
                        {getModalBreakdown().map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>
                              ¥{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>合計</span>
                          <span className="text-red-600">
                            ¥{calculateModalTotal().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                    >
                      カートに追加
                    </Button>
                  </div>
                </div>
              </>
            )}
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Cart Edit Modal */}
        <Dialog
          open={isCartEditModalOpen}
          onOpenChange={setIsCartEditModalOpen}
        >
          <DialogContent className="!max-w-[1000px] !max-h-[800px] overflow-y-auto bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            {detail && selectedCartItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {detail.name}を編集
                  </DialogTitle>
                  <DialogDescription>
                    {detail.description || "美味しい料理です"}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex gap-6 mt-6 max-w-[1000px] max-h-[700px]">
                  {/* Left side - Image and basic info */}
                  <div className="flex-1">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      {detail.image ? (
                        <div className="text-8xl">{detail.image}</div>
                      ) : (
                        <UtensilsCrossed className="w-24 h-24 text-gray-400" />
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 items-start">
                        <div className="flex flex-col">
                          <h3 className="font-semibold mb-2">カテゴリー</h3>
                          <Badge variant="outline">
                            {
                              categories.find(
                                (c) => c.name === detail.category?.name
                              )?.label
                            }
                          </Badge>
                        </div>

                        {detail.allergies && detail.allergies.length > 0 && (
                          <div className="flex flex-col">
                            <h3 className="font-semibold mb-2">
                              アレルギー情報
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {detail.allergies.map((allergy: any) => (
                                <Badge
                                  key={allergy.id}
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  {getAllergyDisplayName(allergy.name)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-2xl font-bold text-red-600">
                        ¥{detail.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Side menus and quantity */}
                  <div className="flex-1">
                    {detail.availableSides &&
                      detail.availableSides.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-semibold mb-4">サイドメニュー</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {detail.availableSides.map((side: any) => (
                              <div
                                key={side.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                  selectedSides.includes(side.id)
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => toggleSideSelection(side.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium">
                                      {side.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      ¥{side.price.toLocaleString()}
                                    </div>
                                  </div>
                                  {selectedSides.includes(side.id) && (
                                    <Check className="w-5 h-5 text-red-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="mb-6">
                      <h3 className="font-semibold mb-4">数量</h3>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12"
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <span className="text-2xl font-semibold w-12 text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-12"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2 mb-3">
                        <h3 className="font-semibold text-sm text-gray-600">
                          明細
                        </h3>
                        {getModalBreakdown().map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>
                              ¥{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>合計</span>
                          <span className="text-red-600">
                            ¥{calculateModalTotal().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleUpdateCartItem}
                        className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                      >
                        変更を保存
                      </Button>

                      <Button
                        onClick={handleRemoveCartItem}
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-12 text-lg"
                      >
                        <Trash2 className="w-5 h-5 mr-2" />
                        カートから削除
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog
          open={isDeleteConfirmModalOpen}
          onOpenChange={setIsDeleteConfirmModalOpen}
        >
          <DialogContent className="max-w-md bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-red-600">
                削除確認
              </DialogTitle>
              <DialogDescription className="text-center mt-4">
                {itemToDelete && (
                  <>
                    <strong>{itemToDelete.name}</strong>
                    をカートから削除しますか？
                    <br />
                    この操作は取り消せません。
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={cancelDelete} variant="outline" className="px-6">
                キャンセル
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6"
              >
                削除する
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Clear Cart Confirmation Modal */}
        <Dialog
          open={isClearCartConfirmModalOpen}
          onOpenChange={setIsClearCartConfirmModalOpen}
        >
          <DialogContent className="max-w-md bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-red-600">
                カートをクリア
              </DialogTitle>
              <DialogDescription className="text-center mt-4">
                カート内の全ての商品を削除しますか？
                <br />
                この操作は取り消せません。
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={cancelClearCart}
                variant="outline"
                className="px-6"
              >
                キャンセル
              </Button>
              <Button
                onClick={confirmClearCart}
                className="bg-red-600 hover:bg-red-700 text-white px-6"
              >
                クリアする
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Order Success Modal */}
        <Dialog
          open={isOrderSuccessModalOpen}
          onOpenChange={setIsOrderSuccessModalOpen}
        >
          <DialogContent className="max-w-md bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-green-600">
                注文完了！
              </DialogTitle>
              <DialogDescription className="text-center mt-4">
                ご注文を承りました。
                <br />
                <strong className="text-lg text-gray-800">
                  注文番号: {orderNumber}
                </strong>
                <br />
                <br />
                調理が完了するまでしばらくお待ちください。
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setIsOrderSuccessModalOpen(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                OK
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Completion Modal */}
        <Dialog
          open={isCompletionModalOpen}
          onOpenChange={setIsCompletionModalOpen}
        >
          <DialogContent className="max-w-md bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-green-600">
                追加完了！
              </DialogTitle>
              <DialogDescription className="text-center mt-4">
                メニューをカートに追加しました
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setIsCompletionModalOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                OK
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Order Progress Modal */}
        <Dialog
          open={isOrderProgressModalOpen}
          onOpenChange={setIsOrderProgressModalOpen}
        >
          <DialogContent className="!max-w-6xl bg-white max-h-[85vh] overflow-y-auto border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5" />
                注文状況確認
              </DialogTitle>
              <DialogDescription>
                ご注文いただいた商品の調理状況を確認できます。完成したお料理はお呼びいたします！
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              {orderProgress.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  進行中の注文はありません
                </div>
              ) : (
                <div className="flex gap-6 max-h-[60vh]">
                  {/* 確認済み注文 */}
                  <div className="flex-1 bg-blue-50 rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5" />
                        確認済み
                      </h3>
                    </div>
                    <div className="p-4 overflow-y-auto max-h-[50vh]">
                      <div className="space-y-3">
                        {(() => {
                          const confirmedOrders = orderProgress.filter(
                            (order: any) => {
                              const statusName =
                                typeof order.status === "string"
                                  ? order.status
                                  : order.status?.name;
                              return statusName === "CONFIRM";
                            }
                          );

                          return confirmedOrders.length > 0 ? (
                            confirmedOrders.map((order: any) => (
                              <div
                                key={order.id}
                                className="border rounded-lg p-4 bg-gray-50"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h3 className="font-bold">
                                      注文番号: ORDER-{order.id}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  <Badge className="bg-blue-100 text-blue-800">
                                    確認済み
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  {order.orderItems?.map((item: any) => (
                                    <div
                                      key={item.id}
                                      className="bg-white rounded-lg p-2 border"
                                    >
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                          <ClipboardList className="w-4 h-4" />
                                          <span className="font-medium">
                                            {item.menu?.name}
                                          </span>
                                          <span className="text-gray-600">
                                            ×{item.quantity}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 pt-2 border-t">
                                  <div className="flex justify-between font-semibold">
                                    <span>合計</span>
                                    <span>
                                      ¥{order.total?.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              確認済みの注文はありません
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* 調理中注文 */}
                  <div className="flex-1 bg-orange-50 rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-orange-200">
                      <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        調理中
                      </h3>
                    </div>
                    <div className="p-4 overflow-y-auto max-h-[50vh]">
                      <div className="space-y-3">
                        {(() => {
                          const cookingOrders = orderProgress.filter(
                            (order: any) => {
                              const statusName =
                                typeof order.status === "string"
                                  ? order.status
                                  : order.status?.name;
                              return statusName === "COOKING";
                            }
                          );

                          return cookingOrders.length > 0 ? (
                            cookingOrders.map((order: any) => (
                              <div
                                key={order.id}
                                className="border rounded-lg p-4 bg-gray-50"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h3 className="font-bold">
                                      注文番号: ORDER-{order.id}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  <Badge className="bg-orange-100 text-orange-800">
                                    調理中
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  {order.orderItems?.map((item: any) => (
                                    <div
                                      key={item.id}
                                      className="bg-white rounded-lg p-2 border"
                                    >
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                          <Clock className="w-4 h-4" />
                                          <span className="font-medium">
                                            {item.menu?.name}
                                          </span>
                                          <span className="text-gray-600">
                                            ×{item.quantity}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 pt-2 border-t">
                                  <div className="flex justify-between font-semibold">
                                    <span>合計</span>
                                    <span>
                                      ¥{order.total?.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              調理中の注文はありません
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* 完成済み注文 */}
                  <div className="flex-1 bg-green-50 rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-green-200">
                      <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        完成済み
                      </h3>
                    </div>
                    <div className="p-4 overflow-y-auto max-h-[50vh]">
                      <div className="space-y-3">
                        {(() => {
                          const readyOrders = orderProgress.filter(
                            (order: any) => {
                              const statusName =
                                typeof order.status === "string"
                                  ? order.status
                                  : order.status?.name;
                              return statusName === "READY";
                            }
                          );

                          return readyOrders.length > 0 ? (
                            readyOrders.map((order: any) => (
                              <div
                                key={order.id}
                                className="border rounded-lg p-4 bg-gray-50"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h3 className="font-bold">
                                      注文番号: ORDER-{order.id}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  <Badge className="bg-green-100 text-green-800">
                                    完成済み
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  {order.orderItems?.map((item: any) => (
                                    <div
                                      key={item.id}
                                      className="bg-white rounded-lg p-2 border"
                                    >
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                          <CheckCircle className="w-4 h-4" />
                                          <span className="font-medium">
                                            {item.menu?.name}
                                          </span>
                                          <span className="text-gray-600">
                                            ×{item.quantity}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 pt-2 border-t">
                                  <div className="flex justify-between font-semibold">
                                    <span>合計</span>
                                    <span>
                                      ¥{order.total?.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              完成済みの注文はありません
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setIsOrderProgressModalOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                閉じる
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Status Notification Modal */}
        <Dialog
          open={isStatusNotificationModalOpen}
          onOpenChange={setIsStatusNotificationModalOpen}
        >
          <DialogContent className="max-w-md bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                注文状況が更新されました
              </DialogTitle>
            </DialogHeader>

            {statusNotification && (
              <div className="text-center mt-4">
                <div className="mb-4 flex justify-center">
                  {statusNotification.status === "COOKING" && (
                    <Clock className="w-16 h-16 text-orange-500" />
                  )}
                  {statusNotification.status === "READY" && (
                    <UtensilsCrossed className="w-16 h-16 text-green-500" />
                  )}
                  {statusNotification.status === "SERVED" && (
                    <Sparkles className="w-16 h-16 text-green-600" />
                  )}
                </div>
                <div className="mb-2">
                  {statusNotification.menuNames && statusNotification.menuNames.length > 0 ? (
                    <div>
                      <p className="text-lg font-semibold mb-1">更新されたメニュー:</p>
                      <div className="space-y-1">
                        {statusNotification.menuNames.map((menuName, index) => (
                          <p key={index} className="text-base bg-gray-100 px-3 py-1 rounded-lg">
                            {menuName}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold">
                      注文番号: ORDER-{statusNotification.orderId}
                    </p>
                  )}
                </div>
                <p className="text-gray-700">{statusNotification.message}</p>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setIsStatusNotificationModalOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-8"
              >
                OK
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Order History Modal */}
        <Dialog
          open={isOrderHistoryModalOpen}
          onOpenChange={setIsOrderHistoryModalOpen}
        >
          <DialogContent className="!max-w-6xl !max-h-[85vh] bg-white border-gray-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                注文履歴
              </DialogTitle>
            </DialogHeader>

            {historyLoading ? (
              <div className="flex justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                  <p>注文履歴を読み込み中...</p>
                </div>
              </div>
            ) : (
              <div className={orderHistory.length > 0 ? "flex gap-6 h-full max-h-[60vh]" : ""}>
                {orderHistory.length > 0 ? (
                  <>
                    {/* 配膳前の注文 */}
                    <div className="flex-1 bg-orange-50 rounded-lg border border-gray-200">
                      <div className="p-4 border-b border-orange-200">
                        <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
                          <UtensilsCrossed className="w-5 h-5" />
                          配膳前の注文
                        </h3>
                      </div>
                      <div className="p-4 overflow-y-auto max-h-[50vh]">
                        {(() => {
                          const unservedOrders = orderHistory.filter(
                            (order) => {
                              const statusName =
                                typeof order.status === "string"
                                  ? order.status
                                  : order.status?.name;
                              return statusName !== "SERVED";
                            }
                          );

                          return unservedOrders.length > 0 ? (
                            <div className="grid gap-3">
                              {unservedOrders.map((order) => (
                                <div
                                  key={order.id}
                                  className="border rounded-lg p-4 bg-gray-50"
                                >
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                      <Badge variant="outline">
                                        注文#{order.id}
                                      </Badge>
                                      <Badge
                                        className={
                                          (typeof order.status === "string"
                                            ? order.status
                                            : order.status?.name) === "CONFIRM"
                                            ? "bg-blue-100 text-blue-800"
                                            : (typeof order.status === "string"
                                                ? order.status
                                                : order.status?.name) ===
                                              "COOKING"
                                            ? "bg-orange-100 text-orange-800"
                                            : (typeof order.status === "string"
                                                ? order.status
                                                : order.status?.name) ===
                                              "READY"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                        }
                                      >
                                        {(typeof order.status === "string"
                                          ? order.status
                                          : order.status?.name) === "CONFIRM"
                                          ? "確認済み"
                                          : (typeof order.status === "string"
                                              ? order.status
                                              : order.status?.name) ===
                                            "COOKING"
                                          ? "調理中"
                                          : "完成済み"}
                                      </Badge>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {new Date(order.createdAt).toLocaleString(
                                        "ja-JP"
                                      )}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    {order.orderItems?.map((item: any) => (
                                      <div
                                        key={item.id}
                                        className="flex justify-between items-center bg-white p-2 rounded border"
                                      >
                                        <div>
                                          <span className="font-medium">
                                            {item.menu?.name ||
                                              "メニュー名不明"}
                                          </span>
                                          <Badge
                                            variant="secondary"
                                            className="ml-2"
                                          >
                                            ×{item.quantity}
                                          </Badge>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-black font-semibold">
                                            ¥
                                            {(
                                              item.price * item.quantity
                                            ).toLocaleString()}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between items-center pt-2 mt-2 border-t">
                                    <span className="font-semibold">合計</span>
                                    <span className="text-lg font-bold text-black">
                                      ¥{order.total?.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              配膳前の注文はありません
                            </p>
                          );
                        })()}
                      </div>
                    </div>

                    {/* 配膳済みの注文 */}
                    <div className="flex-1 bg-green-50 rounded-lg border border-gray-200">
                      <div className="p-4 border-b border-green-200">
                        <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          配膳済みの注文
                        </h3>
                      </div>
                      <div className="p-4 overflow-y-auto max-h-[50vh]">
                        {(() => {
                          const servedOrders = orderHistory.filter((order) => {
                            const statusName =
                              typeof order.status === "string"
                                ? order.status
                                : order.status?.name;
                            return statusName === "SERVED";
                          });

                          return servedOrders.length > 0 ? (
                            <div className="grid gap-3">
                              {servedOrders.map((order) => (
                                <div
                                  key={order.id}
                                  className="border rounded-lg p-4 bg-gray-50"
                                >
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                      <Badge variant="outline">
                                        注文#{order.id}
                                      </Badge>
                                      <Badge className="bg-gray-100 text-gray-800">
                                        配膳済み
                                      </Badge>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {new Date(order.createdAt).toLocaleString(
                                        "ja-JP"
                                      )}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    {order.orderItems?.map((item: any) => (
                                      <div
                                        key={item.id}
                                        className="flex justify-between items-center bg-white p-2 rounded border"
                                      >
                                        <div>
                                          <span className="font-medium">
                                            {item.menu?.name ||
                                              "メニュー名不明"}
                                          </span>
                                          <Badge
                                            variant="secondary"
                                            className="ml-2"
                                          >
                                            ×{item.quantity}
                                          </Badge>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-black font-semibold">
                                            ¥
                                            {(
                                              item.price * item.quantity
                                            ).toLocaleString()}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between items-center pt-2 mt-2 border-t">
                                    <span className="font-semibold">合計</span>
                                    <span className="text-lg font-bold text-black">
                                      ¥{order.total?.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              配膳済みの注文はありません
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
                    <div className="text-center">
                      <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">注文履歴がありません</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setIsOrderHistoryModalOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-8"
              >
                閉じる
              </Button>
            </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UiTestPage;
