import { normalizeRawScores } from "./normalization";
import { DISC_BLOCKS } from "./questionnaire";
import { evaluateQuality } from "./quality";
import { composeResult } from "./reporting";
import type { DiscComparison, DiscDataset, DiscDimension, DiscResult } from "./types";

const DIMENSIONS: DiscDimension[] = ["D", "I", "S", "C"];

function rawAccumulator(): Record<DiscDimension, number> {
  return { D: 0, I: 0, S: 0, C: 0 };
}

function scoreDataset(dataset: DiscDataset): DiscResult {
  const byId = new Map(DISC_BLOCKS.map((b) => [b.id, b]));
  const raw = rawAccumulator();

  dataset.answers.forEach((answer) => {
    const block = byId.get(answer.blockId);
    if (!block) {
      throw new Error(`Unknown block id ${answer.blockId}.`);
    }
    if (answer.mostOptionId === answer.leastOptionId) {
      throw new Error(`Invalid answer in block ${answer.blockId}: MOST and LEAST cannot be same.`);
    }
    const most = block.options.find((o) => o.id === answer.mostOptionId);
    const least = block.options.find((o) => o.id === answer.leastOptionId);
    if (!most || !least) {
      throw new Error(`Invalid option id in block ${answer.blockId}.`);
    }
    raw[most.dimension] += 1;
    raw[least.dimension] -= 1;
  });

  const quality = evaluateQuality(DISC_BLOCKS, dataset.answers);
  const scores = normalizeRawScores(raw);
  return composeResult(dataset.label, scores, quality);
}

export function scoreDiscComparison(input: {
  natural: DiscDataset;
  adapted?: DiscDataset;
}): DiscComparison {
  if (input.natural.label !== "natural") {
    throw new Error("Natural dataset must be labeled 'natural'.");
  }

  const natural = scoreDataset(input.natural);
  const adapted = input.adapted ? scoreDataset(input.adapted) : null;

  const delta = adapted
    ? DIMENSIONS.reduce(
        (acc, d) => {
          acc[d] = adapted.scores[d].raw - natural.scores[d].raw;
          return acc;
        },
        {} as Record<DiscDimension, number>
      )
    : null;

  return { natural, adapted, delta };
}

export function teamDistribution(results: DiscResult[]): Record<string, number> {
  const total = results.length || 1;
  const dist: Record<string, number> = {};
  results.forEach((r) => {
    dist[r.profile.style12] = (dist[r.profile.style12] ?? 0) + 1;
  });
  Object.keys(dist).forEach((k) => {
    dist[k] = Number(((dist[k] / total) * 100).toFixed(2));
  });
  return dist;
}
