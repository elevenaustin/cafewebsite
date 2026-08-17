import interior from "@/assets/interior-seating.jpg";
import { Reveal } from "./Reveal";

const CUES = [
  "Comfortable seating",
  "Photography on the walls",
  "Books & games",
  "A quieter room",
];

export function Intro() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1340px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <figure className="relative">
            <img
              src={interior}
              alt="A quiet corner of Boreal Café with armchairs, a shelf of books and board games, and framed photography on a deep green wall"
              width={1200}
              height={1504}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <figcaption className="eyebrow mt-4 text-muted-foreground">
              Inside the café
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={80}>
          <p className="eyebrow text-moss">The café</p>
          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-[3.6rem]">
            A place to settle in.
          </h2>
          <div className="mt-7 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Boreal Café is a room built around staying a while — a coffee across the
              table from someone, a quiet hour with a book, a pastry between errands on
              Water Street.
            </p>
            <p>
              Comfortable seating, photography and art on the walls, books and games
              within reach, and a calmer volume than most cafés on the street. Locals and
              visitors, families and solo mornings all fit here.
            </p>
          </div>
          <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {CUES.map((cue) => (
              <li
                key={cue}
                className="flex items-center gap-3 border-t border-border pt-3 text-sm text-foreground"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-moss" />
                {cue}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
