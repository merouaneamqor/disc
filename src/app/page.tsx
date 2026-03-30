import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <p className="text-sm font-medium text-primary-indigo">DISC Assessment Platform</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Welcome to DICS</h1>
        <p className="mt-4 max-w-2xl text-base text-text-secondary">
          Complete the DISC questionnaire using forced-choice blocks (Most / Least) and get your
          4-factor scores plus 12-style profile summary.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/test"
            className="rounded-lg bg-primary-indigo px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-purple"
          >
            Start DISC Test
          </Link>
          <Link
            href="/test"
            className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:border-primary-indigo/40 hover:text-primary-indigo"
          >
            View Questionnaire
          </Link>
        </div>
      </section>
    </main>
  );
}
