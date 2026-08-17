import React, { useState, useEffect } from "react";
import { X, Star, Plus, Minus, ShoppingBag, CheckCircle, Sparkles } from "lucide-react";
import { MenuItem } from "./brew-haven-data";

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (
    item: MenuItem,
    quantity: number,
    selectedSize?: string,
    totalPrice?: number,
    customizations?: string[]
  ) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedSizeIndex(0);
      setSelectedCustomizations([]);
      setQuantity(1);
      setAdded(false);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const basePrice = item.price;
  const sizeOffset = item.sizes ? item.sizes[selectedSizeIndex]?.priceOffset || 0 : 0;
  const customOffset = selectedCustomizations.reduce((acc, cName) => {
    const cObj = item.customizations?.find((c) => c.name === cName);
    return acc + (cObj ? cObj.price : 0);
  }, 0);

  const unitPrice = basePrice + sizeOffset + customOffset;
  const totalPrice = unitPrice * quantity;

  const toggleCustomization = (name: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleAdd = () => {
    setAdded(true);
    if (onAddToCart) {
      const sizeName = item.sizes ? item.sizes[selectedSizeIndex]?.name : undefined;
      onAddToCart(item, quantity, sizeName, totalPrice, selectedCustomizations);
    }
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#18110b] border border-[#c89355]/30 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-[#f4efe9] relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#100b07]/80 backdrop-blur-md border border-[#c89355]/30 flex items-center justify-center text-[#f4efe9] hover:text-[#c89355] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 no-scrollbar">
          
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#100b07]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-[#18110b]/40 to-transparent" />

            {/* Badges */}
            <div className="absolute bottom-4 left-6 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#c89355] text-[#100b07]">
                {item.category}
              </span>
              {item.rating && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#100b07]/80 backdrop-blur-md border border-[#c89355]/40 text-[#f4efe9] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-[#c89355] text-[#c89355]" />
                  <span>{item.rating}</span>
                  {item.reviewsCount && (
                    <span className="text-[#a6988a] text-[10px]">({item.reviewsCount})</span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Modal Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title & Price Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-3xl font-semibold text-[#f4efe9]">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#a6988a] mt-1.5 leading-relaxed max-w-lg">
                  {item.description}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs text-[#a6988a] block uppercase tracking-wider font-semibold">
                  Unit Price
                </span>
                <span className="font-sans text-2xl font-bold text-[#c89355]">
                  {item.currency}{unitPrice}
                </span>
              </div>
            </div>

            {/* Ingredients Tags */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c89355] block mb-2.5">
                  Key Tasting Ingredients
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#100b07] border border-white/10 text-xs text-[#d4ceb8] flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#c89355]" />
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Variant Options */}
            {item.sizes && item.sizes.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c89355] block mb-2.5">
                  Select Size
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {item.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedSizeIndex === idx
                          ? "bg-[#c89355]/15 border-[#c89355] text-[#f4efe9]"
                          : "bg-[#100b07] border-white/10 text-[#a6988a] hover:border-white/20"
                      }`}
                    >
                      <span>{s.name}</span>
                      <span className="text-[#c89355]">
                        {s.priceOffset > 0 ? `+${item.currency}${s.priceOffset}` : "Standard"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Customizations */}
            {item.customizations && item.customizations.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c89355] block mb-2.5">
                  Customizations
                </span>
                <div className="space-y-2">
                  {item.customizations.map((c, idx) => {
                    const isChecked = selectedCustomizations.includes(c.name);
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleCustomization(c.name)}
                        className={`w-full p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          isChecked
                            ? "bg-[#c89355]/10 border-[#c89355] text-[#f4efe9]"
                            : "bg-[#100b07] border-white/10 text-[#a6988a] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked ? "bg-[#c89355] border-[#c89355]" : "border-white/30"
                            }`}
                          >
                            {isChecked && <CheckCircle className="w-3 h-3 text-[#100b07]" />}
                          </div>
                          <span>{c.name}</span>
                        </div>
                        <span className="text-[#c89355] font-semibold">
                          +{item.currency}{c.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-6 bg-[#100b07] border-t border-[#c89355]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-[#18110b] border border-white/10 rounded-xl px-4 py-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-[#a6988a] hover:text-[#c89355] p-1 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm min-w-[20px] text-center text-[#f4efe9]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#a6988a] hover:text-[#c89355] p-1 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Action Button */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] hover:shadow-xl hover:shadow-[#c89355]/20"
            }`}
          >
            {added ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>ADDED TO ORDER!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>
                  ADD TO ORDER • {item.currency}{totalPrice}
                </span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
