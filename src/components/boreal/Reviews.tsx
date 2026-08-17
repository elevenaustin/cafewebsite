import { Star } from "lucide-react";

import { Reveal } from "./Reveal";
import { CAFE } from "./site-data";

const THEMES = [
  {
    title: "The atmosphere",
    body: "Guests describe the room as cozy and calm — a quieter place to sit than most.",
  },
  {
    title: "The service",
    body: "Friendly staff is one of the things visitors mention most often.",
  },
  {
    title: "The coffee",
    body: "Coffee and tea are consistently called out in reviews.",
  },
  {
    title: "The seating",
    body: "Comfortable chairs and family-friendly tables come up again and again.",
  },
  {
    title: "The pastries",
    body: "Café treats and vegan options are a regular highlight.",
  },
  {
    title: "The location",
    body: "An easy stop right on Water Street in downtown St. John's.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">
        <Reveal className="grid gap-10 border-b border-border pb-12 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div>
            <div className="flex items-end gap-3">
              <span className="font-serif text-7xl leading-none">{CAFE.rating}</span>
              <span aria-hidden className="mb-2 flex gap-1 text-moss">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {CAFE.reviewCount} customer reviews on Google
            </p>
          </div>
          <div>
            <p className="eyebrow text-moss">What people say</p>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl">
              The same few things, over and over.
            </h2>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((theme, i) => (
            <Reveal as="li" key={theme.title} delay={(i % 3) * 90}>
              <h3 className="font-serif text-2xl">{theme.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {theme.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Review themes are summarised from public Google ratings. Individual customer
            quotes will appear here once verified reviews are supplied. [VERIFIED REVIEWS]
          </p>
        </Reveal>
      </div>
    </section>
  );
}
