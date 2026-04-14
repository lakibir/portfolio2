"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin, Mail, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { metrics, siteConfig } from "@/lib/portfolio";

const HeroCanvas = dynamic(
  () => import("@/components/sections/hero-canvas").then((module) => module.HeroCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-80 rounded-4xl bg-white/8" />,
  },
);

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: ArrowUpRight,
  Email: Mail,
};

export function HeroSection() {
  return (
    <section id="home" className="px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.35em] text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {siteConfig.location}
          </span>

          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.38em] text-accent">{siteConfig.role}</p>
            <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-5xl">
              Modern product engineering with a clean visual edge.
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
              {siteConfig.intro}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="#contact">
              Hire Me
              <MoveRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href={siteConfig.cvUrl} target="_blank" variant="secondary">
              Download CV
              <ArrowDownToLine className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {siteConfig.socialLinks.map((link) => {
              const Icon = socialIcons[link.label as keyof typeof socialIcons] ?? ArrowUpRight;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.55 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl"
              >
                <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                <p className="mt-2 text-sm text-muted">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-4xl border border-white/10 bg-[radial-gradient(circle_at_top,#f4742330,transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] shadow-[0_32px_120px_rgba(0,0,0,0.45)]"
        >
          <div className="absolute inset-x-6 top-6 rounded-full border border-white/10 bg-background/70 px-4 py-3 text-xs uppercase tracking-[0.3em] text-muted backdrop-blur-xl">
            3D interactive hero
          </div>
          <div className="h-105 w-full sm:h-125">
            <HeroCanvas imageSrc={siteConfig.heroImage} />
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-background/72 p-5 backdrop-blur-xl">
            <p className="text-sm text-muted">Current focus</p>
            <p className="mt-2 text-lg font-medium text-foreground">
              Shipping fast Next.js products, design systems, and composable CMS-driven experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
