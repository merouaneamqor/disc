import { DISC_DIMENSION_BAR_CSS_VAR } from "@/lib/disc-dimension-colors";
import type { DiscDimension, DiscScores } from "@/lib/disc-engine/types";

const ORDER: DiscDimension[] = ["D", "I", "S", "C"];

type Props = {
  scores: DiscScores;
  title?: string;
};

/** Simple line chart over D–I–S–C for visualization-ready export (SVG). */
export function DiscPercentileLineChart({
  scores,
  title = "Dimension trend (percentile)",
}: Props) {
  const w = 320;
  const h = 120;
  const pad = 16;
  const pts = ORDER.map((d, i) => {
    const x = pad + (i * (w - 2 * pad)) / (ORDER.length - 1);
    const y = h - pad - (scores[d].percentile / 100) * (h - 2 * pad);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-3 w-full max-w-md"
        role="img"
        aria-label="Line graph of DISC dimension percentiles from D through C"
      >
        <title>DISC percentile line chart</title>
        {[0, 25, 50, 75, 100].map((pct) => {
          const y = h - pad - (pct / 100) * (h - 2 * pad);
          return (
            <g key={pct}>
              <line x1={pad} x2={w - pad} y1={y} y2={y} className="stroke-zinc-200 dark:stroke-zinc-700" strokeWidth={0.5} />
              <text x={4} y={y + 3} className="fill-text-secondary text-[8px]">
                {pct}
              </text>
            </g>
          );
        })}
        <polyline
          fill="none"
          className="stroke-zinc-400 dark:stroke-zinc-500"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          points={pts}
        />
        {ORDER.map((d, i) => {
          const x = pad + (i * (w - 2 * pad)) / (ORDER.length - 1);
          const y = h - pad - (scores[d].percentile / 100) * (h - 2 * pad);
          const fill = `var(${DISC_DIMENSION_BAR_CSS_VAR[d]})`;
          return <circle key={d} cx={x} cy={y} r={3.5} fill={fill} />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-text-secondary sm:max-w-md sm:px-2">
        {ORDER.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}
