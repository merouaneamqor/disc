import { classifyProfile, percentileToIntensity } from "./classification";
import type { DiscInsights, DiscResult, DiscScores } from "./types";

function buildInsights(primary: string, secondary: string): DiscInsights {
  const key = `${primary}${secondary}`;

  const map: Record<string, DiscInsights> = {
    DI: {
      strengths: ["Drives execution", "Influences stakeholders", "Acts decisively under pressure"],
      weaknesses: ["Can move too fast", "May skip detail validation"],
      management_style: ["Set stretch goals", "Add clear quality gates"],
      communication_style: ["Lead with outcomes", "Follow with concise rationale"],
    },
    SC: {
      strengths: ["Reliable follow-through", "Detail accuracy", "Calm process execution"],
      weaknesses: ["Can resist rapid change", "May under-communicate urgency"],
      management_style: ["Use clear timelines", "Provide stable processes"],
      communication_style: ["Be precise", "Avoid ambiguous instructions"],
    },
  };

  return (
    map[key] ?? {
      strengths: ["Situational adaptability", "Balanced social and task focus"],
      weaknesses: ["May over-extend across priorities"],
      management_style: ["Clarify priorities", "Align expectations explicitly"],
      communication_style: ["Use direct, respectful language", "Confirm shared understanding"],
    }
  );
}

export function composeResult(
  dataset: "natural" | "adapted",
  scores: DiscScores,
  quality: DiscResult["quality"]
): DiscResult {
  const profile = classifyProfile(scores);
  const intensity = {
    D: percentileToIntensity(scores.D.percentile),
    I: percentileToIntensity(scores.I.percentile),
    S: percentileToIntensity(scores.S.percentile),
    C: percentileToIntensity(scores.C.percentile),
  };

  return {
    model: "DISC_IPSATIVE_V1",
    dataset,
    scores,
    profile,
    intensity,
    quality,
    insights: buildInsights(profile.primary, profile.secondary),
    radar: {
      labels: ["D", "I", "S", "C"],
      values: [scores.D.percentile, scores.I.percentile, scores.S.percentile, scores.C.percentile],
    },
  };
}
