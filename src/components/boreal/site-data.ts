export const CAFE = {
  name: "Boreal Café",
  street: "351 Water St",
  city: "St. John's",
  region: "NL",
  postal: "A1C 1C2",
  country: "Canada",
  phone: "+1 709-552-4809",
  phoneHref: "tel:+17095524809",
  rating: 4.9,
  reviewCount: 88,
} as const;

export const ADDRESS_LINE = `${CAFE.street}, ${CAFE.city}, ${CAFE.region} ${CAFE.postal}, ${CAFE.country}`;

export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS_LINE,
)}`;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS_LINE,
)}&output=embed`;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
] as const;
