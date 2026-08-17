import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AdminDashboardModal } from "@/components/admin/AdminDashboardModal";
import { adminStore } from "@/lib/admin-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Forget Me Not Coffee" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    if (adminStore.isLoggedIn()) {
      setDashboardOpen(true);
    } else {
      setLoginOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#100b07] text-[#f4efe9] flex flex-col items-center justify-center p-4">
      {/* Background Decorative */}
      <div className="text-center space-y-3 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[#c89355]/10 border border-[#c89355]/40 flex items-center justify-center mx-auto text-2xl">
          ☕
        </div>
        <h1 className="font-serif text-2xl font-bold text-white">
          Forget Me Not Coffee — Admin Portal
        </h1>
        <p className="text-xs text-neutral-400">
          Redirecting to secure login interface...
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#18110b] hover:bg-[#201610] border border-[#c89355]/30 rounded-xl text-xs text-[#c89355] hover:text-white transition-colors"
          >
            ← Return to Public Cafe Website
          </a>
        </div>
      </div>

      <AdminLoginModal
        isOpen={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          window.location.href = "/";
        }}
        onLoginSuccess={() => {
          setLoginOpen(false);
          setDashboardOpen(true);
        }}
      />

      <AdminDashboardModal
        isOpen={dashboardOpen}
        onClose={() => {
          setDashboardOpen(false);
          window.location.href = "/";
        }}
        onLogout={() => {
          adminStore.setLoggedIn(false);
          setDashboardOpen(false);
          setLoginOpen(true);
        }}
      />
    </div>
  );
}
