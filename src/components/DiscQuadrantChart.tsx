import type { DiscFactor } from "@/lib/disc";

/** Quadrant layout matches common DISC visuals: D top-left, I top-right, S bottom-right, C bottom-left. */
const QUADRANTS: {
  factor: DiscFactor;
  label: string;
  sublabel: string;
  traits: string[];
  className: string;
  grid: string;
}[] = [
  {
    factor: "D",
    label: "DOMINANCE",
    sublabel: "D",
    traits: ["Direct", "Results-oriented", "Firm", "Strong-willed", "Forceful"],
    className: "bg-disc-d text-disc-d-fg",
    grid: "col-start-1 row-start-1",
  },
  {
    factor: "I",
    label: "INFLUENCE",
    sublabel: "i",
    traits: ["Outgoing", "Enthusiastic", "Optimistic", "High-spirited", "Lively"],
    className: "bg-disc-i text-disc-i-fg",
    grid: "col-start-2 row-start-1",
  },
  {
    factor: "S",
    label: "STEADINESS",
    sublabel: "S",
    traits: ["Even-tempered", "Accommodating", "Patient", "Humble", "Tactful"],
    className: "bg-disc-s text-disc-s-fg",
    grid: "col-start-2 row-start-2",
  },
  {
    factor: "C",
    label: "CONSCIENTIOUSNESS",
    sublabel: "C",
    traits: ["Analytical", "Reserved", "Precise", "Private", "Systematic"],
    className: "bg-disc-c text-disc-c-fg",
    grid: "col-start-1 row-start-2",
  },
];

type Props = {
  highlighted: Set<DiscFactor>;
};

export function DiscQuadrantChart({ highlighted }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="grid grid-cols-2 gap-px bg-border">
        {QUADRANTS.map((q) => {
          const active = highlighted.has(q.factor);
          return (
            <div
              key={q.factor}
              className={`${q.grid} min-h-[140px] p-4 transition-all sm:min-h-[160px] ${q.className} ${
                active
                  ? "ring-2 ring-foreground ring-inset"
                  : "opacity-85"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-bold tracking-wider sm:text-xs">{q.label}</p>
                <span className="text-2xl font-black leading-none sm:text-3xl">{q.sublabel}</span>
              </div>
              <ul className="mt-3 list-inside list-disc text-[11px] leading-snug sm:text-xs">
                {q.traits.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="border-t border-border bg-background px-3 py-2 text-[10px] text-text-secondary">
        Models like Everything DiSC® describe 12 styles as blends of adjacent types on this circle
        (see{" "}
        <a
          href="https://discvalueprofiles.com/blog/what-are-the-disc-personality-types-a-deeper-look-at-12-styles/"
          className="underline hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          overview of the 12 styles
        </a>
        ).
      </p>
    </div>
  );
}

export function factorsForTwelveStyle(style: string): DiscFactor[] {
  const s = style.trim();
  if (s === "D" || s === "I" || s === "S" || s === "C") return [s];
  if (s === "Di" || s === "iD") return ["D", "I"];
  if (s === "iS" || s === "Si") return ["I", "S"];
  if (s === "SC" || s === "CS") return ["S", "C"];
  if (s === "CD" || s === "DC") return ["C", "D"];
  return ["D", "I", "S", "C"];
}
