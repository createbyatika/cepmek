import { useCart } from "@/lib/cart-store";
import type { MenuItem } from "@/lib/cart-store";
import MenuCard from "@/components/MenuCard";
import FloatingCart from "@/components/FloatingCart";

// --- IMPORT ASSETS ---
import ayamImg from "@/assets/ayam-rempah.jpg";
import pisangImg from "@/assets/pisang-madu.jpg";
import dawetImg from "@/assets/es-dawet.jpg";
import mangoImg from "@/assets/mango-milky.jpg";
import heroImg from "@/assets/cepmek-hero.png"; 
import tahuImg from "@/assets/tahu-kocek.png";

const menuItems: MenuItem[] = [
  {
    id: "ayam-rempah",
    name: "Ayam Goreng Rempah",
    price: 20000,
    image: ayamImg,
    description: "Paket lengkap kenyang sangar. Ayam bumbu rempah melimpah khas nusantara.",
    riceOptions: ["Nasi Putih", "Nasi Kuning", "Nasi Daun Jeruk"],
    sambalOptions: ["Sambal Bawang", "Sambal Matah", "Sambal Cabai Ijo"],
    sideDishOptions: ["Tahu & Tempe", "Lalapan"],
  },
  {
    id: "tahu-kocek",
    name: "Tahu Kocek",
    price: 10000,
    image: tahuImg,
    description: "Tahu aci goreng kriuk bumbu kocek pedas gurih khas CEPMEK.",
    toppingOptions: ["Sayur", "Sosis"],
    spicyOptions: ["Tidak Pedas (Cabai 0)", "Sedang", "Pedas Banget"],
  },
  {
    id: "pisang-madu",
    name: "Pisang Goreng Madu",
    price: 12000,
    image: pisangImg,
    description: "Pisang goreng crispy disiram madu asli. Manis legit buat mood booster.",
  },
  {
    id: "es-dawet",
    name: "Es Dawet",
    price: 10000,
    image: dawetImg,
    description: "Cendol segar dengan santan gurih dan gula merah asli.",
  },
  {
    id: "mango-milky",
    name: "Korean Mango Milky",
    price: 12000,
    image: mangoImg,
    description: "Mango smoothie creamy ala Korea. Sensasi segar yang kekinian.",
  },
];

const Index = () => {
  // Pastikan destructuring ini sama persis dengan yang ada di useCart() kamu
  const { 
    items, 
    addItem, 
    removeItem, 
    total, 
    totalItems, 
    jolt, 
    orderDate, 
    setOrderDate, 
    generateWhatsAppURL 
  } = useCart();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-600">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden border-b border-white/5">
        
        {/* Latar Belakang Tulisan Raksasa */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none overflow-hidden opacity-10">
          <h1 className="font-heading text-[25vw] leading-none tracking-tighter text-transparent select-none whitespace-nowrap uppercase italic" 
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}>
            CEPMEK
          </h1>
        </div>

        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-orange-600/20 to-transparent"></div>

        {/* Logo Utama */}
        <div className="relative z-10 w-full max-w-[650px] px-6 group mt-10">
          <div className="absolute inset-0 m-auto w-64 h-64 bg-orange-600 rounded-full blur-[110px] opacity-25 animate-pulse group-hover:opacity-40 transition-opacity"></div>
          {/* Hero Image dengan fallback */}
          <img
            src={heroImg}
            alt="CEPMEK Hero Logo"
            className="relative z-10 w-full h-auto drop-shadow-[0_0_50px_rgba(255,69,00,0.6)] transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Tagline */}
        <div className="relative z-20 text-center -mt-8 px-6">
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-[#FFD700] tracking-tighter uppercase italic drop-shadow-[0_4px_15px_rgba(0,0,0,1)]">
            Rasa Garang, <span className="text-orange-600">Harga Sayang!</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 mt-4 opacity-80">
              <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-orange-600"></div>
              <p className="text-white uppercase tracking-[0.4em] text-[10px] sm:text-xs font-black">
                CEPMEK
              </p>
              <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-orange-600"></div>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section className="container py-20">
        <h2 className="font-heading text-4xl sm:text-5xl text-white mb-10 italic uppercase">
          Menu Andalan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {menuItems.map((item) => (
            <MenuCard 
              key={item.id} 
              item={item} 
              onAddToCart={addItem} 
            />
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 py-12 text-center opacity-50">
        <p className="text-sm tracking-widest uppercase italic">
          © 2026 CEPMEK — Rasa Sangar Harga Sayang
        </p>
      </footer>

      {/* --- FLOATING ELEMENTS --- */}
      <FloatingCart
        items={items}
        totalItems={totalItems}
        total={total}
        jolt={jolt}
        orderDate={orderDate}
        setOrderDate={setOrderDate}
        onAdd={addItem}
        onRemove={removeItem}
        onCheckout={() => window.open(generateWhatsAppURL(), "_blank")}
      />
    </div>
  );
};

export default Index;