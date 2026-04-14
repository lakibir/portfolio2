export default function Loading() {
  return (
    <main className="px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-8 w-40 rounded-full bg-white/10" />
        <div className="h-20 max-w-3xl rounded-4xl bg-white/10" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 rounded-4xl bg-white/10" />
          <div className="h-64 rounded-4xl bg-white/10" />
          <div className="h-64 rounded-4xl bg-white/10" />
        </div>
      </div>
    </main>
  );
}
