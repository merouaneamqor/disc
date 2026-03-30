import { DISC_QUESTIONS } from "../disc";
import type { DiscBlock, DiscDimension } from "./types";

function inferDesirability(text: string): number {
  const lower = text.toLowerCase();
  const positive = [
    "helpful",
    "friendly",
    "patient",
    "cheerful",
    "polite",
    "loyal",
    "disciplined",
    "confident",
    "positive",
    "persuasive",
  ];
  const negative = ["aggressive", "timid", "shy", "restless", "difficult", "scare", "lose my temper"];

  const p = positive.some((k) => lower.includes(k)) ? 1 : 0;
  const n = negative.some((k) => lower.includes(k)) ? 1 : 0;
  return Math.max(-1, Math.min(1, p - n));
}

function validateDimensions(block: DiscBlock) {
  const set = new Set<DiscDimension>(block.options.map((o) => o.dimension));
  if (set.size !== 4) {
    throw new Error(`Invalid block ${block.id}: each block must contain unique D/I/S/C dimensions.`);
  }
}

export const DISC_BLOCKS: DiscBlock[] = DISC_QUESTIONS.map((q) => {
  const block: DiscBlock = {
    id: q.id,
    options: q.options.map((option, index) => ({
      id: `${q.id}-${index}`,
      text: option.text,
      dimension: option.factor,
      desirability: inferDesirability(option.text),
    })) as DiscBlock["options"],
  };
  validateDimensions(block);
  return block;
});
