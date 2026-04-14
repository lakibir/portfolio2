"use client";

import { useEffect, useSyncExternalStore } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(pointer: fine)");
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

export function AnimatedCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cursorX = useSpring(x, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-70 hidden h-6 w-6 rounded-full border border-accent/60 bg-accent/10 mix-blend-screen md:block"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-69 hidden h-12 w-12 rounded-full border border-white/10 bg-white/5 blur-[1px] md:block"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  );
}
