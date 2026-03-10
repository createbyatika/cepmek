import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  riceOption?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  riceOptions?: string[];
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [jolt, setJolt] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const key = item.id + (item.riceOption || "");
      const existing = prev.find(
        (i) => i.id === item.id && i.riceOption === item.riceOption
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.riceOption === item.riceOption
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setJolt(true);
    setTimeout(() => setJolt(false), 400);
  }, []);

  const removeItem = useCallback((id: string, riceOption?: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.riceOption === riceOption
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const generateWhatsAppURL = useCallback(() => {
    const lines = items.map(
      (i) =>
        `${i.quantity}x ${i.name}${i.riceOption ? ` (${i.riceOption})` : ""}`
    );
    const message = encodeURIComponent(
      `Halo Admin CEPMEK, saya mau order:\n\n${lines.join("\n")}\n\nTotal: Rp ${total.toLocaleString("id-ID")}\nLokasi pengantaran: \nMohon diproses ya!`
    );
    return `https://wa.me/6281372206956?text=${message}`;
  }, [items, total]);

  return { items, addItem, removeItem, clearCart, total, totalItems, jolt, generateWhatsAppURL };
}
