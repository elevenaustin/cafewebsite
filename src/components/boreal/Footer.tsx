import { CAFE, NAV_LINKS } from "./site-data";

export function Footer() {
  return (
    <footer className="bg-background py-16">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">
        <div className="grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-serif text-2xl">
              Boreal <span className="italic">Café</span>
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
              {CAFE.street}
              <br />
              {CAFE.city}, {CAFE.region} {CAFE.postal}
              <br />
              {CAFE.country}
            </address>
          </div>

          <div>
            <p className="eyebrow text-muted-foreground">Contact</p>
            <a
              href={CAFE.phoneHref}
              className="mt-4 inline-block text-sm underline-offset-4 hover:underline"
            >
              {CAFE.phone}
            </a>
            <p className="mt-3 text-sm text-muted-foreground">Dine-in · Takeaway</p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-muted-foreground">Explore</p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {CAFE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
