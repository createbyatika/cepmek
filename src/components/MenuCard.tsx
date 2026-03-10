import { useState, useRef } from "react";
import type { MenuItem } from "@/lib/cart-store";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: any) => void;
}

const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  const [selectedRice, setSelectedRice] = useState(item.riceOptions?.[0]);
  const [selectedSambal, setSelectedSambal] = useState(item.sambalOptions?.[0]);
  const [selectedTopping, setSelectedTopping] = useState(item.toppingOptions?.[0]);
  const [selectedSpicy, setSelectedSpicy] = useState(item.spicyOptions?.[0]);
  
  // State untuk menampung banyak side dish (Checklist)
  const [selectedSides, setSelectedSides] = useState<string[]>(item.sideDishOptions ? [item.sideDishOptions[0]] : []);

  const toggleSide = (opt: string) => {
    setSelectedSides(prev => 
      prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt]
    );
  };

  const [pulsing, setPulsing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleAdd = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      riceOption: selectedRice,
      sambalOption: selectedSambal,
      // Gabungkan pilihan lauk menjadi satu string
      sideDishOption: selectedSides.length > 0 ? selectedSides.join(" & ") : undefined,
      toppingOption: selectedTopping,
      spicyOption: selectedSpicy,
    });
    setPulsing(true);
    setTimeout(() => setPulsing(false), 400);
  };

  return (
    <div className={`glow-border rounded-lg bg-card overflow-hidden flex flex-col transition-all duration-300 ${pulsing ? "pulse-gold scale-[0.98]" : ""}`}>
      <div className="aspect-square overflow-hidden border-b border-white/5">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          loading="lazy" 
        />
      </div>
      
      <div className="p-4 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="font-heading text-2xl text-foreground uppercase italic tracking-tighter">{item.name}</h3>
          <p className="text-muted-foreground text-[11px] mt-1 leading-relaxed">{item.description}</p>
        </div>

        {/* --- PILIHAN LEVEL PEDAS --- */}
        {item.spicyOptions && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Level Pedas</p>
            <div className="flex flex-wrap gap-2">
              {item.spicyOptions.map((opt) => (
                <button 
                  key={opt} 
                  onClick={() => setSelectedSpicy(opt)}
                  className={`text-[10px] px-2.5 py-1.5 rounded font-bold transition-all border ${
                    selectedSpicy === opt 
                      ? "bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]" 
                      : "bg-transparent border-white/10 text-gray-400"
                  }`}
                > {opt} </button>
              ))}
            </div>
          </div>
        )}

        {/* --- PILIHAN NASI --- */}
        {item.riceOptions && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Pilih Nasi</p>
            <div className="flex flex-wrap gap-2">
              {item.riceOptions.map((opt) => (
                <button 
                  key={opt} 
                  onClick={() => setSelectedRice(opt)}
                  className={`text-[10px] px-2.5 py-1.5 rounded font-bold border transition-all ${
                    selectedRice === opt 
                      ? "bg-orange-600 border-orange-600 text-white" 
                      : "bg-transparent border-white/10 text-gray-400 hover:border-orange-600/50"
                  }`}
                > {opt} </button>
              ))}
            </div>
          </div>
        )}

        {/* --- PILIHAN SAMBAL --- */}
        {item.sambalOptions && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Pilih Sambal</p>
            <div className="flex flex-wrap gap-2">
              {item.sambalOptions.map((opt) => (
                <button 
                  key={opt} 
                  onClick={() => setSelectedSambal(opt)}
                  className={`text-[10px] px-2.5 py-1.5 rounded font-bold border transition-all ${
                    selectedSambal === opt 
                      ? "bg-orange-600 border-orange-600 text-white" 
                      : "bg-transparent border-white/10 text-gray-400 hover:border-orange-600/50"
                  }`}
                > {opt} </button>
              ))}
            </div>
          </div>
        )}

        {/* --- LAUK PENDAMPING (Multi-Select) --- */}
        {item.sideDishOptions && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
              Lauk Pendamping (Bisa Pilih Lebih Dari 1)
            </p>
            <div className="flex flex-wrap gap-2">
              {item.sideDishOptions.map((opt) => (
                <button 
                  key={opt} 
                  onClick={() => toggleSide(opt)}
                  className={`text-[10px] px-2.5 py-1.5 rounded font-bold border transition-all ${
                    selectedSides.includes(opt) 
                      ? "bg-orange-600 border-orange-600 text-white shadow-[0_0_10px_rgba(234,88,12,0.3)]" 
                      : "bg-transparent border-white/10 text-gray-400 hover:border-orange-600/50"
                  }`}
                >
                   {selectedSides.includes(opt) ? "✓ " : ""}{opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- TAMBAHAN (SOSIS/SAYUR) --- */}
        {item.toppingOptions && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Tambahan</p>
            <div className="flex flex-wrap gap-2">
              {item.toppingOptions.map((opt) => (
                <button 
                  key={opt} 
                  onClick={() => setSelectedTopping(opt)}
                  className={`text-[10px] px-2.5 py-1.5 rounded font-bold border transition-all ${
                    selectedTopping === opt 
                      ? "bg-orange-600 border-orange-600 text-white" 
                      : "bg-transparent border-white/10 text-gray-400 hover:border-orange-600/50"
                  }`}
                > {opt} </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="font-heading text-xl text-[#FFD700]">
            Rp {item.price.toLocaleString("id-ID")}
          </span>
          <button 
            onClick={handleAdd} 
            className="btn-fire px-4 py-2.5 rounded-md text-[11px] font-black uppercase italic tracking-widest active:scale-95 transition-transform"
          >
            + KERANJANG
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;