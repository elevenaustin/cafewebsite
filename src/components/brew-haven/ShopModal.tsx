import React, { useState } from "react";
import { X, ShoppingBag, Star, CheckCircle, Coffee, Tag } from "lucide-react";
import classicCappuccinoImg from "@/assets/classic-cappuccino.png";
import heroCoffeeImg from "@/assets/hero-coffee.png";
import icedCaramelLatteImg from "@/assets/iced-caramel-latte.png";
import mochaDelightImg from "@/assets/mocha-delight.png";

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderCheckout?: (
    item: any,
    quantity?: number,
    sizeName?: string,
    totalPrice?: number,
    customizations?: string[]
  ) => void;
}

export interface ShopItem {
  id: string;
  name: string;
  category: "beans" | "gear" | "merch" | "gifts";
  price: number;
  currency: string;
  tag: string;
  rating: number;
  description: string;
  image: string;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "ethiopian-yirgacheffe",
    name: "Ethiopian Yirgacheffe Beans (250g)",
    category: "beans",
    price: 650,
    currency: "₹",
    tag: "Single Origin",
    rating: 4.9,
    description: "Light-medium roast featuring bright floral jasmine notes and bergamot citrus acidity.",
    image: heroCoffeeImg,
  },
  {
    id: "house-blend-dark",
    name: "Haven Signature Dark Roast (500g)",
    category: "beans",
    price: 850,
    currency: "₹",
    tag: "Bestseller",
    rating: 5.0,
    description: "Deep dark roast blend with dark Belgian chocolate and roasted hazelnut undertones.",
    image: classicCappuccinoImg,
  },
  {
    id: "artisan-pour-over",
    name: "Ceramic V60 Dripper & Glass Server",
    category: "gear",
    price: 1450,
    currency: "₹",
    tag: "Barista Pick",
    rating: 4.8,
    description: "Hand-crafted matte ceramic pour-over dripper with heat-resistant 600ml glass carafe.",
    image: icedCaramelLatteImg,
  },
  {
    id: "insulated-tumbler",
    name: "Brew Haven Thermal Travel Tumbler (450ml)",
    category: "merch",
    price: 990,
    currency: "₹",
    tag: "Limited Edition",
    rating: 4.9,
    description: "Double-walled vacuum insulated stainless steel tumbler. Keeps drinks hot for 8 hours.",
    image: mochaDelightImg,
  },
  {
    id: "cozy-gift-box",
    name: "Ultimate Coffee Connoisseur Gift Set",
    category: "gifts",
    price: 2490,
    currency: "₹",
    tag: "Gift Pack",
    rating: 5.0,
    description: "Includes 250g Signature Beans, Stainless Steel Scoop, Thermal Mug, and Belgian Truffles.",
    image: heroCoffeeImg,
  },
  {
    id: "colombian-supremo",
    name: "Colombian Supremo Reserve (250g)",
    category: "beans",
    price: 720,
    currency: "₹",
    tag: "Organic",
    rating: 4.8,
    description: "Medium roast boasting buttery caramel sweetness and smooth walnut finish.",
    image: classicCappuccinoImg,
  },
];

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, onOpenOrderCheckout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems =
    selectedCategory === "all"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: ShopItem) => {
    if (onOpenOrderCheckout) {
      onClose();
      onOpenOrderCheckout(
        {
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          description: item.description,
          image: item.image,
        },
        1,
        item.tag,
        item.price
      );
    } else {
      setCartItems((prev) => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1,
      }));
      setAddedNotice(item.name);
      setTimeout(() => setAddedNotice(null), 2500);
    }
  };

  const totalCartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18110b] border border-[#c89355]/30 rounded-2xl max-w-4xl w-full p-5 sm:p-8 relative shadow-2xl text-[#f4efe9] max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Bar Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89355] block">
              ROASTERY & MERCHANDISE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#f4efe9]">
              Brew Haven Shop
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative bg-[#100b07] border border-[#c89355]/40 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#c89355]">
              <ShoppingBag className="w-4 h-4 text-[#c89355]" />
              <span>{totalCartCount} Items</span>
            </div>
            <button
              onClick={onClose}
              className="text-[#a6988a] hover:text-[#c89355] transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Added to Cart Notification Toast */}
        {addedNotice && (
          <div className="bg-[#c89355] text-[#100b07] px-4 py-2 rounded-lg my-2 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Added "{addedNotice}" to your cart!</span>
          </div>
        )}

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar border-b border-white/5">
          {[
            { id: "all", label: "All Items" },
            { id: "beans", label: "Coffee Beans" },
            { id: "gear", label: "Brewing Gear" },
            { id: "merch", label: "Merchandise" },
            { id: "gifts", label: "Gift Sets" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#c89355] text-[#100b07]"
                  : "bg-[#100b07] text-[#a6988a] hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#100b07] border border-[#c89355]/20 hover:border-[#c89355]/60 rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-xl group"
            >
              <div>
                <div className="relative h-36 rounded-lg overflow-hidden mb-3 border border-white/5 bg-[#18110b]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#100b07]/90 backdrop-blur-sm border border-[#c89355]/40 text-[#c89355] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <h3 className="font-serif text-base font-medium text-[#f4efe9] group-hover:text-[#c89355] transition-colors leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#a6988a] line-clamp-2 mb-3">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="font-serif text-lg font-bold text-[#f4efe9]">
                  {item.currency}{item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Checkout Summary */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-[#a6988a]">
            <span>Fast door delivery & complimentary bean grinding upon request.</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] font-bold text-xs uppercase px-6 py-2.5 rounded-lg transition-colors"
          >
            CLOSE SHOP
          </button>
        </div>
      </div>
    </div>
  );
};
