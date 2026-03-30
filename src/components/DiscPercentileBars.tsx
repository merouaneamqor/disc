import { DISC_DIMENSION_BAR_CLASS } from "@/lib/disc-dimension-colors";
import type { DiscDimension, DiscScores } from "@/lib/disc-engine/types";

const ORDER: DiscDimension[] = ["D", "I", "S", "C"];

const LABELS: Record<DiscDimension, string> = {
  D: "Dominance",
  I: "Influence",
  S: "Steadiness",
  C: "Conscientiousness",
};

type Props = {
  title?: string;
  scores: DiscScores;
  subtitle?: string;
};

export function DiscPercentileBars({ title = "Dimension profile (percentile view)", scores, subtitle }: Props) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {subtitle ? <p className="mt-1 text-xs text-text-secondary">{subtitle}</p> : null}
      <ul className="mt-4 space-y-3" role="list">
        {ORDER.map((dim) => {
          const p = scores[dim].percentile;
          const raw = scores[dim].raw;
          return (
            <li key={dim}>
              <div className="flex items-baseline justify-between gap-2 text-xs">
                <span className="font-medium text-foreground">
                  {dim} — {LABELS[dim]}
                </span>
                <span className="tabular-nums text-text-secondary">
                  {Math.round(p)}%ile · raw {raw > 0 ? `+${raw}` : raw}
                </span>
              </div>
              <div
                className="mt-1 h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(p)}
                aria-label={`${LABELS[dim]} percentile`}
              >
                <div
                  className={`h-full rounded-full transition-all ${DISC_DIMENSION_BAR_CLASS[dim]}`}
                  style={{ width: `${Math.min(100, Math.max(0, p))}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11px] leading-snug text-text-secondary">
        Percentiles here are within-person normalized for this instrument (not population norms). They show relative
        emphasis across D, I, S, and C for this profile.
      </p>
    </div>
  );
}
