import React, { useState, useEffect } from "react";
import {
  X,
  Users,
  Calendar,
  MessageCircle,
  FileText,
  Eye,
  LogOut,
  Download,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  Key,
  ShieldAlert,
  Clock,
  Sparkles,
  Phone,
  Mail,
  ArrowUpRight,
  TrendingUp,
  ShoppingBag,
  ChefHat,
  Truck,
  Plus,
} from "lucide-react";
import {
  adminStore,
  ReservationRecord,
  WhatsAppClickRecord,
  FormSubmissionRecord,
  VisitorAnalytics,
  OrderRecord,
} from "@/lib/admin-store";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    "orders" | "reservations" | "whatsapp" | "forms" | "analytics" | "settings"
  >("orders");

  // Store data state
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [whatsappClicks, setWhatsappClicks] = useState<WhatsAppClickRecord[]>([]);
  const [formSubmissions, setFormSubmissions] = useState<FormSubmissionRecord[]>([]);
  const [visitorAnalytics, setVisitorAnalytics] = useState<VisitorAnalytics>({
    totalViews: 0,
    todayViews: 0,
    lastVisitedDate: "",
    history: [],
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [reservationStatusFilter, setReservationStatusFilter] = useState<string>("All");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");

  // Maintenance Mode state
  const [isMaintenance, setIsMaintenance] = useState(false);

  // Settings form states
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState("");

  const refreshData = () => {
    setOrders(adminStore.getOrders());
    setReservations(adminStore.getReservations());
    setWhatsappClicks(adminStore.getWhatsAppClicks());
    setFormSubmissions(adminStore.getFormSubmissions());
    setVisitorAnalytics(adminStore.getVisitorAnalytics());
    setIsMaintenance(adminStore.isMaintenanceMode());
  };

  const handleToggleMaintenance = () => {
    const next = !isMaintenance;
    adminStore.setMaintenanceMode(next);
    setIsMaintenance(next);
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
      const currentCreds = adminStore.getCredentials();
      setNewUsername(currentCreds.username);
    }
  }, [isOpen]);

  // Real-time instant data polling listener
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for live store updates across the app
  useEffect(() => {
    const handleStoreUpdate = () => {
      refreshData();
    };
    window.addEventListener("admin_store_updated", handleStoreUpdate);
    return () => window.removeEventListener("admin_store_updated", handleStoreUpdate);
  }, []);

  const handleAddTestOrder = () => {
    adminStore.addOrder({
      customerName: "Gurwinder Singh (Live Order)",
      customerPhone: "+91 99880 11223",
      customerEmail: "gurwinder.live@gmail.com",
      orderType: "Table Service",
      tableOrAddress: "Table #2 (Indoor Cozy)",
      items: [
        { name: "Iced Caramel Latte", quantity: 1, price: 310, size: "Large", customizations: ["Extra Caramel Drizzle", "Oat Milk"] },
        { name: "Double Chocolate Brownie", quantity: 1, price: 220 },
      ],
      totalAmount: 530,
      paymentMethod: "UPI / QR Code",
      specialNotes: "Instant order submitted - Kitchen active",
    });
    refreshData();
  };

  if (!isOpen) return null;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.tableOrAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      orderStatusFilter === "All" || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Reservations
  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      reservationStatusFilter === "All" || r.status === reservationStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Order Handlers
  const handleUpdateOrderStatus = (id: string, newStatus: OrderRecord["status"]) => {
    adminStore.updateOrderStatus(id, newStatus, newStatus === "Cancelled" ? "Admin" : undefined);
    refreshData();
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm(`Are you sure you want to delete order ${id}?`)) {
      adminStore.deleteOrder(id);
      refreshData();
    }
  };

  // Reservation Handlers
  const handleUpdateReservationStatus = (id: string, newStatus: ReservationRecord["status"]) => {
    adminStore.updateReservationStatus(id, newStatus);
    refreshData();
  };

  const handleDeleteReservation = (id: string) => {
    if (confirm(`Are you sure you want to delete reservation ${id}?`)) {
      adminStore.deleteReservation(id);
      refreshData();
    }
  };

  const handleDeleteForm = (id: string) => {
    adminStore.deleteFormSubmission(id);
    refreshData();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      alert("Username and password cannot be empty.");
      return;
    }
    adminStore.updateCredentials(newUsername, newPassword);
    setSettingsSuccess("Admin credentials updated successfully!");
    setTimeout(() => setSettingsSuccess(""), 3000);
  };

  const handleClearAllData = () => {
    if (
      confirm(
        "Are you sure you want to CLEAR ALL DATA in the Admin Panel? This will remove all orders, reservations, WhatsApp logs, form entries, and visitor counts."
      )
    ) {
      adminStore.clearAllData();
      refreshData();
    }
  };

  const handleResetDemoData = () => {
    if (confirm("Reset database to original demo sample data?")) {
      adminStore.resetToDemoData();
      refreshData();
    }
  };

  // CSV Export Helpers
  const exportOrdersCSV = () => {
    const headers = ["Order ID", "Customer", "Phone", "Type", "Table/Address", "Items Summary", "Total (Rs)", "Payment Method", "Special Notes", "Status", "Timestamp"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerPhone}"`,
      `"${o.orderType}"`,
      `"${o.tableOrAddress.replace(/"/g, '""')}"`,
      `"${o.items.map((i) => `${i.quantity}x ${i.name}`).join("; ")}"`,
      o.totalAmount,
      `"${o.paymentMethod}"`,
      `"${(o.specialNotes || "").replace(/"/g, '""')}"`,
      o.status,
      `"${o.timestamp}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cafe_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportReservationsCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Guests", "Date", "Time", "Seating", "Special Request", "Status", "Timestamp"];
    const rows = reservations.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.guests}"`,
      r.date,
      r.time,
      `"${r.seating}"`,
      `"${(r.specialRequest || "").replace(/"/g, '""')}"`,
      r.status,
      `"${r.timestamp}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cafe_reservations_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pendingOrdersCount = orders.filter((o) => o.status === "Pending" || o.status === "Preparing").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.totalAmount : 0), 0);
  const pendingReservationsCount = reservations.filter((r) => r.status === "Pending").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#120d09] border border-[#c89355]/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-[#f4efe9]">
        
        {/* Top Admin Header Bar */}
        <div className="bg-gradient-to-r from-[#1c140d] via-[#261b12] to-[#1c140d] px-6 py-4 border-b border-[#c89355]/25 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c89355] to-[#e5b376] flex items-center justify-center text-black font-bold text-xl shadow-[0_4px_15px_rgba(200,147,85,0.4)]">
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold tracking-wide text-white">
                  Forget Me Not Admin
                </h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-[#c89355]/80">
                Food Orders, Customer Bookings, WhatsApp Logs & Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Website Status ON/OFF Toggle */}
            <button
              onClick={handleToggleMaintenance}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 shadow-md ${
                isMaintenance
                  ? "bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30"
              }`}
              title={
                isMaintenance
                  ? "Website is currently OFFLINE (Under Maintenance). Click to turn site ONLINE."
                  : "Website is ONLINE and working. Click to turn site OFFLINE."
              }
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isMaintenance ? "bg-red-500 animate-ping" : "bg-emerald-400 animate-pulse"
                }`}
              />
              <span>Site Status: {isMaintenance ? "🔴 OFFLINE (Maintenance)" : "🟢 ONLINE (Live)"}</span>
            </button>

            <button
              onClick={handleClearAllData}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors"
              title="Clear all recorded data"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Data</span>
            </button>

            <button
              onClick={handleResetDemoData}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
              title="Reset sample demo data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick KPI Overview Cards Bar */}
        <div className="p-4 bg-[#18110b] border-b border-[#c89355]/15 grid grid-cols-2 lg:grid-cols-5 gap-3 shrink-0">
          
          {/* Card 1: Orders & Revenue */}
          <div
            onClick={() => setActiveTab("orders")}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#c89355]/15 border-[#c89355]"
                : "bg-[#100b07] border-[#c89355]/20 hover:border-[#c89355]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Food & Coffee Orders
              </span>
              <div className="p-1.5 rounded-lg bg-[#c89355]/10 text-[#c89355]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-white">
                {orders.length}
              </span>
              <span className="text-xs font-bold font-mono text-emerald-400">
                ₹{totalRevenue}
              </span>
            </div>
          </div>

          {/* Card 2: Reservations */}
          <div
            onClick={() => setActiveTab("reservations")}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "reservations"
                ? "bg-[#c89355]/15 border-[#c89355]"
                : "bg-[#100b07] border-[#c89355]/20 hover:border-[#c89355]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Table Bookings
              </span>
              <div className="p-1.5 rounded-lg bg-[#c89355]/10 text-[#c89355]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                {reservations.length}
              </span>
              {pendingReservationsCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {pendingReservationsCount} Pending
                </span>
              )}
            </div>
          </div>

          {/* Card 3: Viewers */}
          <div
            onClick={() => setActiveTab("analytics")}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-[#c89355]/15 border-[#c89355]"
                : "bg-[#100b07] border-[#c89355]/20 hover:border-[#c89355]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Total Viewers
              </span>
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                {visitorAnalytics.totalViews}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                +{visitorAnalytics.todayViews} today
              </span>
            </div>
          </div>

          {/* Card 4: WhatsApp Clicks */}
          <div
            onClick={() => setActiveTab("whatsapp")}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "whatsapp"
                ? "bg-[#c89355]/15 border-[#c89355]"
                : "bg-[#100b07] border-[#c89355]/20 hover:border-[#c89355]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                WhatsApp Clicks
              </span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                {whatsappClicks.length}
              </span>
              <span className="text-[11px] text-neutral-400">Clicks Logged</span>
            </div>
          </div>

          {/* Card 5: Form Submissions */}
          <div
            onClick={() => setActiveTab("forms")}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "forms"
                ? "bg-[#c89355]/15 border-[#c89355]"
                : "bg-[#100b07] border-[#c89355]/20 hover:border-[#c89355]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Form Submissions
              </span>
              <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                {formSubmissions.length}
              </span>
              <span className="text-[11px] text-neutral-400">Submissions</span>
            </div>
          </div>

        </div>

        {/* Tab Selection Bar */}
        <div className="px-6 bg-[#16100b] border-b border-[#c89355]/20 flex items-center justify-between overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-1 py-2">
            
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "orders"
                  ? "bg-[#c89355] text-black shadow-[0_2px_10px_rgba(200,147,85,0.3)]"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>🛒 Orders & Kitchen ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("reservations")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "reservations"
                  ? "bg-[#c89355] text-black shadow-[0_2px_10px_rgba(200,147,85,0.3)]"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>📅 Table Reservations ({reservations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "whatsapp"
                  ? "bg-[#c89355] text-black shadow-[0_2px_10px_rgba(200,147,85,0.3)]"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>💬 WhatsApp Clicks ({whatsappClicks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("forms")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "forms"
                  ? "bg-[#c89355] text-black shadow-[0_2px_10px_rgba(200,147,85,0.3)]"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>📝 Form Submissions ({formSubmissions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "analytics"
                  ? "bg-[#c89355] text-black shadow-[0_2px_10px_rgba(200,147,85,0.3)]"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>👁️ Viewers Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "settings"
                  ? "bg-[#c89355] text-black shadow-[0_2px_10px_rgba(200,147,85,0.3)]"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <Key className="w-4 h-4" />
              <span>⚙️ Security & Settings</span>
            </button>

          </div>
        </div>

        {/* Main Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: FOOD & COFFEE ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#18110b] p-3 rounded-xl border border-[#c89355]/20">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by order ID, customer name, phone, item name, address..."
                    className="w-full pl-9 pr-4 py-2 bg-[#100b07] border border-[#c89355]/20 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c89355]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#100b07] border border-[#c89355]/20 rounded-lg text-xs">
                    <Filter className="w-3.5 h-3.5 text-[#c89355]" />
                    <span className="text-neutral-400">Order Status:</span>
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="bg-transparent text-white focus:outline-none font-semibold cursor-pointer"
                    >
                      <option value="All" className="bg-[#100b07] text-white">All Statuses</option>
                      <option value="Pending" className="bg-[#100b07] text-white">Pending ⏳</option>
                      <option value="Preparing" className="bg-[#100b07] text-white">Preparing ☕</option>
                      <option value="Ready / Out for Delivery" className="bg-[#100b07] text-white">Ready / Delivery 🛵</option>
                      <option value="Completed" className="bg-[#100b07] text-white">Completed ✅</option>
                      <option value="Cancelled" className="bg-[#100b07] text-white">Cancelled ❌</option>
                    </select>
                  </div>

                  <button
                    onClick={handleAddTestOrder}
                    className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                    title="Simulate instant customer order"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ New Sample Order</span>
                  </button>

                  <button
                    onClick={exportOrdersCSV}
                    className="px-3.5 py-2 bg-[#c89355]/10 hover:bg-[#c89355]/20 border border-[#c89355]/40 text-[#c89355] hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-[#c89355]/20 bg-[#16100b]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#201610] text-[#c89355] uppercase font-mono border-b border-[#c89355]/20">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer & Option</th>
                      <th className="p-3.5">Ordered Items Details</th>
                      <th className="p-3.5">Payment & Total</th>
                      <th className="p-3.5">Special Notes</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c89355]/10 text-neutral-200">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-neutral-400">
                          No food or coffee orders match your search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#1f1610]/60 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-[#c89355]">
                            {order.id}
                            <div className="text-[10px] text-neutral-500 font-sans font-normal mt-0.5">
                              {order.timestamp}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-white text-sm">{order.customerName}</div>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                              <a href={`tel:${order.customerPhone}`} className="hover:text-[#c89355] flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#c89355]" />
                                <span>{order.customerPhone}</span>
                              </a>
                            </div>
                            <div className="text-[11px] text-neutral-300 font-semibold mt-1">
                              📍 {order.orderType}: <span className="text-[#c89355]">{order.tableOrAddress}</span>
                            </div>
                          </td>
                          <td className="p-3.5 max-w-[240px]">
                            <div className="space-y-1">
                              {order.items.map((item, iIdx) => (
                                <div key={iIdx} className="bg-[#100b07] p-2 rounded-lg border border-white/5 text-[11px]">
                                  <div className="font-bold text-white flex justify-between">
                                    <span>{item.quantity}x {item.name} {item.size ? `(${item.size})` : ""}</span>
                                    <span className="text-[#c89355] font-mono">₹{item.price * item.quantity}</span>
                                  </div>
                                  {item.customizations && item.customizations.length > 0 && (
                                    <div className="text-[10px] text-neutral-400 mt-0.5">
                                      + {item.customizations.join(", ")}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-3.5 font-mono">
                            <div className="text-base font-bold text-emerald-400">₹{order.totalAmount}</div>
                            <div className="text-[10px] text-neutral-400 mt-0.5">{order.paymentMethod}</div>
                          </td>
                          <td className="p-3.5 max-w-[180px] italic text-neutral-300">
                            {order.specialNotes || "None"}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border font-sans cursor-pointer focus:outline-none ${
                                order.status === "Completed"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : order.status === "Preparing"
                                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                  : order.status === "Ready / Out for Delivery"
                                  ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                                  : order.status === "Pending"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                                  : "bg-red-500/20 text-red-300 border-red-500/40"
                              }`}
                            >
                              <option value="Pending" className="bg-[#100b07] text-white">Pending ⏳</option>
                              <option value="Preparing" className="bg-[#100b07] text-white">Preparing ☕</option>
                              <option value="Ready / Out for Delivery" className="bg-[#100b07] text-white">Ready / Out for Delivery 🛵</option>
                              <option value="Completed" className="bg-[#100b07] text-white">Completed ✅</option>
                              <option value="Cancelled" className="bg-[#100b07] text-white">Cancelled ❌</option>
                            </select>

                            {order.status === "Cancelled" && (
                              <div
                                className={`mt-1.5 px-2 py-0.5 rounded border text-[10px] font-bold flex items-center gap-1 ${
                                  order.cancelledBy === "Customer"
                                    ? "bg-red-500/30 text-red-200 border-red-500/50 animate-pulse"
                                    : "bg-neutral-800 text-neutral-300 border-white/10"
                                }`}
                              >
                                {order.cancelledBy === "Customer" ? (
                                  <>
                                    <Users className="w-3 h-3 text-red-400" />
                                    <span>Cancelled by Customer</span>
                                  </>
                                ) : (
                                  <>
                                    <ShieldAlert className="w-3 h-3 text-amber-400" />
                                    <span>Cancelled by Admin</span>
                                  </>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              
                              {/* Send WhatsApp Order Update to Customer */}
                              <a
                                href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                  order.status === "Cancelled"
                                    ? `Hello ${order.customerName}, we regret to inform you that your order ${order.id} at Forget Me Not Coffee has been CANCELLED by cafe management. If you paid online, your refund will be processed immediately. Feel free to reply here if you have any questions.`
                                    : `Hello ${order.customerName}, your order ${order.id} at Forget Me Not Coffee is currently: *${order.status}*. Total: Rs.${order.totalAmount}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                title={order.status === "Cancelled" ? "Send Cancellation Notice on WhatsApp" : "Send WhatsApp Status Update"}
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>

                              {/* Delete Order */}
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                title="Delete Order Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: TABLE RESERVATIONS */}
          {activeTab === "reservations" && (
            <div className="space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#18110b] p-3 rounded-xl border border-[#c89355]/20">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name, phone, email, ID..."
                    className="w-full pl-9 pr-4 py-2 bg-[#100b07] border border-[#c89355]/20 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c89355]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#100b07] border border-[#c89355]/20 rounded-lg text-xs">
                    <Filter className="w-3.5 h-3.5 text-[#c89355]" />
                    <span className="text-neutral-400">Status:</span>
                    <select
                      value={reservationStatusFilter}
                      onChange={(e) => setReservationStatusFilter(e.target.value)}
                      className="bg-transparent text-white focus:outline-none font-semibold cursor-pointer"
                    >
                      <option value="All" className="bg-[#100b07] text-white">All Statuses</option>
                      <option value="Pending" className="bg-[#100b07] text-white">Pending Only</option>
                      <option value="Confirmed" className="bg-[#100b07] text-white">Confirmed Only</option>
                      <option value="Completed" className="bg-[#100b07] text-white">Completed</option>
                      <option value="Cancelled" className="bg-[#100b07] text-white">Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={exportReservationsCSV}
                    className="px-3.5 py-2 bg-[#c89355]/10 hover:bg-[#c89355]/20 border border-[#c89355]/40 text-[#c89355] hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-[#c89355]/20 bg-[#16100b]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#201610] text-[#c89355] uppercase font-mono border-b border-[#c89355]/20">
                    <tr>
                      <th className="p-3.5">Booking ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Guests & Area</th>
                      <th className="p-3.5">Date & Time</th>
                      <th className="p-3.5">Special Note</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c89355]/10 text-neutral-200">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-neutral-400">
                          No table reservations match your search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((res) => (
                        <tr key={res.id} className="hover:bg-[#1f1610]/60 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-[#c89355]">
                            {res.id}
                            <div className="text-[10px] text-neutral-500 font-sans font-normal mt-0.5">
                              {res.timestamp}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-white text-sm">{res.name}</div>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                              <a href={`tel:${res.phone}`} className="hover:text-[#c89355] flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#c89355]" />
                                <span>{res.phone}</span>
                              </a>
                            </div>
                            <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-neutral-500" />
                              <span>{res.email}</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-semibold">
                              {res.guests}
                            </span>
                            <div className="text-[11px] text-[#c89355] mt-1">
                              📍 {res.seating}
                            </div>
                          </td>
                          <td className="p-3.5 font-medium">
                            <div className="text-white flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#c89355]" />
                              <span>{res.date}</span>
                            </div>
                            <div className="text-neutral-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-neutral-500" />
                              <span>{res.time}</span>
                            </div>
                          </td>
                          <td className="p-3.5 max-w-[200px] italic text-neutral-300">
                            {res.specialRequest || "None"}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border inline-flex items-center gap-1 ${
                                res.status === "Confirmed"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  : res.status === "Pending"
                                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                  : res.status === "Completed"
                                  ? "bg-sky-500/10 text-sky-300 border-sky-500/30"
                                  : "bg-red-500/10 text-red-400 border-red-500/30"
                              }`}
                            >
                              {res.status === "Confirmed" && <CheckCircle className="w-3 h-3" />}
                              {res.status === "Pending" && <Clock className="w-3 h-3" />}
                              {res.status === "Cancelled" && <XCircle className="w-3 h-3" />}
                              {res.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              
                              {/* Quick WhatsApp customer messaging button */}
                              <a
                                href={`https://wa.me/${res.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                                  res.name
                                )},%20regarding%20your%20table%20reservation%20at%20Forget%20Me%20Not%20Coffee...`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                title="Message customer on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>

                              {/* Action: Confirm */}
                              {res.status !== "Confirmed" && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(res.id, "Confirmed")}
                                  className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded font-semibold text-[10px]"
                                  title="Approve & Confirm"
                                >
                                  Confirm
                                </button>
                              )}

                              {/* Action: Cancel */}
                              {res.status !== "Cancelled" && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(res.id, "Cancelled")}
                                  className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded font-semibold text-[10px]"
                                  title="Mark Cancelled"
                                >
                                  Cancel
                                </button>
                              )}

                              {/* Action: Delete */}
                              <button
                                onClick={() => handleDeleteReservation(res.id)}
                                className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: WHATSAPP CLICKS */}
          {activeTab === "whatsapp" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#18110b] border border-[#c89355]/20 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    WhatsApp Button Click Activity Logs
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Tracks every user who clicks to chat with your café on WhatsApp across different website sections.
                  </p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-2xl font-bold text-emerald-400">{whatsappClicks.length}</div>
                  <div className="text-[10px] text-neutral-500">Total Recorded Clicks</div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#c89355]/20 bg-[#16100b]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#201610] text-[#c89355] uppercase font-mono border-b border-[#c89355]/20">
                    <tr>
                      <th className="p-3.5">Log Entry ID</th>
                      <th className="p-3.5">Click Source / Button Location</th>
                      <th className="p-3.5">Date & Timestamp</th>
                      <th className="p-3.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c89355]/10 text-neutral-200">
                    {whatsappClicks.map((click) => (
                      <tr key={click.id} className="hover:bg-[#1f1610]/60 transition-colors">
                        <td className="p-3.5 font-mono text-[#c89355] font-bold">{click.id}</td>
                        <td className="p-3.5 font-semibold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {click.source}
                        </td>
                        <td className="p-3.5 text-neutral-400 font-mono">{click.timestamp}</td>
                        <td className="p-3.5 text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            Logged & Redirected
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FORM SUBMISSIONS & ORDERS */}
          {activeTab === "forms" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#18110b] border border-[#c89355]/20 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-400" />
                    Forms & Submissions
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Includes Newsletter subscriptions and Contact inquiries.
                  </p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-2xl font-bold text-sky-400">{formSubmissions.length}</div>
                  <div className="text-[10px] text-neutral-500">Total Form Entries</div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#c89355]/20 bg-[#16100b]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#201610] text-[#c89355] uppercase font-mono border-b border-[#c89355]/20">
                    <tr>
                      <th className="p-3.5">Submission ID</th>
                      <th className="p-3.5">Form Type</th>
                      <th className="p-3.5">Contact / Customer</th>
                      <th className="p-3.5">Details / Message</th>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c89355]/10 text-neutral-200">
                    {formSubmissions.map((form) => (
                      <tr key={form.id} className="hover:bg-[#1f1610]/60 transition-colors">
                        <td className="p-3.5 font-mono text-[#c89355] font-bold">{form.id}</td>
                        <td className="p-3.5 font-semibold text-white">
                          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30 font-mono text-[11px]">
                            {form.type}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {form.name && <div className="font-bold text-white">{form.name}</div>}
                          <div className="text-neutral-300 font-mono text-[11px]">{form.contact}</div>
                        </td>
                        <td className="p-3.5 max-w-[280px] text-neutral-300 italic">
                          {form.details}
                        </td>
                        <td className="p-3.5 font-mono text-neutral-400 text-[11px]">
                          {form.timestamp}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteForm(form.id)}
                            className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            title="Delete Submission"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: VIEWER ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Total Views Card */}
                <div className="p-5 bg-[#18110b] border border-[#c89355]/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                      Lifetime Page Views
                    </span>
                    <div className="text-4xl font-bold font-mono text-white mt-1">
                      {visitorAnalytics.totalViews}
                    </div>
                    <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Recorded across user sessions
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl">
                    👁️
                  </div>
                </div>

                {/* Today's Views Card */}
                <div className="p-5 bg-[#18110b] border border-[#c89355]/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                      Today's Viewers ({visitorAnalytics.lastVisitedDate})
                    </span>
                    <div className="text-4xl font-bold font-mono text-[#c89355] mt-1">
                      {visitorAnalytics.todayViews}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Active visitors viewing website today
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#c89355]/10 border border-[#c89355]/30 flex items-center justify-center text-[#c89355] text-2xl">
                    📊
                  </div>
                </div>

              </div>

              {/* Traffic Timeline Chart Representation */}
              <div className="p-5 bg-[#16100b] border border-[#c89355]/20 rounded-2xl space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#c89355]" />
                  Recent Daily Viewers Breakdown
                </h3>

                <div className="space-y-3 pt-2">
                  {visitorAnalytics.history.map((entry, idx) => {
                    const maxViews = Math.max(...visitorAnalytics.history.map((h) => h.views), 1);
                    const percentage = Math.min(100, Math.round((entry.views / maxViews) * 100));

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-300">{entry.date}</span>
                          <span className="text-[#c89355] font-bold">{entry.views} Viewers</span>
                        </div>
                        <div className="w-full h-3 bg-[#100b07] rounded-full overflow-hidden border border-[#c89355]/20">
                          <div
                            className="h-full bg-gradient-to-r from-[#c89355] to-[#e5b376] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: SECURITY & SETTINGS */}
          {activeTab === "settings" && (
            <div className="max-w-xl mx-auto space-y-6">
              
              {/* Maintenance Mode Control Card */}
              <div className="p-5 bg-[#16100b] border border-[#c89355]/30 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#c89355]/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#c89355] border ${
                        isMaintenance
                          ? "bg-red-500/10 border-red-500/40 text-red-400"
                          : "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                      }`}
                    >
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Website Live / Maintenance Switch</h3>
                      <p className="text-xs text-neutral-400">
                        Toggle to turn public website ON or OFF.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleMaintenance}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-lg flex items-center gap-2 ${
                      isMaintenance
                        ? "bg-red-500 text-white border-red-400 hover:bg-red-600"
                        : "bg-emerald-500 text-black border-emerald-400 hover:bg-emerald-400"
                    }`}
                  >
                    <span>{isMaintenance ? "TURN SITE ONLINE" : "TURN SITE OFFLINE"}</span>
                  </button>
                </div>

                <div className="p-3 bg-[#100b07] border border-white/10 rounded-xl text-xs flex items-center justify-between">
                  <span className="text-neutral-400">Current Public Status:</span>
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-md text-[11px] ${
                      isMaintenance
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    {isMaintenance
                      ? "🔴 OFFLINE (Visitors see Maintenance screen)"
                      : "🟢 ONLINE (Website open & working)"}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-[#16100b] border border-[#c89355]/30 rounded-2xl space-y-5">
                <div className="flex items-center gap-3 border-b border-[#c89355]/20 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c89355]/10 border border-[#c89355]/40 flex items-center justify-center text-[#c89355]">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Update Admin Password & Username</h3>
                    <p className="text-xs text-neutral-400">Change your login credentials anytime.</p>
                  </div>
                </div>

                {settingsSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{settingsSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#c89355] mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-sm text-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#c89355] mb-1">
                      New Admin Password
                    </label>
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full px-3.5 py-2.5 bg-[#100b07] border border-[#c89355]/30 rounded-xl text-sm text-white font-mono"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#c89355] hover:bg-[#d89f5f] text-black font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Save Updated Credentials
                  </button>
                </form>
              </div>

              {/* Reset Storage */}
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-red-300 text-xs">Reset Sample Data</h4>
                  <p className="text-[11px] text-neutral-400">Restore demo orders, reservations & analytics logs.</p>
                </div>
                <button
                  onClick={handleResetDemoData}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold"
                >
                  Reset Demo
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
