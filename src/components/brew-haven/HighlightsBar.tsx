import React from "react";
import { Coffee, Award, Sparkles, Heart } from "lucide-react";
import { HIGHLIGHTS } from "./brew-haven-data";

export const HighlightsBar: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "beans":
        return <Award className="w-5 h-5 text-[#b87d4b]" />;
      case "barista":
        return <Coffee className="w-5 h-5 text-[#b87d4b]" />;
      case "ambience":
        return <Sparkles className="w-5 h-5 text-[#b87d4b]" />;
      case "love":
        return <Heart className="w-5 h-5 text-[#b87d4b]" />;
      default:
        return <Coffee className="w-5 h-5 text-[#b87d4b]" />;
    }
  };

  return (
    <section className="bg-[#faf5ef] border-y border-[#ebdccb] py-8 sm:py-10 relative z-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={index}
              className="group bg-[#ffffff] rounded-2xl p-5 border border-[#e8dac8] shadow-sm hover:shadow-md hover:border-[#c89355] transition-all duration-300 flex items-start gap-4 transform hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f7ece0] to-[#eedbc7] border border-[#e2cfb9] group-hover:border-[#c89355] flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-xs">
                {getIcon(item.icon)}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#1c120c] group-hover:text-[#b87d4b] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#635343] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
