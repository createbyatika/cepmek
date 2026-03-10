import { useCart } from "@/lib/cart-store";
import type { MenuItem } from "@/lib/cart-store";
import MenuCard from "@/components/MenuCard";
import FloatingCart from "@/components/FloatingCart";

// Import Gambar-gambar (Pastikan file ini ada di folder assets)
import ayamImg from "@/assets/ayam-rempah.jpg";
import pisangImg from "@/assets/pisang-madu.jpg";
import dawetImg from "@/assets/es-dawet.jpg";
import mangoImg from "@/assets/mango-milky.jpg";
import heroImg from "@/assets/cepmek-hero.png"; 

const menuItems: MenuItem[] = [
  {
    id: "ayam-rempah",
    name: "Ayam Goreng Rempah",
    price: 20000,
    image: ayamImg,
    description: "Ayam goreng bumbu rempah nusantara yang bumbunya nendang.",
    riceOptions: ["Nasi Putih", "Nasi Kuning", "Nasi Daun Jeruk"],
  },
  {
    id: "pisang-madu",
    name: "Pisang Goreng Madu",
    price: 12000,
    image: pisangImg,
    description: "Pisang goreng crispy disiram madu asli. Manis legit.",
  },
  {
    id: "es-dawet",
    name: "Es Dawet (Cendol Kecebong)",
    price: 10000,
    image: dawetImg,
    description: "Cendol segar dengan santan dan gula merah.",
  },
  {
    id: "mango-milky",
    name: "Korean Mango Milky",
    price: 15000,
    image: mangoImg,
    description: "Mango smoothie creamy ala Korea. Segar dan kekinian.",
  },
];

const Index = () => {
  const cart = useCart();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-600">
      
      {/* --- HERO SECTION: DIBUAT RAME & SANGAR --- */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden border-b border-white/5">
        
        {/* 1. PENAMBAHAN: Tulisan Latar Belakang Raksasa (Stroke Style) */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none overflow-hidden opacity-10">
          <h1 className="font-heading text-[25vw] leading-none tracking-tighter text-transparent select-none whitespace-nowrap uppercase italic" 
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}>
            CEPMEK CEPMEK
          </h1>
          <h1 className="font-heading text-[20vw] leading-none tracking-tighter text-transparent select-none whitespace-nowrap uppercase italic -mt-20" 
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            SANGAR SANGAR
          </h1>
        </div>

        {/* 2. PENAMBAHAN: Gradasi Cahaya Atas (Agar tidak sepi) */}
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-orange-600/20 to-transparent"></div>

        {/* 3. Logo Ayam Api Utama (Desain Asli Tetap Ada) */}
        <div className="relative z-10 w-full max-w-[650px] px-6 group mt-10">
          {/* Cahaya Bara Api di Belakang Logo */}
          <div className="absolute inset-0 m-auto w-64 h-64 bg-orange-600 rounded-full blur-[110px] opacity-25 animate-pulse group-hover:opacity-40 transition-opacity"></div>
          
          <img
            src={heroImg}
            alt="CEPMEK Hero Logo"
            className="relative z-10 w-full h-auto drop-shadow-[0_0_50px_rgba(255,69,00,0.6)] transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* 4. Teks Tagline (Desain Asli Dipertebal) */}
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

      {/* --- ABOUT SECTION (Sesuai Desain Sebelumnya) --- */}
      <section className="container py-20 border-y border-white/10">
        <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-6">
          Solusi Lapar Paling Sangar!
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-2xl text-lg sm:text-xl">
          Lagi nugas tapi perut demo? <span className="text-white font-bold underline decoration-orange-600">CEPMEK</span> hadir buat jadi pahlawan kelaparanmu! 
          Kami memadukan resep warisan nusantara dengan twist modern yang bikin nagih. 
          Semua menu kami dirancang buat kamu yang butuh mood booster instan tanpa bikin kantong bolong.
        </p>
      </section>

      {/* --- MENU SECTION (Fitur Tambah Keranjang Tetap Sama) --- */}
      <section className="container py-20">
        <h2 className="font-heading text-4xl sm:text-5xl text-white mb-10">
          Menu Andalan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {menuItems.map((item) => (
            <MenuCard 
              key={item.id} 
              item={item} 
              onAddToCart={cart.addItem} 
            />
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 py-12 text-center opacity-50">
        <p className="text-sm tracking-widest">
          © 2026 CEPMEK — Rasa Garang Harga Sayang
        </p>
      </footer>

      {/* --- FLOATING CART (Fitur WA Tetap Sama) --- */}
      <FloatingCart
        items={cart.items}
        totalItems={cart.totalItems}
        total={cart.total}
        jolt={cart.jolt}
        onAdd={cart.addItem}
        onRemove={cart.removeItem}
        onCheckout={() => window.open(cart.generateWhatsAppURL(), "_blank")}
      />
    </div>
  );
};

export default Index;