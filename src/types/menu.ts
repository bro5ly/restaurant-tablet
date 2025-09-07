type Categories = "SET" | "SINGLE" | "SIDE" | "DRINK_DESERT";
type Status = "PENDING" | "CONFIRM" | "COOKING" | "READY" | "SERVED";
type AllergyType =
  | "GLUTEN"
  | "DAIRY"
  | "EGG"
  | "PEANUT"
  | "TREE_NUTS"
  | "SOY"
  | "FISH"
  | "SHELLFISH"
  | "SESAME";

export interface Table {
  id: number;
  name: string;
  createdAt: Date;
}

interface MenuItem {
  id: number;
  categoryId: number;
  category: Categories;
  name: string;
  description?: string;
  image: string;
  allergies: Array<{
    id: number;
    name: AllergyType;
    displayName: string;
    icon: string;
  }>;
  availableSides?: MenuItem[];
  price: number;
}

interface Order {
  id: number;
  tableId: number;
  table: Table;
  statusId: number;
  status: Status | { id: number; name: Status; createdAt: Date; };
  description?: string;
  orderItems: OrderItem[];

  total: number;
  createdAt: Date;
}

interface OrderItem {
  id: number;
  categoryId: number;
  category: Categories;
  orderId: number;
  order: Order;
  menuId: number;
  menu: MenuItem;

  quantity: number;
  statusId: number;
  status: Status;
  note?: string;

  price: number;
}

export type { MenuItem, Order, OrderItem, Categories, Status };

// interface MenuItem {
//   id: number;
//   categoryId: number;
//   category: {
//     id: number;
//     name: CategoryType;
//     createdAt: Date;
//   };
//   name: string;
//   description?: string;
//   image: string;
//   allergies: Array<{
//     id: number;
//     name: AllergyType;
//     displayName: string;
//     icon: string;
//   }>;
//   availableSides?: MenuItem[]; // サイドメニュー
//   price: number;
//   isActive: boolean;
//   createdAt: Date;
// }
