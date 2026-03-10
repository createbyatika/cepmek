import { ShoppingCart, X, Minus, Plus, MessageCircle } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "@/lib/cart-store";

interface FloatingCartProps {
  items: CartItem[];
  totalItems: number;
  total: number;
  jolt: boolean;
  onAdd: (item: { id: string; name: string; price: number; riceOption?: string }) => void;
  onRemove: (id: string, riceOption?: string) => void;
  onCheckout: () => void;
}

const FloatingCart = ({ items, totalItems, total, jolt, onAdd, onRemove, onCheckout }: FloatingCartProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 btn-fire w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${jolt ? "cart-jolt" : ""}`}
        aria-label="Buka keranjang"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md bg-card border-l border-accent/20 flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-accent/10">
              <h2 className="font-heading text-2xl text-foreground">Keranjang</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">Keranjang kosong</p>
              ) : (
                items.map((item) => (
                  <div key={item.id + (item.riceOption || "")} className="flex items-center justify-between bg-secondary rounded-md p-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {item.name}
                        {item.riceOption && <span className="text-muted-foreground"> · {item.riceOption}</span>}
                      </p>
                      <p className="text-accent text-xs">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <button
                        onClick={() => onRemove(item.id, item.riceOption)}
                        className="w-7 h-7 rounded bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium text-foreground w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onAdd({ id: item.id, name: item.name, price: item.price, riceOption: item.riceOption })}
                        className="w-7 h-7 rounded bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-accent/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-heading text-2xl text-accent">Rp {total.toLocaleString("id-ID")}</span>
                </div>
                <button
                  onClick={() => { onCheckout(); setOpen(false); }}
                  className="btn-fire w-full py-3 rounded-md flex items-center justify-center gap-2 text-base font-semibold"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pesan via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCart;
