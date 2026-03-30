import type { DiscBlock, DiscDimension, DiscQuality, ForcedChoiceAnswer } from "./types";

const DIMENSIONS: DiscDimension[] = ["D", "I", "S", "C"];

export function evaluateQuality(blocks: DiscBlock[], answers: ForcedChoiceAnswer[]): DiscQuality {
  const byId = new Map(blocks.map((b) => [b.id, b]));
  const mostCount: Record<DiscDimension, number> = { D: 0, I: 0, S: 0, C: 0 };
  const leastCount: Record<DiscDimension, number> = { D: 0, I: 0, S: 0, C: 0 };

  let desirabilityMost = 0;
  let desirabilityLeast = 0;
  let contradictionEvents = 0;
  let seen = 0;

  answers.forEach((answer) => {
    const block = byId.get(answer.blockId);
    if (!block) return;
    const most = block.options.find((o) => o.id === answer.mostOptionId);
    const least = block.options.find((o) => o.id === answer.leastOptionId);
    if (!most || !least) return;
    mostCount[most.dimension] += 1;
    leastCount[least.dimension] += 1;
    desirabilityMost += most.desirability;
    desirabilityLeast += least.desirability;
    if (most.desirability < least.desirability) {
      contradictionEvents += 1;
    }
    seen += 1;
  });

  if (seen === 0) {
    return {
      reliable: false,
      contradictionIndex: 1,
      monotonyIndex: 1,
      socialDesirabilityIndex: 1,
      flags: ["No valid responses provided."],
    };
  }

  const contradictionIndex = contradictionEvents / seen;
  const monotonyIndex = Math.max(...DIMENSIONS.map((d) => mostCount[d])) / seen;

  const avgMost = desirabilityMost / seen;
  const avgLeast = desirabilityLeast / seen;
  const socialDesirabilityIndex = Math.max(0, Math.min(1, (avgMost - avgLeast + 2) / 4));

  const flags: string[] = [];
  if (contradictionIndex > 0.35) {
    flags.push(
      "High contradiction pattern: frequent MOST choices are less desirable than LEAST choices."
    );
  }
  if (monotonyIndex > 0.7) {
    flags.push("Low response diversity: MOST choices heavily concentrated in one dimension.");
  }
  if (socialDesirabilityIndex > 0.82) {
    flags.push("Possible social desirability bias: consistently choosing favorable statements as MOST.");
  }

  return {
    reliable: flags.length === 0,
    contradictionIndex,
    monotonyIndex,
    socialDesirabilityIndex,
    flags,
  };
}
