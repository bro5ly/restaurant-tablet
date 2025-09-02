import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    const createOrder = async () => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
  }, []);
  return <div>page</div>;
}
