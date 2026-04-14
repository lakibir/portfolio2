import Link from "next/link";

import { siteConfig } from "@/lib/portfolio";

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-4xl border border-white/10 bg-white/6 px-6 py-8 text-sm text-muted backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <p>{siteConfig.availability}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {siteConfig.socialLinks.map((link) => (
            <Link key={link.href} href={link.href} target="_blank" className="transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
