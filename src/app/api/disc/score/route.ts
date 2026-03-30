import { NextResponse } from "next/server";
import { scoreDiscComparison, type DiscDataset, type ForcedChoiceAnswer } from "@/lib/disc-engine";

type RawAnswer = {
  blockId: number;
  mostOptionId: string;
  leastOptionId: string;
};

function isAnswer(value: unknown): value is RawAnswer {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.blockId === "number" &&
    typeof v.mostOptionId === "string" &&
    typeof v.leastOptionId === "string"
  );
}

function toDataset(label: "natural" | "adapted", value: unknown): DiscDataset {
  if (!Array.isArray(value) || !value.every(isAnswer)) {
    throw new Error(`Invalid ${label} answers payload.`);
  }
  return { label, answers: value as ForcedChoiceAnswer[] };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const natural = toDataset("natural", body.naturalAnswers);
    const adapted = body.adaptedAnswers ? toDataset("adapted", body.adaptedAnswers) : undefined;
    const result = scoreDiscComparison({ natural, adapted });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
