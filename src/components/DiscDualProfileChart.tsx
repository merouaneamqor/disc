import {
  DISC_DIMENSION_BAR_CLASS,
  DISC_DIMENSION_BAR_NATURAL_CLASS,
} from "@/lib/disc-dimension-colors";
import type { DiscComparison, DiscDimension } from "@/lib/disc-engine/types";
import type { AdaptationStress } from "@/lib/disc-report/adaptation";

const DIMS: DiscDimension[] = ["D", "I", "S", "C"];

type Props = {
  comparison: DiscComparison;
  stress: AdaptationStress;
};

export function DiscDualProfileChart({ comparison, stress }: Props) {
  const adapted = comparison.adapted;
  if (!adapted || !comparison.delta) return null;

  const maxP = 100;

  return (
    <div className="space-y-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Natural vs adapted (work) style</h3>
        <p className="mt-1 text-xs text-text-secondary">
          Side-by-side percentile emphasis. Larger gaps suggest higher day-to-day adaptation cost or role pressure.
        </p>
      </div>

      <div
        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
          stress.label === "Low"
            ? "bg-success/15 text-success"
            : stress.label === "Moderate"
              ? "bg-warning/15 text-warning"
              : "bg-error/15 text-error"
        }`}
      >
        Adaptation gap: {stress.label} (avg Δ ≈ {stress.meanPercentileGap} percentile points)
      </div>

      <ul className="space-y-4" role="list">
        {DIMS.map((d) => {
          const n = comparison.natural.scores[d].percentile;
          const a = adapted.scores[d].percentile;
          return (
            <li key={d}>
              <div className="flex items-center justify-between text-xs font-medium text-foreground">
                <span>{d}</span>
                <span className="tabular-nums text-[11px] font-normal text-text-secondary">
                  Natural {Math.round(n)}% · Adapted {Math.round(a)}% · Δ {comparison.delta![d] > 0 ? "+" : ""}
                  {Math.round(adapted.scores[d].raw - comparison.natural.scores[d].raw)} raw
                </span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-text-secondary">Natural</div>
                  <div className="mt-0.5 h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className={`h-full rounded-full ${DISC_DIMENSION_BAR_NATURAL_CLASS[d]}`}
                      style={{ width: `${(n / maxP) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-text-secondary">Adapted</div>
                  <div className="mt-0.5 h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className={`h-full rounded-full ${DISC_DIMENSION_BAR_CLASS[d]}`}
                      style={{ width: `${(a / maxP) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
