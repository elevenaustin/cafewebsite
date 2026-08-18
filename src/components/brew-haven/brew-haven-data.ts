import classicCappuccinoImg from "@/assets/classic-cappuccino.png";
import icedCaramelLatteImg from "@/assets/iced-caramel-latte.png";
import mochaDelightImg from "@/assets/mocha-delight.png";
import blueberryCheesecakeImg from "@/assets/blueberry-cheesecake.png";
import heroCoffeeImg from "@/assets/hero-coffee.png";
import cafeAmbienceImg from "@/assets/cafe-ambience.png";

export const CAFE = {
  name: "Forget Me Not Coffee",
  tagline: "COFFEE & CAFE",
  heroSubtitle: "✨ YOUR ARTISANAL SANCTUARY",
  heroTitle1: "Every Sip A Story,",
  heroTitle2: "Every Cup Pure Magic",
  heroDescription:
    "Savor roasted single-origin Arabica brews, silky artisanal foams, and handcrafted sweet delights — lovingly served in an ambiance designed for pure warmth and connection.",
  address: "Forget Me Not Coffee",
  mapsUrl: "https://maps.app.goo.gl/5spbRwWCh6JEQNgG8",
  hours: "Mon – Sun | 8:00 AM – 10:00 PM",
  phone: "+91 7717526430",
  telLink: "tel:+917717526430",
  whatsappLink: "https://wa.me/917717526430?text=Hello%20Cafe",
  email: "pendugpt@demo.com",
  emailLink: "mailto:pendugpt@demo.com",
  ambienceImage: cafeAmbienceImg,
  socials: {
    instagram: "https://instagram.com/pendugpt",
    instagramHandle: "@pendugpt",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in INR ₹ as per reference image
  currency: string;
  category: "coffee" | "cold-brews" | "tea" | "bakery" | "desserts" | "snacks";
  image: string;
  popular?: boolean;
  rating?: number;
  reviewsCount?: number;
  ingredients?: string[];
  sizes?: { name: string; priceOffset: number }[];
  customizations?: { name: string; price: number }[];
}

export const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "coffee", label: "Hot Coffee" },
  { id: "cold-brews", label: "Cold Brews" },
  { id: "tea", label: "Artisan Tea" },
  { id: "bakery", label: "Bakery" },
  { id: "desserts", label: "Desserts" },
  { id: "snacks", label: "Snacks" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "classic-cappuccino",
    name: "Classic Cappuccino",
    description: "Rich 100% Arabica espresso topped with thick, creamy microfoam and a cocoa dusting.",
    price: 180,
    currency: "₹",
    category: "coffee",
    image: classicCappuccinoImg,
    popular: true,
    rating: 4.9,
    reviewsCount: 142,
    ingredients: ["Arabica Double Espresso", "Steamed Whole Milk", "Velvet Foam Layer", "Cocoa Powder"],
    sizes: [
      { name: "Regular (250ml)", priceOffset: 0 },
      { name: "Large (350ml)", priceOffset: 40 },
    ],
    customizations: [
      { name: "Extra Espresso Shot", price: 30 },
      { name: "Oat Milk Substitute", price: 25 },
      { name: "Vanilla Syrup Drizzle", price: 20 },
    ],
  },
  {
    id: "iced-caramel-latte",
    name: "Iced Caramel Latte",
    description: "Smooth double espresso poured over chilled milk, ice cubes & homemade caramel drizzle.",
    price: 220,
    currency: "₹",
    category: "cold-brews",
    image: icedCaramelLatteImg,
    popular: true,
    rating: 4.8,
    reviewsCount: 198,
    ingredients: ["Espresso Blend", "Cold Whole Milk", "Caramel Sauce", "Ice Cubes"],
    sizes: [
      { name: "Regular (350ml)", priceOffset: 0 },
      { name: "Large (480ml)", priceOffset: 50 },
    ],
    customizations: [
      { name: "Almond Milk", price: 25 },
      { name: "Extra Caramel Drizzle", price: 15 },
      { name: "Whipped Cream Top", price: 20 },
    ],
  },
  {
    id: "mocha-delight",
    name: "Mocha Delight",
    description: "Harmonious blend of dark Belgium cocoa chocolate, double espresso shot & velvety milk.",
    price: 200,
    currency: "₹",
    category: "coffee",
    image: mochaDelightImg,
    popular: true,
    rating: 4.9,
    reviewsCount: 116,
    ingredients: ["Belgian Dark Cocoa", "Double Espresso Shot", "Steamed Milk", "Chocolate Shavings"],
    sizes: [
      { name: "Regular (280ml)", priceOffset: 0 },
      { name: "Large (380ml)", priceOffset: 40 },
    ],
    customizations: [
      { name: "Extra Chocolate Shavings", price: 15 },
      { name: "Marshmallows", price: 20 },
    ],
  },
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    description: "New York style rich cheesecake topped with wild blueberry compote and graham crust.",
    price: 160,
    currency: "₹",
    category: "desserts",
    image: blueberryCheesecakeImg,
    popular: true,
    rating: 5.0,
    reviewsCount: 230,
    ingredients: ["Cream Cheese", "Wild Blueberry Glaze", "Graham Crust", "Pure Vanilla Extract"],
    sizes: [
      { name: "Single Slice", priceOffset: 0 },
      { name: "Double Slice", priceOffset: 140 },
    ],
    customizations: [
      { name: "Extra Blueberry Sauce", price: 25 },
      { name: "Vanilla Ice Cream Scoop", price: 40 },
    ],
  },
  {
    id: "artisan-espresso-double",
    name: "Artisan Double Espresso",
    description: "Concentrated double extraction boasting hazelnut notes and a dense golden crema.",
    price: 140,
    currency: "₹",
    category: "coffee",
    image: heroCoffeeImg,
    popular: false,
    rating: 4.7,
    reviewsCount: 89,
    ingredients: ["Single-Origin Ethiopian Arabica Beans", "Filtered Mineral Water"],
    sizes: [
      { name: "Double Shot (60ml)", priceOffset: 0 },
      { name: "Triple Shot (90ml)", priceOffset: 35 },
    ],
  },
  {
    id: "velvet-flat-white",
    name: "Velvet Flat White",
    description: "Micro-foamed silk milk poured gently over double ristretto for a strong yet smooth flavor.",
    price: 190,
    currency: "₹",
    category: "coffee",
    image: classicCappuccinoImg,
    popular: false,
    rating: 4.8,
    reviewsCount: 74,
    ingredients: ["Double Ristretto", "Micro-Foamed Steamed Milk"],
    sizes: [
      { name: "Standard 6oz", priceOffset: 0 },
      { name: "Large 8oz", priceOffset: 30 },
    ],
  },
  {
    id: "nitro-vanilla-cold-brew",
    name: "Nitro Vanilla Cold Brew",
    description: "Slow-steeped for 18 hours, infused with pure Madagascar vanilla and nitrogen cascade.",
    price: 240,
    currency: "₹",
    category: "cold-brews",
    image: icedCaramelLatteImg,
    popular: true,
    rating: 4.9,
    reviewsCount: 165,
    ingredients: ["18-Hour Cold Brew Concentrate", "Madagascar Vanilla Bean", "Nitrogen Gas Infusion"],
    sizes: [
      { name: "Regular (350ml)", priceOffset: 0 },
      { name: "Large (480ml)", priceOffset: 45 },
    ],
  },
  {
    id: "flaky-french-croissant",
    name: "Flaky French Butter Croissant",
    description: "Golden flaky pastry baked fresh every morning with imported Normandy AOP butter.",
    price: 150,
    currency: "₹",
    category: "bakery",
    image: blueberryCheesecakeImg,
    popular: true,
    rating: 4.8,
    reviewsCount: 156,
    ingredients: ["French Wheat Flour", "Normandy Butter", "Organic Cane Sugar", "Sea Salt"],
    customizations: [
      { name: "Warm & Buttered", price: 0 },
      { name: "Nutella Filling", price: 30 },
      { name: "Almond Cream & Flakes", price: 35 },
    ],
  },
  {
    id: "ceremonial-matcha-latte",
    name: "Ceremonial Uji Matcha Latte",
    description: "First-harvest ceremonial grade Japanese green tea whisked with silky oat milk.",
    price: 230,
    currency: "₹",
    category: "tea",
    image: mochaDelightImg,
    popular: true,
    rating: 4.9,
    reviewsCount: 104,
    ingredients: ["Ceremonial Uji Matcha Powder", "Oat Milk", "Touch of Organic Agave"],
    sizes: [
      { name: "Hot (280ml)", priceOffset: 0 },
      { name: "Iced Over Ice (350ml)", priceOffset: 20 },
    ],
  },
  {
    id: "avocado-sourdough-toast",
    name: "Avocado Sourdough Toast",
    description: "Artisan sourdough topped with smashed avocado, cherry tomatoes, feta & chili flakes.",
    price: 260,
    currency: "₹",
    category: "snacks",
    image: heroCoffeeImg,
    popular: false,
    rating: 4.7,
    reviewsCount: 68,
    ingredients: ["Toasted Sourdough", "Hass Avocado", "French Feta", "Cherry Tomatoes", "Extra Virgin Olive Oil"],
  },
];

export const HIGHLIGHTS = [
  {
    icon: "beans",
    title: "PREMIUM BEANS",
    description: "Sourced from the finest coffee farms worldwide.",
  },
  {
    icon: "barista",
    title: "EXPERT BARISTAS",
    description: "Passionate baristas crafting your perfect cup.",
  },
  {
    icon: "ambience",
    title: "COZY AMBIENCE",
    description: "A warm and welcoming space to relax.",
  },
  {
    icon: "love",
    title: "MADE WITH LOVE",
    description: "Every cup is made with care and passion.",
  },
];

export const FOOTER_FEATURES = [
  {
    icon: "wifi",
    title: "FREE WI-FI",
    description: "Stay connected while you enjoy.",
  },
  {
    icon: "outdoor",
    title: "OUTDOOR SEATING",
    description: "Enjoy your coffee in our cozy outdoor space.",
  },
  {
    icon: "takeaway",
    title: "TAKEAWAY",
    description: "Your favorite coffee, wherever you go.",
  },
  {
    icon: "rewards",
    title: "LOYALTY REWARDS",
    description: "Earn points and get exciting rewards.",
  },
];
