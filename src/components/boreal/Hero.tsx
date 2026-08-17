import { MapPin } from "lucide-react";

import heroImage from "@/assets/hero-cafe.jpg";
import { GhostLink, PrimaryLink } from "./Buttons";
import { CAFE, DIRECTIONS_URL } from "./site-data";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden">
      <img
        src={heroImage}
        alt="Cup of coffee with latte art on a wooden table inside the warm, plant-filled Boreal Café interior"
        width={1600}
        height={1104}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-espresso)_88%,transparent)_0%,color-mix(in_oklab,var(--color-espresso)_45%,transparent)_45%,color-mix(in_oklab,var(--color-espresso)_55%,transparent)_100%)]"
      />

      <div className="mx-auto flex min-h-[92svh] max-w-[1340px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <div className="max-w-3xl text-espresso-foreground">
          <p className="eyebrow flex items-center gap-2 opacity-90">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Water Street · {CAFE.city}, {CAFE.region}
          </p>
          <h1 className="mt-6 text-balance font-serif text-[2.9rem] leading-[1.03] sm:text-6xl lg:text-[5.2rem]">
            Coffee, comfort and a little time to slow down.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-90 sm:text-lg">
            A cozy café on Water Street in St. John's, serving coffee, tea and café
            favourites in a space made for lingering.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-espresso-foreground text-espresso hover:bg-surface hover:text-espresso"
            >
              Get Directions
            </PrimaryLink>
            <GhostLink href="#menu" className="text-espresso-foreground">
              View Menu
            </GhostLink>
          </div>
        </div>
      </div>
    </section>
  );
}
