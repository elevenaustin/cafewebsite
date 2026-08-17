import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  FileText,
  RefreshCw,
  Eye,
  Cookie,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { CAFE } from "./brew-haven-data";

export type PolicyType =
  | "privacy"
  | "terms"
  | "refund"
  | "accessibility"
  | "cookies";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPolicy?: PolicyType;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  defaultPolicy = "privacy",
}) => {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(defaultPolicy);

  // Sync activePolicy when defaultPolicy changes
  React.useEffect(() => {
    if (defaultPolicy) {
      setActivePolicy(defaultPolicy);
    }
  }, [defaultPolicy]);

  if (!isOpen) return null;

  const POLICIES: {
    id: PolicyType;
    title: string;
    icon: React.ElementType;
    updated: string;
  }[] = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: ShieldCheck,
      updated: "August 2026",
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: FileText,
      updated: "August 2026",
    },
    {
      id: "refund",
      title: "Refund & Cancellation",
      icon: RefreshCw,
      updated: "August 2026",
    },
    {
      id: "accessibility",
      title: "Accessibility Statement",
      icon: Eye,
      updated: "August 2026",
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      icon: Cookie,
      updated: "August 2026",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#18110b] border border-[#c89355]/40 rounded-3xl max-w-4xl w-full p-5 sm:p-8 relative shadow-[0_0_50px_rgba(200,147,85,0.15)] text-[#f4efe9] max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#c89355] block">
              LEGAL & GOVERNANCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#f4efe9]">
              {CAFE.name} Policy Center
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#100b07] border border-white/10 hover:border-[#c89355] text-[#a6988a] hover:text-[#c89355] transition-all flex items-center justify-center shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-white/5 no-scrollbar">
          {POLICIES.map((p) => {
            const Icon = p.icon;
            const isActive = activePolicy === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePolicy(p.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#c89355] text-[#100b07] shadow-md font-bold scale-[1.02]"
                    : "bg-[#100b07] text-[#a6988a] hover:text-white border border-white/10 hover:border-[#c89355]/40"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#100b07]" : "text-[#c89355]"}`} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-6 text-xs sm:text-sm text-[#d4ceb8] leading-relaxed">
          
          {/* PRIVACY POLICY */}
          {activePolicy === "privacy" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-[#100b07] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#f4efe9] font-medium">
                    Privacy & Data Protection Policy
                  </h3>
                  <p className="text-[11px] text-[#a6988a]">Last updated: August 2026</p>
                </div>
                <Lock className="w-6 h-6 text-[#c89355]" />
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">1. Information We Collect</h4>
                <p>
                  At <strong className="text-[#f4efe9]">{CAFE.name}</strong>, we respect your privacy. When you make a table reservation, subscribe to our newsletter, or place a coffee/merchandise order through our shop, we collect necessary contact information including your name, email address (<strong className="text-[#c89355]">{CAFE.email}</strong>), and phone number (<strong className="text-[#c89355]">{CAFE.phone}</strong>).
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">2. How We Use Your Data</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To confirm table reservations and send booking updates.</li>
                  <li>To process shop orders, door delivery, and digital receipts.</li>
                  <li>To send seasonal specialty coffee offers (only if opted into our newsletter).</li>
                  <li>To improve cafe services, food menu offerings, and website usability.</li>
                </ul>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">3. Data Security & Protection</h4>
                <p>
                  We implement industry-standard SSL encryption and strict data access policies. We never sell, rent, or lease your personal information to third-party advertisers.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">4. Your Data Rights</h4>
                <p>
                  You have the full right to request access, correction, or deletion of your personal data at any time by contacting our Privacy Officer at <strong className="text-[#c89355]">{CAFE.email}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {activePolicy === "terms" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-[#100b07] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#f4efe9] font-medium">
                    Terms & Conditions of Service
                  </h3>
                  <p className="text-[11px] text-[#a6988a]">Last updated: August 2026</p>
                </div>
                <FileText className="w-6 h-6 text-[#c89355]" />
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">1. Table Reservations Policy</h4>
                <p>
                  Table reservations reserved via our website are held for up to 15 minutes past the scheduled arrival time. Please inform us via phone at <strong className="text-[#c89355]">{CAFE.phone}</strong> if you are running late.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">2. Cafe Code of Conduct</h4>
                <p>
                  We strive to maintain a warm, welcoming, and peaceful sanctuary for all guests. We offer complimentary high-speed Wi-Fi and power outlets for working guests. We kindly request guests to use headphones when playing audio.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">3. Shop Orders & Pricing</h4>
                <p>
                  All menu and coffee bean shop prices are listed in Indian Rupees (₹) inclusive of applicable taxes. We reserve the right to modify menu availability based on daily bean roast batches.
                </p>
              </div>
            </div>
          )}

          {/* REFUND & CANCELLATION */}
          {activePolicy === "refund" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-[#100b07] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#f4efe9] font-medium">
                    Refund & Cancellation Policy
                  </h3>
                  <p className="text-[11px] text-[#a6988a]">Last updated: August 2026</p>
                </div>
                <RefreshCw className="w-6 h-6 text-[#c89355]" />
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">1. Table Reservation Cancellation</h4>
                <p>
                  Table reservations can be canceled or rescheduled free of charge up to 1 hour prior to the booking time directly online or by calling <strong className="text-[#c89355]">{CAFE.phone}</strong>.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">2. Food & Beverage Guarantee</h4>
                <p>
                  If you are unsatisfied with your coffee extraction or food item quality, please notify your barista immediately. We will happily remake your beverage or offer an instant replacement free of charge.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">3. Merchandise & Coffee Bean Returns</h4>
                <p>
                  Unopened whole bean coffee bags and defective brewing equipment can be returned or exchanged within 7 days of purchase with valid proof of purchase.
                </p>
              </div>
            </div>
          )}

          {/* ACCESSIBILITY STATEMENT */}
          {activePolicy === "accessibility" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-[#100b07] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#f4efe9] font-medium">
                    Accessibility & Inclusivity Statement
                  </h3>
                  <p className="text-[11px] text-[#a6988a]">Last updated: August 2026</p>
                </div>
                <Eye className="w-6 h-6 text-[#c89355]" />
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">1. Digital Accessibility Standards</h4>
                <p>
                  <strong className="text-[#f4efe9]">{CAFE.name}</strong> is committed to ensuring digital accessibility for individuals with disabilities. We continuously audit and optimize our web application to conform to WCAG 2.1 Level AA standards.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">2. Physical Cafe Accessibility</h4>
                <p>
                  Our physical cafe space features wheelchair-accessible ramps, step-free main entrance, accessible seating arrangements, and pet-friendly outdoor seating for service animals.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">3. Accessibility Assistance</h4>
                <p>
                  If you encounter any difficulty navigating our website or accessing any feature, please email us at <strong className="text-[#c89355]">{CAFE.email}</strong> or call <strong className="text-[#c89355]">{CAFE.phone}</strong> for immediate assistance.
                </p>
              </div>
            </div>
          )}

          {/* COOKIE POLICY */}
          {activePolicy === "cookies" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-[#100b07] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#f4efe9] font-medium">
                    Cookie & Local Storage Policy
                  </h3>
                  <p className="text-[11px] text-[#a6988a]">Last updated: August 2026</p>
                </div>
                <Cookie className="w-6 h-6 text-[#c89355]" />
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">1. What Are Cookies?</h4>
                <p>
                  Cookies are small text files stored locally on your device to ensure smooth website navigation, retain your cart items, and remember your session preferences.
                </p>

                <h4 className="font-serif text-base text-[#f4efe9] font-semibold">2. Essential Cookies We Use</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Session Cookies:</strong> Remember your selected menu category and modal views.</li>
                  <li><strong>Cart Cookies:</strong> Store items added to your shop cart.</li>
                  <li><strong>Security Cookies:</strong> Protect form submissions against unauthorized requests.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 text-[#a6988a]">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#c89355]" />
              <strong className="text-[#f4efe9]">{CAFE.email}</strong>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#c89355]" />
              <strong className="text-[#f4efe9]">{CAFE.phone}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] font-bold text-xs uppercase px-6 py-2.5 rounded-xl transition-colors shadow-md"
          >
            CLOSE POLICY CENTER
          </button>
        </div>
      </div>
    </div>
  );
};
