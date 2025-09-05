import { useEffect, useState } from "react";

export function useDetail(menuId: number | null) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/menu/detail/${menuId}`);
      if (!res.ok) throw new Error("detail not found");
      const data = await res.json();
      setDetail(data);
    } catch (error) {
      console.log("detail api error", error);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (menuId) {
      fetchDetail();
    }
  }, [menuId]);

  return { detail, loading };
}
