import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/6 p-10 text-center backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">This page does not exist.</h1>
        <p className="mt-4 text-base leading-8 text-muted">
          The route may have moved or the link may be outdated. Use the main navigation to return to the portfolio.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
            Go home
          </Link>
          <Link href="/blog" className="rounded-full border border-white/10 px-5 py-3 text-sm text-muted transition hover:border-white/20 hover:text-foreground">
            Browse blog
          </Link>
        </div>
      </div>
    </main>
  );
}
