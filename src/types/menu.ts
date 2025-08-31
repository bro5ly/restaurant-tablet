type Categories = "SET" | "SINGLE" | "SIDE" | "DRINK_DESERT";
type Status = "PENDING" | "CONFIRM" | "COOKING" | "READY" | "SERVED";

interface MenuItem {
  id: number;
  categoryName: Categories;
  name: string;
  description?: string;
  image: string;

  price: number;
}

interface Order {
  id: number;
  tableId: number;
  status: Status;
  description?: string;
  orderItems: OrderItem[];

  total: number;
}

interface OrderItem {
  id: number;
  categoryName: Categories;
  orderId: number;
  menu: MenuItem;

  quantity: number;
  status: Status;
  note?: string;

  total: number;
}

export type { MenuItem, Order, OrderItem, Categories, Status };
