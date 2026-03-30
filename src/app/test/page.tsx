"use client";

import { useMemo, useState } from "react";
import { DiscDualProfileChart } from "@/components/DiscDualProfileChart";
import { DiscFullReport } from "@/components/DiscFullReport";
import { DiscPercentileBars } from "@/components/DiscPercentileBars";
import { DiscPercentileLineChart } from "@/components/DiscPercentileLineChart";
import { DiscQuadrantChart, factorsForTwelveStyle } from "@/components/DiscQuadrantChart";
import { DISC_QUESTIONS, type QuestionAnswer } from "@/lib/disc";
import { scoreDiscComparison, toDiscDataset } from "@/lib/disc-engine";
import { computeAdaptationStress } from "@/lib/disc-report/adaptation";

const emptyAnswers = (): QuestionAnswer[] =>
  DISC_QUESTIONS.map(() => ({ most: null, least: null }));

export default function TestPage() {
  const [includeAdapted, setIncludeAdapted] = useState(false);
  const [phase, setPhase] = useState<"natural" | "adapted">("natural");
  const [answersNatural, setAnswersNatural] = useState<QuestionAnswer[]>(emptyAnswers);
  const [answersAdapted, setAnswersAdapted] = useState<QuestionAnswer[]>(emptyAnswers);

  const answers = phase === "natural" ? answersNatural : answersAdapted;
  const setAnswers = phase === "natural" ? setAnswersNatural : setAnswersAdapted;

  const completedNatural = answersNatural.every((a) => a.most !== null && a.least !== null);
  const completedAdapted = answersAdapted.every((a) => a.most !== null && a.least !== null);

  const comparison = useMemo(() => {
    if (!completedNatural) return null;
    try {
      if (!includeAdapted) {
        return scoreDiscComparison({
          natural: toDiscDataset("natural", answersNatural),
        });
      }
      if (!completedAdapted) {
        return scoreDiscComparison({
          natural: toDiscDataset("natural", answersNatural),
        });
      }
      return scoreDiscComparison({
        natural: toDiscDataset("natural", answersNatural),
        adapted: toDiscDataset("adapted", answersAdapted),
      });
    } catch {
      return null;
    }
  }, [answersNatural, answersAdapted, completedNatural, completedAdapted, includeAdapted]);

  const naturalResult = comparison?.natural ?? null;
  const stress = useMemo(() => {
    if (!comparison?.adapted || !naturalResult) return null;
    return computeAdaptationStress(naturalResult, comparison.adapted);
  }, [comparison, naturalResult]);

  const highlightedFactors = useMemo(() => {
    if (!naturalResult) return new Set<"D" | "I" | "S" | "C">();
    return new Set(factorsForTwelveStyle(naturalResult.profile.style12));
  }, [naturalResult]);

  const scrollToNextGroup = (currentIndex: number) => {
    const nextSection = document.getElementById(`question-group-${currentIndex + 2}`);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const resultsSection = document.getElementById("disc-results");
    resultsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setMost = (questionIndex: number, optionIndex: number) => {
    setAnswers((current) => {
      const next = [...current];
      const existingLeast = next[questionIndex].least;
      next[questionIndex] = {
        most: optionIndex,
        least: existingLeast === optionIndex ? null : existingLeast,
      };
      const nowComplete =
        next[questionIndex].most !== null && next[questionIndex].least !== null;
      const wasComplete =
        current[questionIndex].most !== null && current[questionIndex].least !== null;
      if (nowComplete && !wasComplete) {
        window.setTimeout(() => scrollToNextGroup(questionIndex), 50);
      }
      return next;
    });
  };

  const setLeast = (questionIndex: number, optionIndex: number) => {
    setAnswers((current) => {
      const next = [...current];
      const existingMost = next[questionIndex].most;
      next[questionIndex] = {
        most: existingMost === optionIndex ? null : existingMost,
        least: optionIndex,
      };
      const nowComplete =
        next[questionIndex].most !== null && next[questionIndex].least !== null;
      const wasComplete =
        current[questionIndex].most !== null && current[questionIndex].least !== null;
      if (nowComplete && !wasComplete) {
        window.setTimeout(() => scrollToNextGroup(questionIndex), 50);
      }
      return next;
    });
  };

  const resetAll = () => {
    setPhase("natural");
    setAnswersNatural(emptyAnswers());
    setAnswersAdapted(emptyAnswers());
  };

  const showResultsNaturalOnly = completedNatural && !includeAdapted;
  const showResultsDualPending = includeAdapted && completedNatural && !completedAdapted;
  const showResultsFull = includeAdapted && completedNatural && completedAdapted;
  const showAnyReport = showResultsNaturalOnly || showResultsDualPending || showResultsFull;

  return (
    <main className="mx-auto max-w-5xl bg-background px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-xl border border-border bg-surface p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-indigo">
          DISC assessment
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">Questionnaire</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Forced-choice blocks: pick one <strong>Most</strong> and one <strong>Least</strong> per
          group. Results include dimension scores, percentile-style emphasis, charts, and a
          structured behavioral report. Optional second pass captures <strong>adapted (work)</strong>{" "}
          style for gap / adaptation analysis.
        </p>
        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background px-3 py-3 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={includeAdapted}
            disabled={completedNatural}
            onChange={(e) => {
              setIncludeAdapted(e.target.checked);
              if (!e.target.checked) {
                setPhase("natural");
                setAnswersAdapted(emptyAnswers());
              }
            }}
          />
          <span>
            <span className="font-medium text-foreground">Include work / adapted style</span>{" "}
            <span className="text-text-secondary">
              (second questionnaire: how you behave on the job). Natural vs adapted gap reflects
              adaptation pressure—not good or bad.
            </span>
            {completedNatural ? (
              <span className="mt-1 block text-xs text-warning">Locked after natural section is complete.</span>
            ) : null}
          </span>
        </label>
        <div className="mt-4 h-2 w-full overflow-hidden rounded bg-zinc-200">
          <div
            className="h-full bg-primary-indigo transition-all"
            style={{
              width: `${(answers.filter((a) => a.most !== null && a.least !== null).length / DISC_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-sm text-text-secondary">
          Phase:{" "}
          <strong className="text-foreground">
            {phase === "natural" ? "Natural (typical you)" : "Adapted (work context)"}
          </strong>{" "}
          · Progress this phase:{" "}
          {answers.filter((a) => a.most !== null && a.least !== null).length}/{DISC_QUESTIONS.length}
        </p>
      </section>

      {includeAdapted && completedNatural && !completedAdapted && phase === "natural" ? (
        <section className="mb-6 rounded-xl border border-primary-indigo/30 bg-primary-indigo/5 p-4">
          <p className="text-sm font-medium text-foreground">Natural profile is complete.</p>
          <p className="mt-1 text-sm text-text-secondary">
            Continue with the adapted (work) questionnaire for a dual graph and adaptation gap readout.
          </p>
          <button
            type="button"
            className="mt-3 rounded-lg bg-primary-indigo px-4 py-2 text-sm font-medium text-white hover:bg-accent-purple"
            onClick={() => {
              setPhase("adapted");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Continue to work / adapted style
          </button>
        </section>
      ) : null}

      <div className="space-y-6">
        {DISC_QUESTIONS.map((question, qIndex) => {
          const answer = answers[qIndex];
          const groupComplete = answer.most !== null && answer.least !== null;
          return (
            <section
              key={`${phase}-${question.id}`}
              id={`question-group-${question.id}`}
              className={`rounded-xl border bg-surface p-4 shadow-sm transition-colors sm:p-5 ${
                groupComplete
                  ? "border-primary-indigo/40 ring-1 ring-primary-indigo/20"
                  : "border-border"
              }`}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Group {question.id}</h2>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Choose one <span className="font-medium text-primary-indigo">Most</span> and one{" "}
                    <span className="font-medium text-primary-blue">Least</span>.
                  </p>
                </div>
                {groupComplete ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Done
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-text-secondary">
                    In progress
                  </span>
                )}
              </div>

              <fieldset className="min-w-0 border-0 p-0">
                <legend className="sr-only">
                  Group {question.id}, {phase}: pick most and least
                </legend>
                <div
                  className="mb-2 hidden gap-3 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-wide text-text-secondary sm:grid sm:grid-cols-[minmax(0,1fr)_7.5rem_7.5rem]"
                  aria-hidden
                >
                  <span>Statement</span>
                  <span className="text-center text-primary-indigo">Most</span>
                  <span className="text-center text-primary-blue">Least</span>
                </div>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => {
                    const mostChecked = answer.most === oIndex;
                    const leastChecked = answer.least === oIndex;
                    const rowHighlight = mostChecked
                      ? "border-primary-indigo/35 bg-primary-indigo/5"
                      : leastChecked
                        ? "border-primary-blue/35 bg-primary-blue/5"
                        : "border-border bg-zinc-50/70";
                    return (
                      <div
                        key={`${question.id}-${oIndex}`}
                        className={`flex flex-col gap-2 rounded-xl border p-3 transition-colors sm:grid sm:grid-cols-[minmax(0,1fr)_7.5rem_7.5rem] sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 ${rowHighlight}`}
                      >
                        <p className="text-sm leading-snug text-foreground sm:pr-2">{option.text}</p>
                        <div className="flex gap-2 sm:contents">
                          <label
                            className={`group relative flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-lg border-2 text-sm font-medium transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-indigo focus-within:ring-offset-2 focus-within:ring-offset-white sm:min-h-[2.75rem] ${
                              mostChecked
                                ? "border-primary-indigo bg-primary-indigo text-white"
                                : "border-border bg-surface text-text-secondary hover:border-primary-indigo/45 hover:bg-primary-indigo/5 active:scale-[0.99]"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`most-${question.id}-${phase}`}
                              checked={mostChecked}
                              onChange={() => setMost(qIndex, oIndex)}
                              className="sr-only"
                              aria-label={`Most like me: ${option.text}`}
                            />
                            <span className="pointer-events-none flex items-center gap-2 px-3">
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold tabular-nums ${
                                  mostChecked
                                    ? "border-white/80 bg-white/15 text-white"
                                    : "border-primary-indigo/60 text-primary-indigo"
                                }`}
                                aria-hidden
                              >
                                M
                              </span>
                              Most
                            </span>
                          </label>
                          <label
                            className={`group relative flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-lg border-2 text-sm font-medium transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-blue focus-within:ring-offset-2 focus-within:ring-offset-white sm:min-h-[2.75rem] ${
                              leastChecked
                                ? "border-primary-blue bg-primary-blue text-white"
                                : "border-border bg-surface text-text-secondary hover:border-primary-blue/45 hover:bg-primary-blue/5 active:scale-[0.99]"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`least-${question.id}-${phase}`}
                              checked={leastChecked}
                              onChange={() => setLeast(qIndex, oIndex)}
                              className="sr-only"
                              aria-label={`Least like me: ${option.text}`}
                            />
                            <span className="pointer-events-none flex items-center gap-2 px-3">
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold tabular-nums ${
                                  leastChecked
                                    ? "border-white/80 bg-white/15 text-white"
                                    : "border-primary-blue/60 text-primary-blue"
                                }`}
                                aria-hidden
                              >
                                L
                              </span>
                              Least
                            </span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </section>
          );
        })}
      </div>

      <section
        id="disc-results"
        className="mt-8 rounded-xl border border-border bg-surface p-5 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Results &amp; report</h2>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-lg bg-primary-indigo px-3 py-2 text-sm text-white hover:bg-accent-purple"
          >
            Reset all
          </button>
        </div>

        {!showAnyReport || !naturalResult ? (
          <p className="mt-3 text-sm text-text-secondary">
            Complete the natural questionnaire to see scores, charts, and the full behavioral report.
            {includeAdapted ? " Then finish the adapted pass for the dual profile." : null}
          </p>
        ) : null}

        {naturalResult ? (
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <DiscPercentileBars
                scores={naturalResult.scores}
                title="Natural style — dimension emphasis (percentile view)"
                subtitle="Within-person emphasis for this assessment; use for relative D / I / S / C, not population ranking."
              />
              <DiscPercentileLineChart scores={naturalResult.scores} />
            </div>

            {comparison && stress && comparison.adapted ? (
              <DiscDualProfileChart comparison={comparison} stress={stress} />
            ) : showResultsDualPending ? (
              <p className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-secondary">
                Dual graph and adaptation gap appear after you complete the <strong>adapted (work)</strong>{" "}
                questionnaire.
              </p>
            ) : null}

            <DiscQuadrantChart highlighted={highlightedFactors} />

            <DiscFullReport
              natural={naturalResult}
              adapted={showResultsFull ? comparison?.adapted ?? null : null}
              stress={showResultsFull ? stress : null}
            />

            {!naturalResult.quality.reliable ? (
              <div className="rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-text-secondary">
                <strong className="text-foreground">Quality flags:</strong>{" "}
                {naturalResult.quality.flags.join(" ") || "Review responses for consistency."}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
