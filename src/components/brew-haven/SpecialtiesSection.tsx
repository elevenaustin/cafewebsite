import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Clock, Eye, Star, Plus, Sparkles, Phone, Wifi, Heart, Calendar, MessageCircle } from "lucide-react";
import { CATEGORIES, MENU_ITEMS, MenuItem, CAFE } from "./brew-haven-data";
import { ItemDetailModal } from "./ItemDetailModal";
import { adminStore } from "@/lib/admin-store";

interface SpecialtiesSectionProps {
  onViewFullMenu: () => void;
  onGetDirections: () => void;
  onOpenReservation?: () => void;
  onSelectMenuItem?: (item: MenuItem) => void;
  onOpenOrderCheckout?: (
    item: MenuItem,
    quantity?: number,
    sizeName?: string,
    totalPrice?: number,
    customizations?: string[]
  ) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  onViewFullMenu,
  onGetDirections,
  onOpenReservation,
  onOpenOrderCheckout,
}) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedModalItem, setSelectedModalItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleOpenItemDetail = (item: MenuItem) => {
    setSelectedModalItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = MENU_ITEMS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const featuredItem = MENU_ITEMS[0]; // Classic Cappuccino

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="bg-[#f5efe6] py-16 lg:py-24 text-[#140e08] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6`}
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#b87d4b]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b87d4b]">
                OUR ARTISAN MENU
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.12] text-[#140e08]">
              Crafted for <span className="italic text-[#b87d4b]">Coffee Lovers</span>
            </h2>
            <p className="text-sm text-[#5c5043] mt-2 max-w-xl leading-relaxed">
              Explore our handpicked single-origin espressos, chilled lattes, and daily baked pastries.
            </p>
          </div>

          <div>
            <button
              onClick={onViewFullMenu}
              className="group bg-[#140e08] hover:bg-[#2b1d13] text-[#f4efe9] px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>EXPLORE ALL ITEMS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#c89355]" />
            </button>
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div
          className={`transition-all duration-700 delay-100 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } mb-10`}
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar border-b border-[#e2d5c3]">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#c89355] text-[#100b07] shadow-md shadow-[#c89355]/20 font-bold scale-105"
                      : "bg-[#ffffff]/80 text-[#5c5043] border border-[#e2d5c3] hover:text-[#100b07] hover:border-[#c89355] hover:bg-white"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Menu Cards + Sticky Compact Visit Us Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu Cards Grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[400px]">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenItemDetail(item)}
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
                className={`group bg-[#18110b] rounded-2xl overflow-hidden border border-[#c89355]/20 hover:border-[#c89355]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#c89355]/15 animate-in fade-in slide-in-from-bottom-4 duration-500`}
              >
                <div>
                  {/* Card Image Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#100b07]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-[#18110b]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                    {/* Popular Badge */}
                    {item.popular && (
                      <div className="absolute top-3 left-3 bg-[#c89355] text-[#100b07] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md">
                        Popular
                      </div>
                    )}

                    {/* Rating Tag */}
                    {item.rating && (
                      <div className="absolute top-3 right-3 bg-[#100b07]/80 backdrop-blur-md border border-[#c89355]/30 text-[#f4efe9] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#c89355] text-[#c89355]" />
                        <span>{item.rating}</span>
                      </div>
                    )}

                    {/* Hover Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <span className="bg-[#c89355] text-[#100b07] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Eye className="w-4 h-4" />
                        <span>VIEW ITEM</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Header Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-serif text-xl font-medium text-[#f4efe9] group-hover:text-[#c89355] transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#a6988a] line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price & Quick Action */}
                <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
                  <div className="pt-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#a6988a] block font-semibold">
                      Price
                    </span>
                    <span className="font-sans text-lg font-bold text-[#c89355] group-hover:text-[#e5b376] transition-colors">
                      {item.currency}
                      {item.price}
                    </span>
                  </div>

                  <div className="pt-3">
                    <div className="w-8 h-8 rounded-full bg-[#100b07] border border-[#c89355]/30 group-hover:border-[#c89355] group-hover:bg-[#c89355] group-hover:text-[#100b07] text-[#c89355] flex items-center justify-center transition-all duration-300">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Proportioned Visit Us Card (4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start bg-[#100b07] text-[#f4efe9] rounded-2xl p-6 sm:p-7 flex flex-col space-y-5 relative overflow-hidden border border-[#c89355]/20 shadow-xl">
            {/* Subtle background glow */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#c89355]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header + Status Badge */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c89355]">
                  VISIT US
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>OPEN NOW</span>
                </span>
              </div>

              <h3 className="font-serif text-3xl font-normal leading-tight mb-2">
                A Place to Sip, <br />
                <span className="italic text-[#c89355]">Relax & Connect</span>
              </h3>
              <p className="text-xs text-[#a6988a] leading-relaxed">
                Come, unwind and enjoy the perfect blend of handcrafted coffee, warm conversations, and peaceful ambience.
              </p>
            </div>

            {/* Ambience Photo Banner */}
            <div className="relative h-36 rounded-xl overflow-hidden border border-[#c89355]/30 group shadow-md flex-shrink-0">
              <img
                src={CAFE.ambienceImage}
                alt="Brew Haven Cozy Cafe Ambience"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100b07] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                <span className="font-serif italic text-[#f4efe9] font-medium text-xs">
                  Experience Our Cozy Sanctuary
                </span>
                <span className="text-[9px] text-[#c89355] uppercase font-bold tracking-widest bg-[#100b07]/80 px-2 py-0.5 rounded">
                  Downtown
                </span>
              </div>
            </div>

            {/* Barista Recommendation Feature Widget */}
            {featuredItem && (
              <div
                onClick={() => handleOpenItemDetail(featuredItem)}
                className="bg-[#18110b] border border-[#c89355]/30 hover:border-[#c89355] rounded-xl p-3 flex items-center gap-3 transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={featuredItem.image}
                  alt={featuredItem.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-[#100b07]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-widest text-[#c89355] font-extrabold block">
                    ★ Barista's Pick
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-[#f4efe9] truncate group-hover:text-[#c89355] transition-colors">
                    {featuredItem.name}
                  </h4>
                  <span className="text-xs font-bold text-[#c89355]">
                    {featuredItem.currency}{featuredItem.price}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#c89355]/10 group-hover:bg-[#c89355] text-[#c89355] group-hover:text-[#100b07] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Quick Amenities Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#d4ceb8]">
              <div className="bg-[#18110b] p-2 rounded-lg border border-white/5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c89355]" />
                <span>Single Origin</span>
              </div>
              <div className="bg-[#18110b] p-2 rounded-lg border border-white/5 flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-[#c89355]" />
                <span>Fast Free Wi-Fi</span>
              </div>
              <div className="bg-[#18110b] p-2 rounded-lg border border-white/5 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c89355]" />
                <span>8 AM – 10 PM</span>
              </div>
              <div className="bg-[#18110b] p-2 rounded-lg border border-white/5 flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#c89355]" />
                <span>Pet Friendly</span>
              </div>
            </div>

            {/* Store Address & Contact */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#d4ceb8]">
              <a
                href={CAFE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#c89355] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c89355] flex-shrink-0" />
                <span className="truncate">{CAFE.address}</span>
              </a>
              <a
                href={CAFE.telLink}
                className="flex items-center gap-2.5 hover:text-[#c89355] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c89355] flex-shrink-0" />
                <span>{CAFE.phone}</span>
              </a>
            </div>

            {/* Quick Action Contact Buttons: Call & WhatsApp */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={CAFE.telLink}
                className="bg-[#18110b] hover:bg-[#100b07] border border-[#c89355]/40 hover:border-[#c89355] text-[#c89355] py-2.5 px-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL NOW</span>
              </a>

              <a
                href={CAFE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => adminStore.trackWhatsAppClick("Specialties Section")}
                className="bg-[#25D366] hover:bg-[#20ba5a] text-black py-2.5 px-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                <span>WHATSAPP</span>
              </a>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onGetDirections}
                className="w-full group bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-[#c89355]/20 transform hover:-translate-y-0.5"
              >
                <span>GET DIRECTIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {onOpenReservation && (
                <button
                  onClick={onOpenReservation}
                  className="w-full border border-[#c89355]/40 hover:border-[#c89355] bg-[#18110b] hover:bg-[#18110b]/80 text-[#f4efe9] hover:text-[#c89355] py-2.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#c89355]" />
                  <span>RESERVE TABLE</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedModalItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedModalItem(null);
        }}
        onAddToCart={(item, quantity, sizeName, totalPrice, customizations) => {
          setIsModalOpen(false);
          if (onOpenOrderCheckout) {
            onOpenOrderCheckout(item, quantity, sizeName, totalPrice, customizations);
          }
        }}
      />
    </section>
  );
};
