import React from "react";
import { X, MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { CAFE } from "./brew-haven-data";

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const mapsUrl =
    CAFE.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      CAFE.address
    )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18110b] border border-[#c89355]/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-[#f4efe9]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a6988a] hover:text-[#c89355] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89355] block mb-1">
          FIND US
        </span>
        <h2 className="font-serif text-3xl font-normal text-[#f4efe9] mb-4">
          Visit {CAFE.name}
        </h2>

        {/* Map Preview Mockup */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-44 rounded-xl bg-[#100b07] border border-[#c89355]/30 hover:border-[#c89355] overflow-hidden mb-6 flex flex-col items-center justify-center text-center p-4 group transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#c89355]/20 border border-[#c89355] flex items-center justify-center text-[#c89355] mb-2 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6 animate-bounce" />
          </div>
          <span className="font-serif text-lg font-medium text-[#f4efe9] group-hover:text-[#c89355] transition-colors">
            {CAFE.address}
          </span>
          <span className="text-xs text-[#a6988a] mt-0.5">
            Click to open in Google Maps ↗
          </span>
        </a>

        {/* Contact info list */}
        <div className="space-y-3 text-xs mb-6 bg-[#100b07] p-4 rounded-xl border border-white/5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#d4ceb8] hover:text-[#c89355] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#c89355] flex-shrink-0" />
            <span className="font-medium">{CAFE.address}</span>
          </a>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#c89355] flex-shrink-0" />
            <span className="text-[#d4ceb8]">{CAFE.hours}</span>
          </div>
          <a
            href={CAFE.telLink}
            className="flex items-center gap-3 text-[#d4ceb8] hover:text-[#c89355] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#c89355] flex-shrink-0" />
            <span>{CAFE.phone}</span>
          </a>
          <a
            href={CAFE.emailLink}
            className="flex items-center gap-3 text-[#d4ceb8] hover:text-[#c89355] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#c89355] flex-shrink-0" />
            <span>{CAFE.email}</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <a
            href={CAFE.telLink}
            className="bg-[#100b07] hover:bg-[#18110b] text-[#c89355] border border-[#c89355]/40 hover:border-[#c89355] font-bold text-xs uppercase py-3 rounded-lg tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Phone className="w-4 h-4 text-[#c89355]" />
            <span>CALL DIRECTLY</span>
          </a>

          <a
            href={CAFE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase py-3 rounded-lg tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-black stroke-[2.5]" />
            <span>WHATSAPP US</span>
          </a>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] font-bold text-xs uppercase py-3.5 rounded-lg tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <span>OPEN IN GOOGLE MAPS</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
