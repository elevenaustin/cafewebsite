import { GhostLink } from "./Buttons";
import { Reveal } from "./Reveal";

const CATEGORIES = [
  { name: "Coffee", note: "Espresso, filter and milk drinks" },
  { name: "Tea", note: "Loose leaf and infusions" },
  { name: "Pastries", note: "Baked goods and café treats" },
  { name: "Food", note: "Café plates and light bites" },
  { name: "Vegan Options", note: "Plant-based drinks and treats" },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-moss">The menu</p>
          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl">
            A little something for every kind of café day.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A preview of what's on offer. Full item names, descriptions and prices are
            confirmed in the café.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 70}>
              <div className="border-t border-foreground/20 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-3xl">{cat.name}</h3>
                  <span className="text-xs text-muted-foreground">{cat.note}</span>
                </div>
                <ul className="mt-6 space-y-5">
                  {[0, 1].map((n) => (
                    <li key={n} className="flex items-baseline gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold tracking-wide text-foreground">
                          [MENU ITEM]
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          [DESCRIPTION]
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="h-px flex-1 border-b border-dotted border-border"
                      />
                      <span className="shrink-0 text-sm text-muted-foreground">
                        [PRICE]
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <GhostLink href="#visit" className="text-foreground">
            View Full Menu
          </GhostLink>
        </Reveal>
      </div>
    </section>
  );
}
