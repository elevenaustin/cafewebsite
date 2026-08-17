import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Sparkles,
  Coffee,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { CAFE } from "./brew-haven-data";

export interface FaqItem {
  id: string;
  category: "cafe" | "menu" | "booking" | "events";
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "cafe",
    question: "What are your cafe opening hours and location?",
    answer: `Forget Me Not Coffee is open daily from Monday to Sunday from 8:00 AM to 10:00 PM. We are located at ${CAFE.address}. You can easily navigate to us using Google Maps or call us directly at ${CAFE.phone}.`,
  },
  {
    id: "faq-2",
    category: "booking",
    question: "How do table reservations work? Is prior booking mandatory?",
    answer: "Walk-ins are always welcome! However, for weekend visits, special occasions, or groups larger than 4 people, we highly recommend reserving a table online through our website's 'Reserve A Table' button or via phone.",
  },
  {
    id: "faq-3",
    category: "menu",
    question: "Do you offer vegan, oat milk, or gluten-free menu options?",
    answer: "Yes! We offer oat milk and almond milk substitutes for all espresso drinks and tea lattes. Our bakery and food menu includes vegan croissants, gluten-free almond cakes, sourdough avocado toast, and fresh fruit bowls.",
  },
  {
    id: "faq-4",
    category: "cafe",
    question: "Is there high-speed Wi-Fi and power outlets for remote work?",
    answer: "Absolutely. We offer complimentary high-speed fiber Wi-Fi throughout the cafe alongside dedicated power outlets near window counters and quiet booths—making it a perfect cozy workspace.",
  },
  {
    id: "faq-5",
    category: "cafe",
    question: "Is Forget Me Not Coffee pet-friendly?",
    answer: "Yes, we love pets! Our outdoor terrace and garden courtyard are pet-friendly. We provide complimentary fresh water bowls and pet treats for your furry companions.",
  },
  {
    id: "faq-6",
    category: "menu",
    question: "Where do you source your specialty coffee beans?",
    answer: "We source 100% Arabica shade-grown coffee beans directly from micro-lot farms in Ethiopia, Colombia, and Guatemala. Our master roasters roast small batches daily to ensure peak crema, sweetness, and aroma.",
  },
  {
    id: "faq-7",
    category: "events",
    question: "Do you sell whole bean coffee and brewing equipment to take home?",
    answer: "Yes! Visit our online 'Shop' section or ask our baristas in-cafe. We sell 250g and 500g fresh bean bags, ceramic pour-over drippers, French presses, thermal travel mugs, and gift packs.",
  },
  {
    id: "faq-8",
    category: "booking",
    question: "What is your takeaway and order cancellation policy?",
    answer: "All dine-in table reservations can be canceled or rescheduled free of charge up to 1 hour prior. Takeaway coffee orders are prepared fresh upon your arrival so your beverage stays hot and aromatic.",
  },
  {
    id: "faq-9",
    category: "events",
    question: "Do you host private events, birthdays, or barista workshops?",
    answer: `Yes, we host intimate birthday gatherings, private book clubs, creative meetups, and weekend latte art workshops. Please contact us via email at ${CAFE.email} or call ${CAFE.phone} for custom event packages.`,
  },
  {
    id: "faq-10",
    category: "cafe",
    question: "What payment methods do you accept at the cafe?",
    answer: "We accept all major credit & debit cards, UPI payments (Google Pay, PhonePe, Paytm), Apple Pay, digital wallets, and cash.",
  },
];

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#100b07] text-[#f4efe9] relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c89355]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18110b] border border-[#c89355]/30 text-[#c89355] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4efe9] leading-tight">
            Frequently Asked <span className="text-[#c89355] font-semibold">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#a6988a] mt-2">
            Everything you need to know about dining, coffee sourcing, reservations, and facilities at {CAFE.name}.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. Wi-Fi, vegan, hours)..."
              className="w-full bg-[#18110b] border border-[#c89355]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#f4efe9] placeholder-[#a6988a]/60 focus:outline-none focus:border-[#c89355] transition-colors"
            />
            <Search className="w-4 h-4 text-[#c89355] absolute left-3.5 top-3 pointer-events-none" />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
            {[
              { id: "all", label: "All (10)" },
              { id: "cafe", label: "Cafe & Space" },
              { id: "menu", label: "Coffee & Food" },
              { id: "booking", label: "Reservations" },
              { id: "events", label: "Shop & Events" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? "bg-[#c89355] text-[#100b07] shadow-md font-bold"
                    : "bg-[#18110b] text-[#a6988a] hover:text-white border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#18110b] rounded-2xl border border-white/5 p-6">
              <HelpCircle className="w-8 h-8 text-[#c89355] mx-auto mb-2 opacity-50" />
              <h4 className="font-serif text-lg text-[#f4efe9]">No questions matched your search</h4>
              <p className="text-xs text-[#a6988a] mt-1">
                Try searching with different keywords like "reservation", "pet", or "coffee".
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-[#18110b] border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? "border-[#c89355]/60 shadow-[0_0_20px_rgba(200,147,85,0.1)]"
                      : "border-white/10 hover:border-[#c89355]/30"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-[#f4efe9] hover:text-[#c89355] transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#100b07] border border-white/10 flex items-center justify-center text-[#c89355] flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180 bg-[#c89355] text-[#100b07]" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#d4ceb8] leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Contact Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#18110b] via-[#100b07] to-[#18110b] border border-[#c89355]/30 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c89355]">
              STILL HAVE QUESTIONS?
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe9] font-medium">
              We're Here to Help You
            </h3>
            <p className="text-xs text-[#a6988a]">
              Reach out to our friendly baristas directly via Call or WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={CAFE.telLink}
              className="flex-1 sm:flex-none bg-[#100b07] hover:bg-[#18110b] border border-[#c89355]/40 hover:border-[#c89355] text-[#c89355] px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>

            <a
              href={CAFE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#20ba5a] text-black px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-black stroke-none" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
