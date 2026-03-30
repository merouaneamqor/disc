import type { DiscDimension, DiscScores } from "./types";

const DIMENSIONS: DiscDimension[] = ["D", "I", "S", "C"];

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stdDev(values: number[], mu: number): number {
  const variance =
    values.reduce((sum, value) => sum + (value - mu) * (value - mu), 0) / values.length;
  return Math.sqrt(variance);
}

// Abramowitz and Stegun approximation for erf(x), sufficient for percentile banding.
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax));
  return sign * y;
}

function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

export function normalizeRawScores(raw: Record<DiscDimension, number>): DiscScores {
  const rawValues = DIMENSIONS.map((d) => raw[d]);
  const mu = mean(rawValues);
  const sigma = stdDev(rawValues, mu);

  const output = {} as DiscScores;

  DIMENSIONS.forEach((d) => {
    const z = sigma === 0 ? 0 : (raw[d] - mu) / sigma;
    output[d] = {
      raw: raw[d],
      z,
      percentile: Math.max(0, Math.min(100, normalCdf(z) * 100)),
    };
  });

  return output;
}
