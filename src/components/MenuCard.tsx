import { useState, useRef } from "react";
import type { MenuItem } from "@/lib/cart-store";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: { id: string; name: string; price: number; riceOption?: string }) => void;
}

const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  const [selectedRice, setSelectedRice] = useState(item.riceOptions?.[0]);
  const [pulsing, setPulsing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleAdd = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      riceOption: selectedRice,
    });
    setPulsing(true);
    setTimeout(() => setPulsing(false), 400);
  };

  return (
    <div className={`glow-border rounded-lg bg-card overflow-hidden flex flex-col ${pulsing ? "pulse-gold" : ""}`}>
      <div className="aspect-square overflow-hidden">
        <img
          ref={imgRef}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-heading text-2xl text-foreground leading-tight">{item.name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
        </div>

        {item.riceOptions && (
          <div className="flex flex-wrap gap-2">
            {item.riceOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedRice(opt)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedRice === opt
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-heading text-xl text-accent">
            Rp {item.price.toLocaleString("id-ID")}
          </span>
          <button
            onClick={handleAdd}
            className="btn-fire px-4 py-2 rounded-md text-sm"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
