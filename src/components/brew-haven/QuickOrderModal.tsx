import React, { useState } from "react";
import {
  X,
  ShoppingBag,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  Utensils,
  CreditCard,
  Sparkles,
  Clock,
  ChevronRight,
  Truck,
} from "lucide-react";
import { MenuItem } from "./brew-haven-data";
import { adminStore, OrderItem } from "@/lib/admin-store";

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  quantity?: number | undefined;
  sizeName?: string | undefined;
  totalPrice?: number | undefined;
  customizations?: string[] | undefined;
  onTrackOrder?: ((orderId: string) => void) | undefined;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  item,
  quantity = 1,
  sizeName,
  totalPrice,
  customizations = [],
  onTrackOrder,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderType, setOrderType] = useState<"Table Service" | "Takeaway Pickup" | "Home Delivery">("Table Service");
  const [tableOrAddress, setTableOrAddress] = useState("Table #4");
  const [paymentMethod, setPaymentMethod] = useState<"Cash on Delivery" | "UPI / QR Code" | "Card on Pickup">("UPI / QR Code");
  const [specialNotes, setSpecialNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  if (!isOpen || !item) return null;

  const itemPrice = totalPrice || item.price * quantity;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, "").length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    const orderItems: OrderItem[] = [
      {
        name: item.name,
        quantity,
        price: item.price,
        size: sizeName,
        customizations: customizations.length > 0 ? customizations : undefined,
      },
    ];

    setTimeout(() => {
      const createdOrder = adminStore.addOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        orderType,
        tableOrAddress: tableOrAddress.trim() || "Table #1",
        items: orderItems,
        totalAmount: itemPrice,
        paymentMethod,
        specialNotes: specialNotes.trim() || undefined,
      });

      setIsSubmitting(false);
      setPlacedOrderId(createdOrder.id);
    }, 600);
  };

  const handleReset = () => {
    setPlacedOrderId(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setSpecialNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#18110b] border border-[#c89355]/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-[#f4efe9]">
        
        {/* Header */}
        <div className="bg-[#201610] px-6 py-4 border-b border-[#c89355]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#c89355]/10 border border-[#c89355]/40 flex items-center justify-center text-[#c89355]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Place Direct Order
              </h2>
              <p className="text-[11px] text-[#c89355]/80">
                Send order directly to Café Kitchen & Admin Panel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {placedOrderId ? (
          /* Order Confirmation Screen */
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 text-3xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                Order Received: {placedOrderId}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-3">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{customerName}</strong>! Your order for{" "}
                <strong>{quantity}x {item.name}</strong> (₹{itemPrice}) has been sent to the café staff.
              </p>
            </div>

            <div className="p-4 bg-[#100b07] border border-[#c89355]/20 rounded-2xl text-xs space-y-1.5 text-neutral-300 text-left font-mono">
              <div>📍 <strong>Order Option:</strong> {orderType} ({tableOrAddress})</div>
              <div>💳 <strong>Payment Method:</strong> {paymentMethod}</div>
              <div>🕒 <strong>Status:</strong> Preparing in Kitchen ☕</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {onTrackOrder && placedOrderId && (
                <button
                  onClick={() => {
                    const id = placedOrderId;
                    handleReset();
                    onTrackOrder(id);
                  }}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Order Now</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-[#c89355] hover:bg-[#d89f5f] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Done & Return to Menu
              </button>
            </div>
          </div>
        ) : (
          /* Order Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Selected Item Summary Card */}
            <div className="p-3.5 bg-[#100b07] border border-[#c89355]/30 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-[11px] text-[#c89355]">
                    {quantity}x {sizeName ? `(${sizeName})` : ""} {customizations.join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-base font-bold text-white">₹{itemPrice}</div>
                <span className="text-[10px] text-neutral-400">Total Price</span>
              </div>
            </div>

            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#c89355] mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sukhwinder Singh"
                    className="w-full pl-9 pr-3 py-2 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c89355]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#c89355] mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-9 pr-3 py-2 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c89355]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Option */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#c89355] mb-1">
                Order Option
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(["Table Service", "Takeaway Pickup", "Home Delivery"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setOrderType(type);
                      if (type === "Table Service") setTableOrAddress("Table #4");
                      else if (type === "Takeaway Pickup") setTableOrAddress("Counter Pickup");
                      else setTableOrAddress("Model Town, House #42");
                    }}
                    className={`p-2 rounded-xl border text-[11px] font-bold transition-all text-center ${
                      orderType === type
                        ? "bg-[#c89355] text-black border-[#c89355]"
                        : "bg-[#100b07] text-neutral-300 border-white/10 hover:border-[#c89355]/40"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Number or Address */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#c89355] mb-1">
                {orderType === "Table Service" ? "Table Number / Seating Area" : "Pickup Time / Delivery Address"}
              </label>
              <input
                type="text"
                value={tableOrAddress}
                onChange={(e) => setTableOrAddress(e.target.value)}
                placeholder="e.g. Table #4 or Delivery Address"
                className="w-full px-3 py-2 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#c89355]"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#c89355] mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#c89355] cursor-pointer"
              >
                <option value="UPI / QR Code" className="bg-[#100b07] text-white">UPI / GPay / PhonePe / QR Code</option>
                <option value="Cash on Delivery" className="bg-[#100b07] text-white">Cash on Delivery / Pay at Counter</option>
                <option value="Card on Pickup" className="bg-[#100b07] text-white">Credit / Debit Card</option>
              </select>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#c89355] mb-1">
                Special Cooking / Preparation Notes
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Extra hot, oat milk, less sugar..."
                className="w-full px-3 py-2 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#c89355]"
              />
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#c89355] hover:bg-[#d89f5f] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(200,147,85,0.3)] transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Confirm & Send Order (₹{itemPrice})</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
