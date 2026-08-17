import React, { useState } from "react";
import { X, Image as ImageIcon, Heart, ZoomIn, Coffee } from "lucide-react";
import classicCappuccinoImg from "@/assets/classic-cappuccino.png";
import icedCaramelLatteImg from "@/assets/iced-caramel-latte.png";
import mochaDelightImg from "@/assets/mocha-delight.png";
import blueberryCheesecakeImg from "@/assets/blueberry-cheesecake.png";
import heroCoffeeImg from "@/assets/hero-coffee.png";
import cafeAmbienceImg from "@/assets/cafe-ambience.png";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: "ambience" | "drinks" | "bakery" | "baristas";
  image: string;
  likes: number;
  caption: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Warm Cafe Ambience",
    category: "ambience",
    image: cafeAmbienceImg,
    likes: 342,
    caption: "Our cozy rustic wooden seating bathed in warm evening golden light.",
  },
  {
    id: "g2",
    title: "Signature Pour Over Craft",
    category: "baristas",
    image: heroCoffeeImg,
    likes: 418,
    caption: "Master barista precise water pour extraction for single-origin Ethiopian beans.",
  },
  {
    id: "g3",
    title: "Classic Creamy Cappuccino",
    category: "drinks",
    image: classicCappuccinoImg,
    likes: 529,
    caption: "Silky microfoam art crafted fresh for every morning cup.",
  },
  {
    id: "g4",
    title: "Iced Salted Caramel Latte",
    category: "drinks",
    image: icedCaramelLatteImg,
    likes: 612,
    caption: "Chilled espresso layers with house-made caramel drizzle and cold milk.",
  },
  {
    id: "g5",
    title: "New York Blueberry Cheesecake",
    category: "bakery",
    image: blueberryCheesecakeImg,
    likes: 780,
    caption: "Rich creamy cheesecake topped with fresh wild blueberry compote.",
  },
  {
    id: "g6",
    title: "Belgian Chocolate Mocha Delight",
    category: "drinks",
    image: mochaDelightImg,
    likes: 495,
    caption: "Decadent melted cocoa cocoa powder blend topped with dark chocolate flakes.",
  },
];

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const filteredPhotos =
    selectedCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === selectedCategory);

  const handleLike = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18110b] border border-[#c89355]/30 rounded-2xl max-w-4xl w-full p-5 sm:p-8 relative shadow-2xl text-[#f4efe9] max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89355] block">
              VISUAL MOMENTS & MEMORIES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#f4efe9]">
              Brew Haven Gallery
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[#a6988a] hover:text-[#c89355] transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar border-b border-white/5">
          {[
            { id: "all", label: "All Photos" },
            { id: "ambience", label: "Atmosphere & Cafe" },
            { id: "drinks", label: "Artisan Coffee & Beverages" },
            { id: "bakery", label: "Pastries & Desserts" },
            { id: "baristas", label: "Barista Craft" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#c89355] text-[#100b07]"
                  : "bg-[#100b07] text-[#a6988a] hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {filteredPhotos.map((photo) => {
            const currentLikes = photo.likes + (likes[photo.id] || 0);
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative h-56 rounded-xl overflow-hidden border border-[#c89355]/20 hover:border-[#c89355] cursor-pointer bg-[#100b07] transition-all hover:shadow-xl"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100b07] via-[#100b07]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#100b07]/80 backdrop-blur-sm border border-[#c89355]/40 text-[#c89355] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {photo.category}
                    </span>
                    <button
                      onClick={(e) => handleLike(e, photo.id)}
                      className="bg-black/60 hover:bg-[#c89355] text-white hover:text-[#100b07] p-1.5 rounded-full transition-colors flex items-center gap-1 text-[10px] font-bold"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{currentLikes}</span>
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-medium text-[#f4efe9] group-hover:text-[#c89355] transition-colors leading-tight">
                      {photo.title}
                    </h3>
                    <p className="text-[11px] text-[#d4ceb8] line-clamp-1 mt-0.5">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-3 rounded-full text-[#c89355]">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-[#a6988a]">
            <span>Tag <a href="https://instagram.com/pendugpt" target="_blank" rel="noopener noreferrer" className="text-[#c89355] hover:underline font-bold">@pendugpt</a> on Instagram to be featured!</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] font-bold text-xs uppercase px-6 py-2.5 rounded-lg transition-colors"
          >
            CLOSE GALLERY
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Active Photo */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#18110b] border border-[#c89355]/40 rounded-2xl max-w-2xl w-full p-5 relative overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 bg-black/60 text-white hover:text-[#c89355] p-2 rounded-full z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-80 sm:h-96 rounded-xl overflow-hidden border border-white/10 mb-4 bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl font-normal text-[#f4efe9]">
                {activePhoto.title}
              </h3>
              <button
                onClick={(e) => handleLike(e, activePhoto.id)}
                className="bg-[#c89355] text-[#100b07] px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>{activePhoto.likes + (likes[activePhoto.id] || 0)} Likes</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#d4ceb8] leading-relaxed">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
