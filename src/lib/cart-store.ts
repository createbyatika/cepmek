import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  riceOption?: string;
  sambalOption?: string;
  sideDishOption?: string;
  toppingOption?: string;
  spicyOption?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  riceOptions?: string[];
  sambalOptions?: string[];
  sideDishOptions?: string[];
  toppingOptions?: string[];
  spicyOptions?: string[];
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [jolt, setJolt] = useState(false);
  const [orderDate, setOrderDate] = useState(""); 

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => 
        i.id === item.id && 
        i.riceOption === item.riceOption &&
        i.sambalOption === item.sambalOption &&
        i.sideDishOption === item.sideDishOption &&
        i.toppingOption === item.toppingOption &&
        i.spicyOption === item.spicyOption
      );
      if (existing) {
        return prev.map((i) => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setJolt(true);
    setTimeout(() => setJolt(false), 400);
  }, []);

  const removeItem = useCallback((id: string, options?: any) => {
    setItems((prev) =>
      prev.map((i) => (
        i.id === id && 
        i.riceOption === options?.rice && 
        i.sambalOption === options?.sambal &&
        i.sideDishOption === options?.side &&
        i.toppingOption === options?.topping &&
        i.spicyOption === options?.spicy
      ) ? { ...i, quantity: i.quantity - 1 } : i)
      .filter((i) => i.quantity > 0)
    );
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const generateWhatsAppURL = useCallback(() => {
    const lines = items.map((i) => {
      const opts = [i.riceOption, i.sambalOption, i.sideDishOption, i.toppingOption, i.spicyOption]
        .filter(Boolean).join(", ");
      return `${i.quantity}x ${i.name}${opts ? ` (${opts})` : ""}`;
    });
    const dateLine = orderDate ? `Tanggal Pesanan: ${orderDate}\n` : "";
    const msg = encodeURIComponent(
      `Halo Admin CEPMEK, saya mau order:\n\n${lines.join("\n")}\n\n${dateLine}Total: Rp ${total.toLocaleString("id-ID")}\nLokasi pengantaran: \nMohon diproses ya!`
    );
    return `https://wa.me/6281372206956?text=${msg}`;
  }, [items, total, orderDate]);

  return { items, addItem, removeItem, total, totalItems, jolt, orderDate, setOrderDate, generateWhatsAppURL };
}