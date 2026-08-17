import interior from "@/assets/interior-seating.jpg";
import pastries from "@/assets/pastries.jpg";
import pour from "@/assets/pour.jpg";
import tea from "@/assets/tea-detail.jpg";
import street from "@/assets/water-street.jpg";
import hero from "@/assets/hero-cafe.jpg";
import { Reveal } from "./Reveal";

const IMAGES = [
  {
    src: pour,
    alt: "A barista pouring steamed milk into an espresso cup at the café bar",
    className: "sm:col-span-3 aspect-[4/5]",
  },
  {
    src: pastries,
    alt: "A plate of croissants and pastries on the café counter in soft daylight",
    className: "sm:col-span-3 aspect-[4/3] sm:self-end",
  },
  {
    src: hero,
    alt: "Coffee on a wooden table with the warm café room behind it",
    className: "sm:col-span-4 aspect-[3/2]",
  },
  {
    src: tea,
    alt: "A glass teapot and cup beside an open book on a linen tablecloth",
    className: "sm:col-span-2 aspect-[3/4]",
  },
  {
    src: interior,
    alt: "Armchairs, books and board games in a quiet corner of the café",
    className: "sm:col-span-2 aspect-[3/4]",
  },
  {
    src: street,
    alt: "A foggy morning on the colourful harbour-front streets of St. John's",
    className: "sm:col-span-4 aspect-[3/2] sm:self-end",
  },
];

export function Gallery() {
  return (
    <section className="bg-espresso py-24 text-espresso-foreground sm:py-32">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-espresso-foreground/60">Inside &amp; around</p>
          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl">
            The room, the cups, the street outside.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-6">
          {IMAGES.map((image, i) => (
            <Reveal
              as="figure"
              key={image.alt}
              delay={(i % 3) * 90}
              className={`group overflow-hidden rounded-sm ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
