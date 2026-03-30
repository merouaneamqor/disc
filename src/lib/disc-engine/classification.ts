import type { DiscDimension, DiscProfile, DiscScores, IntensityBand } from "./types";

const DIMENSIONS: DiscDimension[] = ["D", "I", "S", "C"];
const RING: DiscDimension[] = ["D", "I", "S", "C"];

function sortDimensions(scores: DiscScores): DiscDimension[] {
  return [...DIMENSIONS].sort((a, b) => {
    const rawDiff = scores[b].raw - scores[a].raw;
    if (rawDiff !== 0) return rawDiff;
    const zDiff = scores[b].z - scores[a].z;
    if (zDiff !== 0) return zDiff;
    return a.localeCompare(b);
  });
}

function areAdjacent(a: DiscDimension, b: DiscDimension): boolean {
  const ia = RING.indexOf(a);
  const ib = RING.indexOf(b);
  const diff = Math.abs(ia - ib);
  return diff === 1 || diff === 3;
}

function adjacentCandidates(of: DiscDimension): [DiscDimension, DiscDimension] {
  const i = RING.indexOf(of);
  return [RING[(i + 3) % 4], RING[(i + 1) % 4]];
}

function mapTo12Style(primary: DiscDimension, secondary: DiscDimension): string {
  if (primary === secondary) return primary;
  if ((primary === "D" && secondary === "I") || (primary === "I" && secondary === "D")) {
    return primary === "D" ? "Di" : "iD";
  }
  if ((primary === "I" && secondary === "S") || (primary === "S" && secondary === "I")) {
    return primary === "I" ? "iS" : "Si";
  }
  if ((primary === "S" && secondary === "C") || (primary === "C" && secondary === "S")) {
    return primary === "S" ? "SC" : "CS";
  }
  if ((primary === "C" && secondary === "D") || (primary === "D" && secondary === "C")) {
    return primary === "C" ? "CD" : "DC";
  }
  return `${primary}${secondary}`;
}

export function classifyProfile(scores: DiscScores): DiscProfile {
  const ranked = sortDimensions(scores);
  const primary = ranked[0];
  let secondary = ranked[1];
  const gap = scores[primary].percentile - scores[secondary].percentile;

  if (gap >= 20) {
    secondary = primary;
  } else if (!areAdjacent(primary, secondary)) {
    const [n1, n2] = adjacentCandidates(primary);
    secondary = scores[n1].raw >= scores[n2].raw ? n1 : n2;
  }

  return {
    primary,
    secondary,
    type: `${primary}${secondary === primary ? "" : secondary}`,
    style12: mapTo12Style(primary, secondary),
  };
}

export function percentileToIntensity(percentile: number): IntensityBand {
  if (percentile < 20) return "Very Low";
  if (percentile < 40) return "Low";
  if (percentile < 60) return "Moderate";
  if (percentile < 80) return "High";
  return "Very High";
}
