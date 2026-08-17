import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { CAFE } from "./brew-haven-data";
import { adminStore } from "@/lib/admin-store";

export const FloatingContactWidget: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end animate-in slide-in-from-bottom-5 duration-300">
      {/* WhatsApp Floating Button */}
      <a
        href={CAFE.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => adminStore.trackWhatsAppClick("Floating Contact Widget")}
        className="group bg-[#25D366] hover:bg-[#20ba5a] text-black px-4 py-2.5 rounded-full font-bold text-xs shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center gap-2 transition-all transform hover:scale-105"
        title="Chat on WhatsApp with 'Hello Cafe'"
      >
        <MessageCircle className="w-5 h-5 text-black fill-current stroke-none" />
        <span className="hidden sm:inline font-bold">WhatsApp Us</span>
      </a>

      {/* Call Direct Floating Button */}
      <a
        href={CAFE.telLink}
        className="group bg-[#100b07] hover:bg-[#18110b] border border-[#c89355] text-[#c89355] hover:text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-[0_4px_20px_rgba(200,147,85,0.3)] flex items-center gap-2 transition-all transform hover:scale-105"
        title={`Call ${CAFE.phone}`}
      >
        <Phone className="w-4 h-4 text-[#c89355] group-hover:text-white" />
        <span className="hidden sm:inline font-bold">Call Cafe</span>
      </a>
    </div>
  );
};
