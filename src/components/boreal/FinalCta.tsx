import { GhostLink, PrimaryLink } from "./Buttons";
import { Reveal } from "./Reveal";
import { DIRECTIONS_URL } from "./site-data";

export function FinalCta() {
  return (
    <section className="bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto max-w-[1340px] px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance font-serif text-4xl leading-[1.08] sm:text-6xl">
            Your next coffee stop is on Water Street.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-primary-foreground/80">
            Come by Boreal Café in downtown St. John's, take a seat and stay as long as
            the cup lasts.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryLink
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-primary-foreground text-primary hover:bg-surface hover:text-primary"
            >
              Get Directions
            </PrimaryLink>
            <GhostLink href="#menu" className="text-primary-foreground">
              View Menu
            </GhostLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
