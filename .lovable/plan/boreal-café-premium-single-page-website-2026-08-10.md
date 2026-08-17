# Boreal Café — Premium Single-Page Website

A custom-designed, editorial café site for Boreal Café (351 Water St, St. John's, NL) built to drive one action: **visit in person**.

## Visual identity

- **Palette (warm boreal):** deep forest green primary, warm espresso brown secondary, soft ivory background, light beige surfaces, deep charcoal text, muted moss accent. No gradients, no neon, light-first.
- **Typography:** editorial serif for headings (Cormorant / Instrument Serif direction), clean sans for body (Karla / Work Sans direction), loaded via a font `<link>` in the root route.
- **Motion:** gentle fade/slide reveals on scroll, subtle image scale on hover, sticky nav that condenses after scroll. Full `prefers-reduced-motion` support.

## Page structure (single page, anchor-scrolled)

1. **Nav** — wordmark, links (About, Menu, Experience, Reviews, Visit), primary "Get Directions". Polished mobile sheet menu, sticky after scroll.
2. **Hero** — full-bleed atmospheric café image, headline "Coffee, comfort and a little time to slow down.", Water Street subline, CTAs: Get Directions (primary), View Menu.
3. **Introduction** — "A place to settle in." Short experience-led copy; comfortable seating, art on the walls, books and games. No invented history.
4. **Experience** — 4 editorial cards: Coffee & Tea, Something Sweet, Settle In, Bring Your People.
5. **Menu highlights** — "A little something for every kind of café day." Categories: Coffee, Tea, Pastries, Food, Vegan Options, with clearly marked `[MENU ITEM]` / `[DESCRIPTION]` / `[PRICE]` placeholders and a "View Full Menu" button. No invented items or prices.
6. **Gallery** — asymmetric editorial masonry with varied proportions (coffee, interior, seating, pastries, exterior/Water Street, details).
7. **Reviews** — 4.9 ★ / 88 reviews displayed tastefully, plus review-theme cards (atmosphere, service, coffee, seating, quiet, location) written as themes, not fabricated quotes; slots ready for real verified reviews.
8. **Visit** — "Find us on Water Street." Address, phone, `[BUSINESS HOURS]` placeholder, Dine-in / Takeaway only, embedded Google map, Get Directions + Call Café.
9. **Final CTA** — "Your next coffee stop is on Water Street." Get Directions + View Menu.
10. **Footer** — brand, address, phone, nav links, copyright. No invented socials.

## Imagery

Generated warm, cinematic, natural-light café photography (hero, interior, seating, coffee, pastries, exterior street context), saved to `src/assets` and imported directly. Descriptive alt text throughout; lazy loading below the fold. Real photos can replace these later 1:1.

## Content honesty

Only verified facts are stated: name, address, phone, rating/review count, dine-in/takeaway. Hours, menu items and prices remain visible placeholders.

## Technical notes

- Built on the existing TanStack Start template; the page replaces `src/routes/index.tsx` (currently the blank placeholder).
- Design tokens (colors, radius, fonts, shadows) defined in `src/styles.css` under `@theme inline` / `:root` — no hardcoded color utilities in components.
- Sections split into small components under `src/components/boreal/` (Nav, Hero, Intro, Experience, Menu, Gallery, Reviews, Visit, FinalCta, Footer) plus a shared `Reveal` scroll-animation wrapper.
- SEO: route-level `head()` with local title/description/og/twitter, canonical, and `LocalBusiness`/`CafeOrCoffeeShop` JSON-LD using only verified data.
- Accessibility: semantic landmarks, single H1, visible focus rings, keyboard-operable mobile menu, contrast-checked palette.
- No backend, accounts, or ecommerce.
