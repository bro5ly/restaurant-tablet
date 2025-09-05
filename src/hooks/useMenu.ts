import { useEffect, useState } from "react";

export function useMenus(categoryName: string) {
  const [menus, setMenus] = useState<any>();

  const fetchMenus = async () => {
    try {
      const res = await fetch(`/api/menu/${categoryName}`);
      if (!res.ok) throw new Error(`menu not found: ${res.status}`);
      const data = await res.json();
      setMenus(data);
    } catch (error) {
      console.log("menu api error: ", error);
      setMenus([]);
      throw new Error(`menu not found: ${error}`);
    }
  };
  useEffect(() => {
    if (categoryName) {
      fetchMenus();
    }
  }, [categoryName]);

  return { menus };
}
