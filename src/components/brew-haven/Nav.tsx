import React, { useState, useEffect } from "react";
import { Coffee, Menu as MenuIcon, X, ShieldCheck, Truck } from "lucide-react";
import { CAFE } from "./brew-haven-data";

interface NavProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenStory: () => void;
  onOpenDirections: () => void;
  onOpenShop?: () => void;
  onOpenGallery?: () => void;
  onOpenAdmin?: () => void;
  onOpenTrackOrder?: () => void;
  activeSection?: string;
}

export const Nav: React.FC<NavProps> = ({
  onOpenReservation,
  onOpenMenu,
  onOpenStory,
  onOpenDirections,
  onOpenShop,
  onOpenGallery,
  onOpenAdmin,
  onOpenTrackOrder,
  activeSection = "home",
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "menu") {
      onOpenMenu();
      return;
    }
    if (id === "about") {
      onOpenStory();
      return;
    }
    if (id === "contact") {
      onOpenDirections();
      return;
    }
    if (id === "shop" && onOpenShop) {
      onOpenShop();
      return;
    }
    if (id === "gallery" && onOpenGallery) {
      onOpenGallery();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#100b07]/90 backdrop-blur-md border-b border-[#c89355]/20 py-3 shadow-2xl"
          : "bg-gradient-to-b from-[#100b07]/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 rounded-full border border-[#c89355]/40 bg-[#18110b] flex items-center justify-center text-[#c89355] group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#f4efe9] leading-none">
              {CAFE.name}
            </span>
            <span className="text-[9px] tracking-[0.25em] font-semibold text-[#c89355] uppercase mt-0.5">
              COFFEE & CAFE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: "home", label: "HOME" },
            { id: "menu", label: "MENU" },
            { id: "about", label: "ABOUT US" },
            { id: "shop", label: "SHOP" },
            { id: "gallery", label: "GALLERY" },
            { id: "faq", label: "FAQ" },
            { id: "contact", label: "CONTACT" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#e0d6c8] hover:text-white transition-colors duration-200"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c89355] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenTrackOrder && (
            <button
              onClick={onOpenTrackOrder}
              className="px-3.5 py-2 rounded-md bg-[#18110b] hover:bg-[#261b12] border border-[#c89355]/40 text-[#c89355] hover:text-white transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold"
              title="Track Live Order & Cancel"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Track Order</span>
            </button>
          )}

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-2.5 rounded-md bg-[#18110b] hover:bg-[#261b12] border border-[#c89355]/40 text-[#c89355] hover:text-white transition-all shadow-sm"
              title="Admin Portal (Password Protected)"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onOpenReservation}
            className="bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] px-6 py-2.5 rounded-md font-semibold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#c89355]/10"
          >
            RESERVE A TABLE
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          {onOpenTrackOrder && (
            <button
              onClick={onOpenTrackOrder}
              className="p-1.5 rounded bg-[#18110b] border border-[#c89355]/40 text-[#c89355] flex items-center gap-1 text-[11px] font-bold"
              title="Track Order"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Track</span>
            </button>
          )}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded bg-[#18110b] border border-[#c89355]/40 text-[#c89355]"
              title="Admin"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onOpenReservation}
            className="bg-[#c89355] text-[#100b07] text-[10px] uppercase font-bold px-3 py-1.5 rounded"
          >
            RESERVE
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#f4efe9] p-2 hover:text-[#c89355]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18110b] border-b border-[#c89355]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => scrollToSection("home")}
            className="block text-sm font-semibold uppercase tracking-widest text-[#c89355] w-full text-left py-2 border-b border-white/5"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="block text-sm font-semibold uppercase tracking-widest text-[#f4efe9] w-full text-left py-2 border-b border-white/5"
          >
            MENU & SPECIALTIES
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="block text-sm font-semibold uppercase tracking-widest text-[#f4efe9] w-full text-left py-2 border-b border-white/5"
          >
            ABOUT US & OUR STORY
          </button>
          <button
            onClick={() => scrollToSection("shop")}
            className="block text-sm font-semibold uppercase tracking-widest text-[#f4efe9] w-full text-left py-2 border-b border-white/5"
          >
            SHOP & MERCH
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="block text-sm font-semibold uppercase tracking-widest text-[#f4efe9] w-full text-left py-2 border-b border-white/5"
          >
            GALLERY
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="block text-sm font-semibold uppercase tracking-widest text-[#f4efe9] w-full text-left py-2 border-b border-white/5"
          >
            FAQ & HELP
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block text-sm font-semibold uppercase tracking-widest text-[#f4efe9] w-full text-left py-2 border-b border-white/5"
          >
            VISIT & CONTACT
          </button>
          {onOpenTrackOrder && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackOrder();
              }}
              className="block text-sm font-semibold uppercase tracking-widest text-emerald-400 w-full text-left py-2 border-b border-white/5 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>TRACK ORDER & 1-MIN CANCEL</span>
            </button>
          )}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="w-full bg-[#c89355] text-[#100b07] font-bold text-xs uppercase py-3 rounded tracking-wider mt-4"
          >
            RESERVE A TABLE
          </button>
        </div>
      )}
    </header>
  );
};
