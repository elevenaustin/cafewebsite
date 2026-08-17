import React, { useState } from "react";
import { X, Search, ShoppingBag, Check } from "lucide-react";
import { MENU_ITEMS, CATEGORIES, MenuItem } from "./brew-haven-data";

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: MenuItem | null;
  onOpenOrderCheckout?: (
    item: MenuItem,
    quantity?: number,
    sizeName?: string,
    totalPrice?: number,
    customizations?: string[]
  ) => void;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  selectedItem: initialSelectedItem,
  onOpenOrderCheckout,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ item: MenuItem; count: number }[]>([]);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToOrder = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      }
      return [...prev, { item, count: 1 }];
    });
    setAddedNotice(`Added ${item.name} to order!`);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  const totalAmount = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.count,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18110b] border border-[#c89355]/30 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col relative shadow-2xl text-[#f4efe9] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#c89355]/20 flex items-center justify-between bg-[#100b07]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c89355]">
              BREW HAVEN MENU
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#f4efe9]">
              Crafted Coffee & Treats
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#a6988a] hover:text-[#c89355] transition-colors p-2 rounded-full hover:bg-white/5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Added Notification Toast */}
        {addedNotice && (
          <div className="bg-[#c89355] text-[#100b07] text-xs font-bold px-4 py-2 text-center animate-in slide-in-from-top duration-200">
            {addedNotice}
          </div>
        )}

        {/* Filter & Search Toolbar */}
        <div className="p-4 bg-[#140e08] border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-[#c89355] overflow-x-auto w-full sm:w-auto no-scrollbar gap-1.5 py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#c89355] text-[#100b07]"
                    : "bg-[#18110b] text-[#a6988a] hover:text-[#f4efe9] hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search coffee or bakery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18110b] border border-[#c89355]/30 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#f4efe9] placeholder-[#a6988a] focus:outline-none focus:border-[#c89355]"
            />
            <Search className="w-4 h-4 text-[#a6988a] absolute left-3 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#100b07] border border-white/5 hover:border-[#c89355]/40 rounded-xl p-4 flex gap-4 transition-all duration-200 group"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover bg-[#18110b] flex-shrink-0"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-lg font-medium text-[#f4efe9] group-hover:text-[#c89355] transition-colors">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-xs text-[#a6988a] line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                  <span className="font-bold text-[#c89355] text-base">
                    {item.currency}
                    {item.price}
                  </span>
                  <button
                    onClick={() => addToOrder(item)}
                    className="bg-[#c89355]/10 hover:bg-[#c89355] text-[#c89355] hover:text-[#100b07] border border-[#c89355]/40 px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Bar Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-[#100b07] border-t border-[#c89355]/30 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-[#a6988a]">Items in order: </span>
              <span className="font-bold text-[#f4efe9]">
                {cart.reduce((sum, i) => sum + i.count, 0)} items
              </span>
              <span className="ml-4 font-bold text-[#c89355] text-sm">
                Total: ₹{totalAmount}
              </span>
            </div>
            <button
              onClick={() => {
                const firstCartItem = cart[0];
                if (firstCartItem && onOpenOrderCheckout) {
                  onClose();
                  onOpenOrderCheckout(
                    firstCartItem.item,
                    firstCartItem.count,
                    undefined,
                    totalAmount
                  );
                } else {
                  alert(`Order total: ₹${totalAmount}`);
                }
              }}
              className="bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>PLACE QUICK ORDER</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
