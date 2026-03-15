import { ShoppingCart, X, Minus, Plus, MessageCircle, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "@/lib/cart-store";

interface FloatingCartProps {
  items: CartItem[];
  totalItems: number;
  total: number;
  jolt: boolean;
  orderDate: string;
  setOrderDate: (date: string) => void;
  paymentMethod: string; // Tambahan prop baru
  setPaymentMethod: (method: string) => void; // Tambahan prop baru
  onAdd: (item: any) => void;
  onRemove: (id: string, options?: any) => void;
  onCheckout: () => void;
}

const FloatingCart = ({ 
  items, 
  totalItems, 
  total, 
  jolt, 
  orderDate, 
  setOrderDate, 
  paymentMethod, 
  setPaymentMethod, 
  onAdd, 
  onRemove, 
  onCheckout 
}: FloatingCartProps) => {
  const [open, setOpen] = useState(false);

  // KUNCI: Mendapatkan tanggal hari ini dalam format YYYY-MM-DD untuk membatasi kalender
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Floating button - TETAP SAMA */}
      <button 
        onClick={() => setOpen(true)} 
        className={`fixed bottom-6 right-6 z-50 btn-fire w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${jolt ? "cart-jolt" : ""}`}
      >
        <ShoppingCart className="w-6 h-6 text-white" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md bg-card border-l border-accent/20 flex flex-col animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-accent/10">
              <h2 className="font-heading text-2xl italic uppercase text-foreground">KERANJANG</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">Keranjang kosong</p>
              ) : (
                items.map((item, index) => {
                  const optionsText = [
                    item.riceOption, 
                    item.sambalOption, 
                    item.sideDishOption, 
                    item.toppingOption, 
                    item.spicyOption
                  ].filter(Boolean).join(", ");

                  return (
                    <div key={index} className="flex items-center justify-between bg-secondary rounded-md p-3 border border-white/5">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        {optionsText && (
                          <p className="text-[9px] text-muted-foreground uppercase italic tracking-tighter leading-none mt-1">
                            {optionsText}
                          </p>
                        )}
                        <p className="text-accent text-xs font-bold mt-1">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onRemove(item.id, { 
                            rice: item.riceOption, 
                            sambal: item.sambalOption, 
                            side: item.sideDishOption, 
                            topping: item.toppingOption, 
                            spicy: item.spicyOption 
                          })} 
                          className="w-7 h-7 rounded bg-muted flex items-center justify-center hover:bg-red-600/20 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onAdd(item)} 
                          className="w-7 h-7 rounded bg-muted flex items-center justify-center hover:bg-orange-600/20 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-accent/10 space-y-4 bg-zinc-950">
                {/* BAGIAN TANGGAL - TETAP SAMA */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Tanggal Pesanan:
                  </label>
                  <input 
                    type="date" 
                    value={orderDate} 
                    min={today} 
                    onChange={(e) => setOrderDate(e.target.value)} 
                    className="w-full bg-zinc-900 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-orange-600 outline-none" 
                    style={{ colorScheme: 'dark' }} 
                  />
                </div>

                {/* --- BAGIAN BARU: PEMILIHAN PEMBAYARAN --- */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                    <CreditCard className="w-3 h-3" /> Metode Pembayaran:
                  </label>
                  <div className="flex gap-2">
                    {["COD", "Transfer"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 py-2 rounded-md text-[11px] font-black uppercase italic transition-all border ${
                          paymentMethod === method
                            ? "bg-orange-600 border-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]"
                            : "bg-transparent border-white/10 text-zinc-500 hover:border-orange-600/50"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TOTAL & BUTTON - TETAP SAMA */}
                <div className="flex justify-between items-center border-t border-white/5 pt-2">
                  <span className="text-muted-foreground text-sm uppercase italic">Total Belanja</span>
                  <span className="font-heading text-2xl text-accent">Rp {total.toLocaleString("id-ID")}</span>
                </div>
                <button 
                  onClick={() => { onCheckout(); setOpen(false); }} 
                  className="btn-fire w-full py-4 rounded-md flex items-center justify-center gap-2 text-base font-bold italic uppercase tracking-wider"
                >
                  <MessageCircle className="w-5 h-5" /> 
                  PESAN VIA WHATSAPP
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