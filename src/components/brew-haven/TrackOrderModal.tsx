import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ChefHat,
  ShoppingBag,
  MessageCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { adminStore, OrderRecord } from "@/lib/admin-store";

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string | undefined;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);
  const [userOrders, setUserOrders] = useState<OrderRecord[]>([]);
  const [remainingSec, setRemainingSec] = useState<number>(0);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  // Fetch orders on mount and listen for store updates
  const loadOrders = () => {
    const allOrders = adminStore.getOrders();
    const lastIds = adminStore.getUserLastOrders();

    // User's recent orders
    const matchedUserOrders = allOrders.filter((o) => lastIds.includes(o.id));
    setUserOrders(matchedUserOrders);

    // Default search or preselect
    const targetId = searchInput.trim() || initialOrderId || (matchedUserOrders[0]?.id || "");
    if (targetId) {
      const found = allOrders.find(
        (o) =>
          o.id.toLowerCase() === targetId.toLowerCase() ||
          o.customerPhone.includes(targetId)
      );
      if (found) {
        setActiveOrder(found);
      } else {
        setActiveOrder(null);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialOrderId) setSearchInput(initialOrderId);
      loadOrders();
    }
  }, [isOpen, initialOrderId]);

  useEffect(() => {
    const handleStoreUpdate = () => {
      loadOrders();
    };
    window.addEventListener("admin_store_updated", handleStoreUpdate);
    return () => window.removeEventListener("admin_store_updated", handleStoreUpdate);
  }, [searchInput]);

  // 1-Minute Live Cancellation Countdown Timer
  useEffect(() => {
    if (!activeOrder) return;

    const calculateRemaining = () => {
      const createdTime = activeOrder.createdTimeMs || Date.parse(activeOrder.timestamp) || Date.now();
      const elapsedSec = Math.floor((Date.now() - createdTime) / 1000);
      const remaining = Math.max(0, 60 - elapsedSec);
      setRemainingSec(remaining);
    };

    calculateRemaining();
    const timer = setInterval(calculateRemaining, 1000);
    return () => clearInterval(timer);
  }, [activeOrder]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const allOrders = adminStore.getOrders();
    const found = allOrders.find(
      (o) =>
        o.id.toLowerCase() === searchInput.trim().toLowerCase() ||
        o.customerPhone.includes(searchInput.trim())
    );
    setActiveOrder(found || null);
  };

  const handleCancelOrder = () => {
    if (!activeOrder) return;
    if (
      confirm(
        `Are you sure you want to cancel Order ${activeOrder.id}? This will notify the cafe admin immediately.`
      )
    ) {
      adminStore.updateOrderStatus(activeOrder.id, "Cancelled", "Customer");
      setCancelSuccess(true);
      setTimeout(() => setCancelSuccess(false), 4000);
      loadOrders();
    }
  };

  const getStepProgress = (status: OrderRecord["status"]) => {
    switch (status) {
      case "Pending":
        return 1;
      case "Preparing":
        return 2;
      case "Ready / Out for Delivery":
        return 3;
      case "Completed":
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#18110b] border border-[#c89355]/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-[#f4efe9] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#201610] px-6 py-4 border-b border-[#c89355]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#c89355]/10 border border-[#c89355]/40 flex items-center justify-center text-[#c89355]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Live Order Tracker & Cancellation
              </h2>
              <p className="text-[11px] text-[#c89355]/80">
                Track status in real-time or cancel within 1 minute
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

        {/* Modal Scroll Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Order Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-9401) or Phone Number..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c89355] font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#c89355] hover:bg-[#d89f5f] text-black font-bold text-xs rounded-xl transition-all"
            >
              Track Order
            </button>
          </form>

          {/* Quick Select Recent User Orders Badges */}
          {userOrders.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-neutral-400 shrink-0 font-medium">Your Recent:</span>
              {userOrders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSearchInput(o.id);
                    setActiveOrder(o);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all shrink-0 border ${
                    activeOrder?.id === o.id
                      ? "bg-[#c89355] text-black border-[#c89355] font-bold"
                      : "bg-[#100b07] text-neutral-300 border-white/10 hover:border-[#c89355]/40"
                  }`}
                >
                  {o.id}
                </button>
              ))}
            </div>
          )}

          {cancelSuccess && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2 animate-in fade-in">
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Order cancelled! Admin panel has been notified immediately.</span>
            </div>
          )}

          {/* Found Order Card */}
          {activeOrder ? (
            <div className="space-y-5">
              
              {/* Order Status Header Card */}
              <div className="p-4 bg-[#100b07] border border-[#c89355]/30 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm font-bold text-[#c89355]">
                      {activeOrder.id}
                    </span>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      Placed: {activeOrder.timestamp}
                    </div>
                  </div>
                  
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                      activeOrder.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : activeOrder.status === "Preparing"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        : activeOrder.status === "Ready / Out for Delivery"
                        ? "bg-sky-500/10 text-sky-300 border-sky-500/30"
                        : activeOrder.status === "Pending"
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {activeOrder.status}
                  </span>
                </div>

                {/* Live Order Progress Stepper */}
                {activeOrder.status !== "Cancelled" && (
                  <div className="pt-3 pb-1 border-t border-white/10">
                    <div className="grid grid-cols-4 gap-1 text-center">
                      {[
                        { step: 1, label: "Order Received", icon: Clock },
                        { step: 2, label: "Preparing ☕", icon: ChefHat },
                        { step: 3, label: "Out / Ready 🛵", icon: Truck },
                        { step: 4, label: "Fulfilled ✅", icon: CheckCircle2 },
                      ].map((s) => {
                        const currentStep = getStepProgress(activeOrder.status);
                        const isDone = currentStep >= s.step;
                        const IconComponent = s.icon;

                        return (
                          <div key={s.step} className="flex flex-col items-center gap-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                                isDone
                                  ? "bg-[#c89355] text-black border-[#c89355] shadow-md shadow-[#c89355]/30"
                                  : "bg-neutral-900 text-neutral-600 border-white/10"
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span
                              className={`text-[10px] font-semibold tracking-tight ${
                                isDone ? "text-white" : "text-neutral-500"
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* CANCELLED ORDER NOTICE */}
              {activeOrder.status === "Cancelled" && (
                <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-2xl space-y-2.5">
                  <div className="flex items-center gap-2 text-red-300 font-bold text-xs">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>
                      {activeOrder.cancelledBy === "Admin"
                        ? "⚠️ Notice: Order Cancelled by Cafe Management"
                        : "Order Cancelled by You"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {activeOrder.cancelledBy === "Admin"
                      ? `Your order ${activeOrder.id} was cancelled by the cafe team. If paid online, your refund will be processed automatically.`
                      : `You cancelled order ${activeOrder.id} within the 1-minute grace window.`}
                  </p>
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Forget%20Me%20Not%20Coffee,%20my%20Order%20${activeOrder.id}%20was%20cancelled.%20Can%20you%20please%20help?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Contact Cafe Manager on WhatsApp regarding cancellation</span>
                  </a>
                </div>
              )}

              {/* 1-MINUTE CANCELLATION SECTION */}
              {activeOrder.status !== "Cancelled" && activeOrder.status !== "Completed" && (
                <div className="p-4 bg-[#201610] border border-[#c89355]/30 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Clock className="w-4 h-4 text-[#c89355]" />
                      <span>1-Minute Order Cancellation Window</span>
                    </div>
                    {remainingSec > 0 ? (
                      <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                        ⏱️ {remainingSec}s remaining
                      </span>
                    ) : (
                      <span className="text-[11px] text-neutral-400">Window Expired</span>
                    )}
                  </div>

                  {remainingSec > 0 ? (
                    <button
                      onClick={handleCancelOrder}
                      className="w-full py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancel Order Now ({remainingSec}s remaining)</span>
                    </button>
                  ) : (
                    <div className="p-2.5 bg-[#100b07] border border-white/10 rounded-xl text-[11px] text-neutral-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        Cancellation window expired (allowed only within 1 minute of placing order). Kitchen is actively preparing your items.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Items Receipt List */}
              <div className="p-4 bg-[#100b07] border border-white/10 rounded-2xl space-y-3 text-xs">
                <div className="font-bold text-white flex justify-between border-b border-white/10 pb-2">
                  <span>Customer: {activeOrder.customerName} ({activeOrder.customerPhone})</span>
                  <span className="text-[#c89355]">📍 {activeOrder.tableOrAddress}</span>
                </div>

                <div className="space-y-2">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-neutral-300">
                      <div>
                        <span className="font-bold text-white">
                          {item.quantity}x {item.name} {item.size ? `(${item.size})` : ""}
                        </span>
                        {item.customizations && item.customizations.length > 0 && (
                          <div className="text-[10px] text-neutral-400">
                            + {item.customizations.join(", ")}
                          </div>
                        )}
                      </div>
                      <span className="font-mono text-[#c89355]">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center font-bold">
                  <span className="text-neutral-400">Total Amount:</span>
                  <span className="text-base text-emerald-400 font-mono">₹{activeOrder.totalAmount}</span>
                </div>
              </div>

              {/* Support */}
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Forget%20Me%20Not%20Coffee,%20I%20have%20a%20query%20about%20Order%20${activeOrder.id}...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => adminStore.trackWhatsAppClick("Track Order Support")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Need help? Contact Cafe Manager on WhatsApp</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-neutral-400 space-y-2">
              <Search className="w-8 h-8 text-neutral-600 mx-auto" />
              <p className="text-xs">No active order found for the entered Order ID or Phone.</p>
              <p className="text-[11px] text-neutral-500">
                Tip: Enter your Order ID (e.g. ORD-9401) or place a new order from the Menu.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
