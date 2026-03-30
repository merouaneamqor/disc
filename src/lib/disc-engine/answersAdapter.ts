import { DISC_QUESTIONS, type QuestionAnswer } from "../disc";
import type { DiscDataset, ForcedChoiceAnswer } from "./types";

export function questionAnswersToForcedChoice(answers: QuestionAnswer[]): ForcedChoiceAnswer[] {
  if (answers.length !== DISC_QUESTIONS.length) {
    throw new Error("Answer count must match questionnaire length.");
  }
  return DISC_QUESTIONS.map((q, i) => {
    const a = answers[i];
    if (a.most === null || a.least === null) {
      throw new Error(`Block ${q.id} is incomplete.`);
    }
    return {
      blockId: q.id,
      mostOptionId: `${q.id}-${a.most}`,
      leastOptionId: `${q.id}-${a.least}`,
    };
  });
}

export function toDiscDataset(label: "natural" | "adapted", answers: QuestionAnswer[]): DiscDataset {
  return {
    label,
    answers: questionAnswersToForcedChoice(answers),
  };
}
