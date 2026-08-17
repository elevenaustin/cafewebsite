import { BookOpen, Coffee, Croissant, Users } from "lucide-react";

import { Reveal } from "./Reveal";

const ITEMS = [
  {
    icon: Coffee,
    title: "Coffee & Tea",
    body: "Espresso drinks, filter coffee and a tea list, made carefully and served without ceremony.",
  },
  {
    icon: Croissant,
    title: "Something Sweet",
    body: "Pastries and café treats to go with the cup — including vegan options.",
  },
  {
    icon: BookOpen,
    title: "Settle In",
    body: "Comfortable seating, art on the walls and a quieter room when you need one.",
  },
  {
    icon: Users,
    title: "Bring Your People",
    body: "Room for friends, couples and families, with books and games on the shelf.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-moss">The experience</p>
          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl">
            Four good reasons to stay for a second cup.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90} className="bg-card">
              <div className="flex h-full flex-col p-8 lg:p-9">
                <item.icon className="h-6 w-6 text-moss" aria-hidden />
                <h3 className="mt-8 font-serif text-[1.75rem] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
