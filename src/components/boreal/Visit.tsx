import { Clock, MapPin, Phone } from "lucide-react";

import { GhostLink, PrimaryLink } from "./Buttons";
import { Reveal } from "./Reveal";
import { CAFE, DIRECTIONS_URL, MAP_EMBED_URL } from "./site-data";

export function Visit() {
  return (
    <section id="visit" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-moss">Visit</p>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl">
              Find us on Water Street.
            </h2>

            <dl className="mt-10 space-y-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-moss" aria-hidden />
                <div>
                  <dt className="eyebrow text-muted-foreground">Address</dt>
                  <dd className="mt-2 text-lg leading-relaxed">
                    {CAFE.street}
                    <br />
                    {CAFE.city}, {CAFE.region} {CAFE.postal}
                    <br />
                    {CAFE.country}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-moss" aria-hidden />
                <div>
                  <dt className="eyebrow text-muted-foreground">Phone</dt>
                  <dd className="mt-2 text-lg">
                    <a href={CAFE.phoneHref} className="underline-offset-4 hover:underline">
                      {CAFE.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-moss" aria-hidden />
                <div>
                  <dt className="eyebrow text-muted-foreground">Hours</dt>
                  <dd className="mt-2 text-lg text-muted-foreground">[BUSINESS HOURS]</dd>
                </div>
              </div>
            </dl>

            <p className="mt-8 text-sm text-muted-foreground">Dine-in · Takeaway</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
                Get Directions
              </PrimaryLink>
              <GhostLink href={CAFE.phoneHref} className="text-foreground">
                Call Café
              </GhostLink>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full min-h-[420px] overflow-hidden rounded-sm border border-border">
              <iframe
                title={`Map showing ${CAFE.name} at ${CAFE.street}, ${CAFE.city}`}
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[420px] w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
