import { describe, expect, it } from "vitest";
import { DISC_BLOCKS } from "../questionnaire";
import { scoreDiscComparison } from "../scoring";
import type { DiscDimension, ForcedChoiceAnswer } from "../types";

function answersByDimension(mostDim: DiscDimension, leastDim: DiscDimension): ForcedChoiceAnswer[] {
  return DISC_BLOCKS.map((block) => {
    const most = block.options.find((o) => o.dimension === mostDim);
    const least = block.options.find((o) => o.dimension === leastDim);
    if (!most || !least) throw new Error("Invalid questionnaire mapping.");
    return { blockId: block.id, mostOptionId: most.id, leastOptionId: least.id };
  });
}

function rotatingBalancedAnswers(): ForcedChoiceAnswer[] {
  const dims: DiscDimension[] = ["D", "I", "S", "C"];
  return DISC_BLOCKS.map((block, index) => {
    const mostDim = dims[index % 4];
    const leastDim = dims[(index + 2) % 4];
    const most = block.options.find((o) => o.dimension === mostDim);
    const least = block.options.find((o) => o.dimension === leastDim);
    if (!most || !least) throw new Error("Invalid questionnaire mapping.");
    return { blockId: block.id, mostOptionId: most.id, leastOptionId: least.id };
  });
}

describe("DISC scoring engine", () => {
  it("scores all-D MOST / all-C LEAST pattern", () => {
    const input = {
      natural: { label: "natural" as const, answers: answersByDimension("D", "C") },
    };
    const result = scoreDiscComparison(input).natural;

    expect(result.scores.D.raw).toBe(28);
    expect(result.scores.C.raw).toBe(-28);
    expect(result.profile.primary).toBe("D");
  });

  it("creates moderate/balanced profile for rotating pattern", () => {
    const input = {
      natural: { label: "natural" as const, answers: rotatingBalancedAnswers() },
    };
    const result = scoreDiscComparison(input).natural;
    const raws = Object.values(result.scores).map((s) => s.raw);
    const sum = raws.reduce((a, b) => a + b, 0);
    expect(sum).toBe(0);
    expect(result.quality.reliable).toBe(true);
  });

  it("flags contradictions when low-desirability is repeatedly MOST", () => {
    const contradictory = DISC_BLOCKS.map((block) => {
      const sorted = [...block.options].sort((a, b) => a.desirability - b.desirability);
      const most = sorted[0];
      const least = sorted[sorted.length - 1];
      return { blockId: block.id, mostOptionId: most.id, leastOptionId: least.id };
    });

    const result = scoreDiscComparison({
      natural: { label: "natural", answers: contradictory },
    }).natural;

    expect(result.quality.contradictionIndex).toBeGreaterThan(0.3);
    expect(result.quality.flags.length).toBeGreaterThan(0);
  });
});
