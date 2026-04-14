import Link from "next/link";

import { cn } from "@/lib/utils";

type SharedProps = {
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
};

type ButtonAsLink = SharedProps & {
  href: string;
  target?: string;
};

type ButtonAsButton = SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

function isLinkButton(props: ButtonAsLink | ButtonAsButton): props is ButtonAsLink {
  return "href" in props;
}

function getClasses(variant: SharedProps["variant"], className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variant === "secondary" &&
      "border border-white/12 bg-white/6 text-foreground hover:border-white/20 hover:bg-white/10",
    variant === "ghost" && "text-foreground/80 hover:text-foreground",
    (!variant || variant === "primary") &&
      "bg-accent text-accent-foreground shadow-[0_18px_35px_rgba(244,114,35,0.22)] hover:-translate-y-px hover:shadow-[0_20px_40px_rgba(244,114,35,0.26)]",
    className,
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (isLinkButton(props)) {
    const { children, className, href, target, variant } = props;

    return (
      <Link href={href} target={target} className={getClasses(variant, className)}>
        {children}
      </Link>
    );
  }

  const { children, className, type = "button", variant, ...buttonProps } = props;

  return (
    <button type={type} className={getClasses(variant, className)} {...buttonProps}>
      {children}
    </button>
  );
}
