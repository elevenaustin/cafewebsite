import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { DIRECTIONS_URL, NAV_LINKS } from "./site-data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1340px] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className={cn(
            "font-serif text-2xl tracking-tight transition-colors sm:text-[1.7rem]",
            scrolled || open ? "text-foreground" : "text-primary-foreground",
          )}
        >
          Boreal <span className="italic">Café</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "eyebrow relative py-1 transition-opacity hover:opacity-60",
                scrolled ? "text-foreground" : "text-primary-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "eyebrow hidden rounded-sm px-5 py-3 transition-colors sm:inline-flex",
              scrolled || open
                ? "bg-primary text-primary-foreground hover:bg-espresso"
                : "bg-primary-foreground text-primary hover:bg-surface",
            )}
          >
            Get Directions
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors lg:hidden",
              scrolled || open ? "text-foreground" : "text-primary-foreground",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1340px] px-5 py-6 sm:px-8">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-border/70 last:border-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-serif text-2xl text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="eyebrow mt-6 flex items-center justify-center rounded-sm bg-primary px-5 py-4 text-primary-foreground"
          >
            Get Directions
          </a>
        </nav>
      </div>
    </header>
  );
}
