import React from "react";
import { ArrowRight, Play } from "lucide-react";
import heroCoffeeImg from "@/assets/hero-coffee.png";
import { CAFE } from "./brew-haven-data";

interface HeroProps {
  onExploreMenu: () => void;
  onOurStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOurStory }) => {
  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen bg-[#100b07] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCoffeeImg}
          alt="Brew Haven handcrafted coffee cup with latte art"
          className="w-full h-full object-cover object-center opacity-60 scale-105 transform transition-transform duration-1000 ease-out"
        />
        {/* Gradients to match the reference image atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#100b07] via-[#100b07]/80 to-transparent w-full md:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100b07] via-transparent to-[#100b07]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow / Tagline */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-[#c89355]">
              {CAFE.heroSubtitle}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight mb-6 drop-shadow-md">
            <span className="block text-[#f4efe9]">{CAFE.heroTitle1}</span>
            <span className="block text-[#c89355] italic font-serif font-normal">{CAFE.heroTitle2}</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#d4ceb8] font-normal leading-relaxed max-w-xl mb-10">
            {CAFE.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onExploreMenu}
              className="group bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] px-8 py-4 rounded-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-lg shadow-[#c89355]/20 hover:shadow-xl hover:shadow-[#c89355]/30 transform hover:-translate-y-0.5"
            >
              <span>EXPLORE MENU</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOurStory}
              className="group border border-[#c89355]/40 hover:border-[#c89355] bg-[#100b07]/70 backdrop-blur-sm text-[#f4efe9] hover:text-[#c89355] px-7 py-4 rounded-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-3"
            >
              <span>OUR STORY</span>
              <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
