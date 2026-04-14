"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { navigationItems } from "@/lib/portfolio";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toHomeSection = (href: string) => {
    if (!href.startsWith("#")) {
      return href;
    }

    return pathname === "/" ? href : `/${href}`;
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/6 px-5 py-3 shadow-[0_16px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        <Link href={toHomeSection("#home")} className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-foreground uppercase">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          Creative Web Development
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {navigationItems.map((item) => (
            <Link key={item.href} href={toHomeSection(item.href)} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href={toHomeSection("#contact")} variant="secondary">
            Hire Me
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-background/92 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:hidden"
          >
            <nav className="grid gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={toHomeSection(item.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-muted transition hover:bg-white/6 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <Button href={toHomeSection("#contact")} className="w-full" variant="secondary">
                Hire Me
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
