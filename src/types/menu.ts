type Categories = "SET" | "SINGLE" | "SIDE" | "DRINK_DESERT";
type Status = "PENDING" | "CONFIRM" | "COOKING" | "READY" | "SERVED";

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

  price: number;
}

interface Order {
  id: number;
  tableId: number;
  table: Table;
  statusId: number;
  status: Status;
  description?: string;
  orderItems: OrderItem[];

  total: number;
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
