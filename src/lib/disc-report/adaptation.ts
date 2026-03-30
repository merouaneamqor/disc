import type { DiscDimension, DiscResult } from "@/lib/disc-engine/types";

const DIMENSIONS: DiscDimension[] = ["D", "I", "S", "C"];

export type AdaptationStress = {
  /** Mean absolute percentile shift across D/I/S/C (0–100 scale per comparison). */
  meanPercentileGap: number;
  label: "Low" | "Moderate" | "High";
  byDimension: Record<DiscDimension, number>;
};

export function computeAdaptationStress(natural: DiscResult, adapted: DiscResult): AdaptationStress {
  const byDimension = {} as Record<DiscDimension, number>;
  let sum = 0;
  DIMENSIONS.forEach((d) => {
    const gap = Math.abs(adapted.scores[d].percentile - natural.scores[d].percentile);
    byDimension[d] = Math.round(gap * 10) / 10;
    sum += gap;
  });
  const meanPercentileGap = Math.round((sum / 4) * 10) / 10;
  const label: AdaptationStress["label"] =
    meanPercentileGap < 10 ? "Low" : meanPercentileGap < 22 ? "Moderate" : "High";
  return { meanPercentileGap, label, byDimension };
}
