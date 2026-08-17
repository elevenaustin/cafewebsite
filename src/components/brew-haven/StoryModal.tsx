import React, { useState } from "react";
import {
  X,
  Award,
  Coffee,
  Heart,
  Sparkles,
  Flame,
  Globe2,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import heroCoffeeImg from "@/assets/hero-coffee.png";
import cafeAmbienceImg from "@/assets/cafe-ambience.png";
import classicCappuccinoImg from "@/assets/classic-cappuccino.png";
import { CAFE } from "./brew-haven-data";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation?: () => void;
  onExploreMenu?: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
  onExploreMenu,
}) => {
  const [activeTab, setActiveTab] = useState<"heritage" | "roasting" | "space">(
    "heritage"
  );

  if (!isOpen) return null;

  const TASTING_NOTES = [
    { name: "Dark Belgian Cocoa", intensity: 94, note: "Deep & Rich" },
    { name: "Roasted Hazelnut & Walnut", intensity: 88, note: "Nutty Warmth" },
    { name: "Caramel Sweetness", intensity: 85, note: "Smooth Finish" },
    { name: "Wild Berry Acidity", intensity: 78, note: "Subtle Floral" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#18110b] border border-[#c89355]/40 rounded-3xl max-w-3xl w-full p-5 sm:p-8 relative shadow-[0_0_50px_rgba(200,147,85,0.15)] text-[#f4efe9] max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Decorative Ambient Background Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#c89355]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-[#c89355]/10 blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#c89355] animate-ping" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#c89355]">
                HERITAGE & ARTISAN CRAFT
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#f4efe9]">
              The Story of <span className="text-[#c89355] font-semibold">{CAFE.name}</span>
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

        {/* Interactive Story Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-white/5 relative z-10 no-scrollbar">
          {[
            { id: "heritage", label: "Our Heritage & Beans", icon: Globe2 },
            { id: "roasting", label: "The Roasting Art", icon: Flame },
            { id: "space", label: "Cozy Sanctuary", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#c89355] to-[#b87d4b] text-[#100b07] shadow-lg shadow-[#c89355]/20 font-bold scale-[1.02]"
                    : "bg-[#100b07] text-[#a6988a] hover:text-white border border-white/10 hover:border-[#c89355]/40"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#100b07]" : "text-[#c89355]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-6 relative z-10">

          {/* TAB 1: OUR HERITAGE & BEANS */}
          {activeTab === "heritage" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              {/* Feature Hero Graphic Banner */}
              <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#c89355]/30 group shadow-2xl">
                <img
                  src={heroCoffeeImg}
                  alt={`${CAFE.name} Artisan Roastery`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-[#18110b]/40 to-transparent" />
                
                {/* Floating Badge on Image */}
                <div className="absolute top-3 left-3 bg-[#100b07]/90 backdrop-blur-md border border-[#c89355]/50 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-[#c89355]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>100% Shade-Grown Micro-Lots</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c89355]">
                    ETHICALLY SOURCED WORLDWIDE
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe9] font-medium leading-tight">
                    From Shade-Grown Micro-Farms Direct to Your Cup
                  </h3>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#d4ceb8] leading-relaxed">
                <div className="bg-[#100b07] p-4 rounded-2xl border border-white/5 space-y-2">
                  <h4 className="font-serif text-base text-[#f4efe9] font-semibold flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#c89355]" />
                    <span>Our Founding Passion</span>
                  </h4>
                  <p>
                    Founded as a cozy haven for true coffee enthusiasts, <strong className="text-[#f4efe9]">{CAFE.name}</strong> was born from a simple belief: that extraordinary coffee can transform an ordinary moment into a memorable ritual.
                  </p>
                </div>

                <div className="bg-[#100b07] p-4 rounded-2xl border border-white/5 space-y-2">
                  <h4 className="font-serif text-base text-[#f4efe9] font-semibold flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#c89355]" />
                    <span>Ethical Direct Sourcing</span>
                  </h4>
                  <p>
                    We partner directly with family-owned micro-farms in Ethiopia, Colombia, and Guatemala. Every crop is hand-harvested at peak ripeness to ensure unparalleled sweetness, purity, and complexity.
                  </p>
                </div>
              </div>

              {/* Tasting Profile Chart Section */}
              <div className="bg-[#100b07] border border-[#c89355]/20 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base text-[#f4efe9] font-semibold flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#c89355]" />
                    <span>Signature Flavor Profile & Tasting Notes</span>
                  </h4>
                  <span className="text-[10px] text-[#c89355] font-bold uppercase tracking-wider">
                    Medium-Dark Roast
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {TASTING_NOTES.map((note, idx) => (
                    <div key={idx} className="bg-[#18110b] p-3 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-[#f4efe9]">{note.name}</span>
                        <span className="text-[10px] text-[#c89355] font-bold">{note.note}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#100b07] rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#c89355] to-[#e0af70] rounded-full transition-all duration-1000"
                          style={{ width: `${note.intensity}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE ROASTING ART */}
          {activeTab === "roasting" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#c89355]/30 group shadow-2xl">
                <img
                  src={classicCappuccinoImg}
                  alt="Barista Coffee Roasting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-[#18110b]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c89355]">
                    SMALL-BATCH DAILY ROASTING
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe9] font-medium leading-tight">
                    Crafted in Small Batches for Peak Freshness & Crema
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#100b07] border border-white/5 p-4 rounded-xl text-center">
                  <Flame className="w-6 h-6 text-[#c89355] mx-auto mb-2" />
                  <div className="font-serif text-xl font-bold text-[#f4efe9]">212°C</div>
                  <div className="text-[10px] text-[#a6988a] uppercase tracking-wider mt-0.5">Precise Roast Curve</div>
                </div>
                <div className="bg-[#100b07] border border-white/5 p-4 rounded-xl text-center">
                  <Award className="w-6 h-6 text-[#c89355] mx-auto mb-2" />
                  <div className="font-serif text-xl font-bold text-[#f4efe9]">100%</div>
                  <div className="text-[10px] text-[#a6988a] uppercase tracking-wider mt-0.5">Specialty Grade Arabica</div>
                </div>
                <div className="bg-[#100b07] border border-white/5 p-4 rounded-xl text-center">
                  <Heart className="w-6 h-6 text-[#c89355] mx-auto mb-2" />
                  <div className="font-serif text-xl font-bold text-[#f4efe9]">Zero</div>
                  <div className="text-[10px] text-[#a6988a] uppercase tracking-wider mt-0.5">Artificial Additives</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#d4ceb8] leading-relaxed bg-[#100b07] p-4 rounded-2xl border border-white/5">
                Our head roasters continuously monitor humidity, airflow, and drum temperature during roasting. This meticulous attention prevents bitter charring and reveals natural notes of cocoa butter, toasted almonds, and stone fruit sweetness.
              </p>
            </div>
          )}

          {/* TAB 3: COZY SANCTUARY */}
          {activeTab === "space" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#c89355]/30 group shadow-2xl">
                <img
                  src={cafeAmbienceImg}
                  alt={`${CAFE.name} Ambience`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-[#18110b]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c89355]">
                    WARM & INSPIRING SPACE
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe9] font-medium leading-tight">
                    Designed for Comfort, Work, & Connection
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#d4ceb8]">
                <div className="bg-[#100b07] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#c89355] flex-shrink-0" />
                  <span>High-speed fiber Wi-Fi & convenient laptop power outlets</span>
                </div>
                <div className="bg-[#100b07] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#c89355] flex-shrink-0" />
                  <span>Spacious indoor seating & peaceful outdoor terrace</span>
                </div>
                <div className="bg-[#100b07] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#c89355] flex-shrink-0" />
                  <span>Pet-friendly courtyard with fresh water bowls</span>
                </div>
                <div className="bg-[#100b07] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#c89355] flex-shrink-0" />
                  <span>Acoustic background jazz & ambient lighting</span>
                </div>
              </div>
            </div>
          )}

          {/* Sacred Promises Cards Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { title: "100% Arabica", subtitle: "Single Origin" },
              { title: "Fresh Daily", subtitle: "Small Batch" },
              { title: "Handcrafted", subtitle: "Barista Pour" },
              { title: "Pet Friendly", subtitle: "Cozy Spaces" },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-[#100b07] border border-[#c89355]/20 hover:border-[#c89355]/60 p-3 rounded-xl text-center transition-all hover:scale-[1.03]"
              >
                <div className="font-serif text-sm font-bold text-[#f4efe9]">
                  {card.title}
                </div>
                <div className="text-[10px] text-[#c89355] uppercase font-semibold mt-0.5">
                  {card.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action CTA Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 text-xs text-[#a6988a] w-full sm:w-auto">
            <ShieldCheck className="w-4 h-4 text-[#c89355] flex-shrink-0" />
            <span>Open Mon–Sun | 8:00 AM – 10:00 PM</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {onExploreMenu && (
              <button
                onClick={onExploreMenu}
                className="flex-1 sm:flex-none bg-[#100b07] hover:bg-[#18110b] text-[#c89355] border border-[#c89355]/40 hover:border-[#c89355] px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                EXPLORE MENU
              </button>
            )}

            {onOpenReservation && (
              <button
                onClick={onOpenReservation}
                className="flex-1 sm:flex-none bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>RESERVE TABLE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-white/5 hover:bg-white/10 text-[#f4efe9] font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
