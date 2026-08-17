import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300";

export function PrimaryLink({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={cn(
        base,
        "bg-primary text-primary-foreground hover:bg-espresso hover:shadow-[0_10px_30px_-12px_var(--color-espresso)]",
        className,
      )}
    />
  );
}

export function GhostLink({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={cn(
        base,
        "border border-current/30 text-current hover:border-current hover:bg-current/5",
        className,
      )}
    />
  );
}
