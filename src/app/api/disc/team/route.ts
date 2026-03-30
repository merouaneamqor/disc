import { NextResponse } from "next/server";
import {
  scoreDiscComparison,
  teamDistribution,
  type DiscDataset,
  type ForcedChoiceAnswer,
} from "@/lib/disc-engine";

type TeamMemberPayload = {
  naturalAnswers: ForcedChoiceAnswer[];
  adaptedAnswers?: ForcedChoiceAnswer[];
};

function toDataset(label: "natural" | "adapted", answers: ForcedChoiceAnswer[]): DiscDataset {
  return { label, answers };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { members?: TeamMemberPayload[] };
    if (!Array.isArray(body.members) || body.members.length === 0) {
      throw new Error("members[] is required.");
    }

    const results = body.members.map((member) =>
      scoreDiscComparison({
        natural: toDataset("natural", member.naturalAnswers),
        adapted: member.adaptedAnswers ? toDataset("adapted", member.adaptedAnswers) : undefined,
      }).natural
    );

    return NextResponse.json({
      count: results.length,
      distribution: teamDistribution(results),
      profiles: results.map((r) => r.profile.style12),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
