import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { Nav } from "@/components/brew-haven/Nav";
import { Hero } from "@/components/brew-haven/Hero";
import { HighlightsBar } from "@/components/brew-haven/HighlightsBar";
import { SpecialtiesSection } from "@/components/brew-haven/SpecialtiesSection";
import { FaqSection } from "@/components/brew-haven/FaqSection";
import { FeatureFooterBar } from "@/components/brew-haven/FeatureFooterBar";
import { ReservationModal } from "@/components/brew-haven/ReservationModal";
import { FullMenuModal } from "@/components/brew-haven/FullMenuModal";
import { StoryModal } from "@/components/brew-haven/StoryModal";
import { DirectionsModal } from "@/components/brew-haven/DirectionsModal";
import { ShopModal } from "@/components/brew-haven/ShopModal";
import { GalleryModal } from "@/components/brew-haven/GalleryModal";
import { FloatingContactWidget } from "@/components/brew-haven/FloatingContactWidget";
import { QuickOrderModal } from "@/components/brew-haven/QuickOrderModal";
import { TrackOrderModal } from "@/components/brew-haven/TrackOrderModal";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AdminDashboardModal } from "@/components/admin/AdminDashboardModal";
import { CAFE, MenuItem, MENU_ITEMS } from "@/components/brew-haven/brew-haven-data";
import { adminStore } from "@/lib/admin-store";

const TITLE = `${CAFE.name} — Good Coffee, Great Moments`;
const DESCRIPTION =
  `${CAFE.heroDescription} ${CAFE.address}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: CAFE.name,
          telephone: CAFE.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: CAFE.address,
          },
          servesCuisine: "Coffee",
          description: `${CAFE.name} — ${CAFE.heroDescription}`,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  // Quick Order & Tracking State
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [quickOrderItem, setQuickOrderItem] = useState<MenuItem | null>(null);
  const [quickOrderQty, setQuickOrderQty] = useState(1);
  const [quickOrderSize, setQuickOrderSize] = useState<string | undefined>(undefined);
  const [quickOrderTotalPrice, setQuickOrderTotalPrice] = useState<number | undefined>(undefined);
  const [quickOrderCustomizations, setQuickOrderCustomizations] = useState<string[]>([]);
  const [trackOrderOpen, setTrackOrderOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState<string | undefined>(undefined);

  // Admin Portal state
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Maintenance Mode state & live listener
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  // Live Admin Cancellation Alert State
  const [cancelledAlertOrder, setCancelledAlertOrder] = useState<any | null>(null);

  useEffect(() => {
    setIsMaintenanceMode(adminStore.isMaintenanceMode());
    const checkCancelledOrders = () => {
      setIsMaintenanceMode(adminStore.isMaintenanceMode());
      const userLastIds = adminStore.getUserLastOrders();
      const allOrders = adminStore.getOrders();
      const cancelledByAdmin = allOrders.find(
        (o) => userLastIds.includes(o.id) && o.status === "Cancelled" && o.cancelledBy === "Admin"
      );
      if (cancelledByAdmin) {
        setCancelledAlertOrder(cancelledByAdmin);
      }
    };

    checkCancelledOrders();
    const interval = setInterval(checkCancelledOrders, 1000);
    window.addEventListener("admin_store_updated", checkCancelledOrders);
    return () => {
      clearInterval(interval);
      window.removeEventListener("admin_store_updated", checkCancelledOrders);
    };
  }, []);

  // Track page view and check for direct ?admin=true or #admin link on mount
  useEffect(() => {
    adminStore.trackPageView();

    if (
      typeof window !== "undefined" &&
      (window.location.search.includes("admin") || window.location.hash.includes("admin"))
    ) {
      if (adminStore.isLoggedIn()) {
        setAdminDashboardOpen(true);
      } else {
        setAdminLoginOpen(true);
      }
    }
  }, []);

  const handleOpenAdminPortal = () => {
    if (adminStore.isLoggedIn()) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleSelectMenuItem = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setMenuOpen(true);
  };

  // MAINTENANCE MODE SCREEN
  if (isMaintenanceMode) {
    return (
      <div className="min-h-screen bg-[#100b07] text-[#f4efe9] flex flex-col items-center justify-center p-6 text-center selection:bg-[#c89355] selection:text-[#100b07]">
        <div className="max-w-lg w-full bg-[#18110b] border border-[#c89355]/30 rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] space-y-6 relative overflow-hidden">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Café Temporarily Offline</span>
          </div>

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[#c89355]/10 border border-[#c89355]/40 flex items-center justify-center mx-auto text-4xl shadow-[0_10px_30px_rgba(200,147,85,0.2)]">
            ☕
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
              We'll Be Back Soon!
            </h1>
            <p className="text-sm text-[#d4ceb8] leading-relaxed">
              {CAFE.name} is currently undergoing brief maintenance & menu updates to serve you better.
            </p>
          </div>

          {/* Store Hours & Quick Contacts */}
          <div className="p-4 bg-[#100b07] border border-[#c89355]/20 rounded-2xl text-xs space-y-3 text-[#d4ceb8]">
            <p className="font-semibold text-[#c89355]">For Urgent Queries or Special Orders:</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={CAFE.telLink}
                className="px-3.5 py-2 rounded-xl bg-[#18110b] hover:bg-[#201610] border border-[#c89355]/40 text-[#c89355] font-bold flex items-center gap-1.5 transition-colors"
              >
                📞 Call {CAFE.phone}
              </a>
              <a
                href={CAFE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => adminStore.trackWhatsAppClick("Maintenance Screen")}
                className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold flex items-center gap-1.5 transition-colors"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Footer Admin Link */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span>© {new Date().getFullYear()} {CAFE.name}</span>
            <button
              onClick={handleOpenAdminPortal}
              className="px-3 py-1 rounded-lg bg-[#c89355]/10 hover:bg-[#c89355]/20 border border-[#c89355]/30 text-[#c89355] hover:text-white font-bold transition-all"
            >
              🔒 Admin Login
            </button>
          </div>

        </div>

        {/* Modals for Admin Access */}
        <AdminLoginModal
          isOpen={adminLoginOpen}
          onClose={() => setAdminLoginOpen(false)}
          onLoginSuccess={() => {
            setAdminLoginOpen(false);
            setAdminDashboardOpen(true);
          }}
        />

        <AdminDashboardModal
          isOpen={adminDashboardOpen}
          onClose={() => setAdminDashboardOpen(false)}
          onLogout={() => {
            adminStore.setLoggedIn(false);
            setAdminDashboardOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#100b07] text-[#f4efe9] font-sans antialiased selection:bg-[#c89355] selection:text-[#100b07]">
      {/* Top Header Navigation */}
      <Nav
        onOpenReservation={() => setReservationOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenStory={() => setStoryOpen(true)}
        onOpenDirections={() => setDirectionsOpen(true)}
        onOpenShop={() => setShopOpen(true)}
        onOpenGallery={() => setGalleryOpen(true)}
        onOpenAdmin={handleOpenAdminPortal}
        onOpenTrackOrder={() => setTrackOrderOpen(true)}
      />

      <main>
        {/* Hero Banner Section */}
        <Hero
          onExploreMenu={() => setMenuOpen(true)}
          onOurStory={() => setStoryOpen(true)}
        />

        {/* 4 Value Proposition Highlights Bar */}
        <HighlightsBar />

        {/* Our Specialties Grid & Visit Us Side Panel */}
        <SpecialtiesSection
          onViewFullMenu={() => setMenuOpen(true)}
          onGetDirections={() => setDirectionsOpen(true)}
          onOpenReservation={() => setReservationOpen(true)}
          onSelectMenuItem={handleSelectMenuItem}
          onOpenOrderCheckout={(item, qty, size, price, custom) => {
            setQuickOrderItem(item);
            setQuickOrderQty(qty || 1);
            setQuickOrderSize(size);
            setQuickOrderTotalPrice(price);
            setQuickOrderCustomizations(custom || []);
            setQuickOrderOpen(true);
          }}
        />

        {/* Frequently Asked Questions (FAQ) Section */}
        <FaqSection />
      </main>

      {/* Feature Footer Bar & Newsletter */}
      <FeatureFooterBar onOpenAdmin={handleOpenAdminPortal} />

      {/* Modals */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      <FullMenuModal
        isOpen={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          setSelectedMenuItem(null);
        }}
        selectedItem={selectedMenuItem}
        onOpenOrderCheckout={(item, qty, size, price, custom) => {
          setQuickOrderItem(item);
          setQuickOrderQty(qty || 1);
          setQuickOrderSize(size);
          setQuickOrderTotalPrice(price);
          setQuickOrderCustomizations(custom || []);
          setQuickOrderOpen(true);
        }}
      />

      <StoryModal
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
        onOpenReservation={() => {
          setStoryOpen(false);
          setReservationOpen(true);
        }}
        onExploreMenu={() => {
          setStoryOpen(false);
          setMenuOpen(true);
        }}
      />

      <DirectionsModal
        isOpen={directionsOpen}
        onClose={() => setDirectionsOpen(false)}
      />

      <ShopModal
        isOpen={shopOpen}
        onClose={() => setShopOpen(false)}
        onOpenOrderCheckout={(item, qty, size, price, custom) => {
          setQuickOrderItem(item);
          setQuickOrderQty(qty || 1);
          setQuickOrderSize(size);
          setQuickOrderTotalPrice(price);
          setQuickOrderCustomizations(custom || []);
          setQuickOrderOpen(true);
        }}
      />

      <GalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      {/* Customer Quick Order Checkout Modal */}
      <QuickOrderModal
        isOpen={quickOrderOpen}
        onClose={() => {
          setQuickOrderOpen(false);
          setQuickOrderItem(null);
        }}
        item={quickOrderItem}
        quantity={quickOrderQty}
        sizeName={quickOrderSize}
        totalPrice={quickOrderTotalPrice}
        customizations={quickOrderCustomizations}
        onTrackOrder={(orderId) => {
          setTrackOrderId(orderId);
          setTrackOrderOpen(true);
        }}
      />

      {/* Customer Order Tracker & Cancellation Modal */}
      <TrackOrderModal
        isOpen={trackOrderOpen}
        onClose={() => setTrackOrderOpen(false)}
        initialOrderId={trackOrderId}
      />

      {/* Admin Security Modals */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setAdminLoginOpen(false);
          setAdminDashboardOpen(true);
        }}
      />

      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        onLogout={() => {
          adminStore.setLoggedIn(false);
          setAdminDashboardOpen(false);
        }}
      />

      {/* Floating Action Quick Contact Widget (Call & WhatsApp) */}
      <FloatingContactWidget />

      {/* Live Admin Cancellation Alert Floating Toast */}
      {cancelledAlertOrder && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-40 max-w-sm bg-[#1e130c] border border-red-500/50 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom duration-300 text-xs text-[#f4efe9]">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-red-300 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>⚠️ Order Cancelled by Cafe Admin</span>
            </div>
            <button
              onClick={() => setCancelledAlertOrder(null)}
              className="text-neutral-400 hover:text-white font-bold px-1"
            >
              ✕
            </button>
          </div>
          <p className="mt-1.5 text-neutral-300">
            Your order <strong className="font-mono text-amber-400">{cancelledAlertOrder.id}</strong> has been cancelled by cafe management.
          </p>
          <div className="mt-2.5 flex gap-2">
            <button
              onClick={() => {
                setTrackOrderId(cancelledAlertOrder.id);
                setTrackOrderOpen(true);
                setCancelledAlertOrder(null);
              }}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold rounded-lg border border-red-500/40 text-[11px] transition-all"
            >
              View Details & WhatsApp Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
