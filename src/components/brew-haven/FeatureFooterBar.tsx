import React, { useState } from "react";
import {
  Wifi,
  Sun,
  Coffee,
  Gift,
  Send,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { FOOTER_FEATURES, CAFE } from "./brew-haven-data";
import { PolicyModal, PolicyType } from "./PolicyModal";
import { adminStore } from "@/lib/admin-store";

interface FeatureFooterBarProps {
  onOpenAdmin?: () => void;
}

export const FeatureFooterBar: React.FC<FeatureFooterBarProps> = ({ onOpenAdmin }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Policy Modal state
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>("privacy");

  const openPolicy = (policy: PolicyType) => {
    setActivePolicy(policy);
    setPolicyModalOpen(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Save newsletter subscription to Admin Panel
      adminStore.addFormSubmission({
        type: "Newsletter",
        contact: email.trim(),
        details: "Subscribed to coffee brew newsletter & offers via footer bar",
      });

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "wifi":
        return <Wifi className="w-5 h-5 text-[#c89355]" />;
      case "outdoor":
        return <Sun className="w-5 h-5 text-[#c89355]" />;
      case "takeaway":
        return <Coffee className="w-5 h-5 text-[#c89355]" />;
      case "rewards":
        return <Gift className="w-5 h-5 text-[#c89355]" />;
      default:
        return <Coffee className="w-5 h-5 text-[#c89355]" />;
    }
  };

  return (
    <footer className="bg-[#100b07] text-[#f4efe9] border-t border-[#c89355]/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Features Column (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FOOTER_FEATURES.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-2">
                  <div className="w-10 h-10 rounded-lg bg-[#18110b] border border-[#c89355]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getFeatureIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4efe9] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#a6988a] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cafe Contact Quick Info Strip */}
            <div className="bg-[#18110b] border border-[#c89355]/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#d4ceb8]">
              <a
                href={CAFE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#c89355] transition-colors truncate"
              >
                <MapPin className="w-4 h-4 text-[#c89355] flex-shrink-0" />
                <span className="truncate">{CAFE.address}</span>
              </a>

              <a
                href={CAFE.telLink}
                className="flex items-center gap-2.5 hover:text-[#c89355] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c89355] flex-shrink-0" />
                <span>{CAFE.phone}</span>
              </a>

              <a
                href={CAFE.emailLink}
                className="flex items-center gap-2.5 hover:text-[#c89355] transition-colors truncate"
              >
                <Mail className="w-4 h-4 text-[#c89355] flex-shrink-0" />
                <span className="truncate">{CAFE.email}</span>
              </a>

              <a
                href={CAFE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md flex-shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Newsletter & Socials (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c89355] block mb-1">
                STAY IN THE LOOP
              </span>
              <p className="text-xs text-[#d4ceb8] font-medium mb-3">
                Subscribe for offers, seasonal roasts & updates
              </p>

              {subscribed ? (
                <div className="bg-[#18110b] border border-[#c89355]/50 rounded-md p-3 text-xs text-[#c89355] flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#c89355]" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-[#18110b] border border-[#c89355]/30 rounded-md px-3.5 py-2.5 text-xs text-[#f4efe9] placeholder-[#a6988a] focus:outline-none focus:border-[#c89355] flex-grow"
                  />
                  <button
                    type="submit"
                    className="bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] p-2.5 rounded-md transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a6988a] block mb-2">
                FOLLOW US
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={CAFE.socials?.instagram || "https://instagram.com/pendugpt"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#c89355]/30 bg-[#18110b] flex items-center justify-center text-[#d4ceb8] hover:text-[#c89355] hover:border-[#c89355] transition-all transform hover:scale-105"
                  aria-label="Instagram"
                  title="Instagram (@pendugpt)"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={CAFE.socials?.facebook || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#c89355]/30 bg-[#18110b] flex items-center justify-center text-[#d4ceb8] hover:text-[#c89355] hover:border-[#c89355] transition-all transform hover:scale-105"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={CAFE.socials?.youtube || "https://youtube.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#c89355]/30 bg-[#18110b] flex items-center justify-center text-[#d4ceb8] hover:text-[#c89355] hover:border-[#c89355] transition-all transform hover:scale-105"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Legal Policies & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#a6988a]">
          <p>© {new Date().getFullYear()} <strong className="text-[#f4efe9]">{CAFE.name}</strong> {CAFE.tagline}. All rights reserved.</p>
          
          {/* Valid Working Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            <button
              onClick={() => openPolicy("privacy")}
              className="hover:text-[#c89355] transition-colors focus:outline-none"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => openPolicy("terms")}
              className="hover:text-[#c89355] transition-colors focus:outline-none"
            >
              Terms of Service
            </button>
            <button
              onClick={() => openPolicy("refund")}
              className="hover:text-[#c89355] transition-colors focus:outline-none"
            >
              Refund Policy
            </button>
            <button
              onClick={() => openPolicy("accessibility")}
              className="hover:text-[#c89355] transition-colors focus:outline-none"
            >
              Accessibility
            </button>
            <button
              onClick={() => openPolicy("cookies")}
              className="hover:text-[#c89355] transition-colors focus:outline-none"
            >
              Cookie Policy
            </button>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-1 rounded bg-[#c89355]/15 hover:bg-[#c89355]/25 border border-[#c89355]/30 text-[#c89355] hover:text-white font-bold transition-all flex items-center gap-1.5 focus:outline-none"
                title="Open Cafe Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Policy Modal Container */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        defaultPolicy={activePolicy}
      />
    </footer>
  );
};
