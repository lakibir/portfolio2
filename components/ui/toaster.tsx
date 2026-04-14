"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      closeButton
      richColors
      position="top-right"
      theme={resolvedTheme === "light" ? "light" : "dark"}
      toastOptions={{
        style: {
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    />
  );
}
