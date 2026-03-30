import type { DiscDimension, DiscResult } from "@/lib/disc-engine/types";

export type DiscFullReport = {
  profileSummary: {
    typeLine: string;
    styleLine: string;
    keyTraits: string[];
  };
  behavioralTraits: string[];
  strengths: string[];
  limitations: string[];
  communication: {
    howYouCommunicate: string[];
    whatYouNeed: string[];
  };
  howToWorkWithYou: string[];
  teamBehavior: string[];
  workEnvironment: string[];
  stressBehavior: string[];
  growth: string[];
  keyInsight: string;
};

const DIMENSION_LABELS: Record<DiscDimension, string> = {
  D: "Dominance",
  I: "Influence",
  S: "Steadiness",
  C: "Conscientiousness",
};

function baseInsight(result: DiscResult): DiscFullReport {
  const p = result.profile;
  const primary = DIMENSION_LABELS[p.primary];
  const secondary =
    p.secondary === p.primary ? null : DIMENSION_LABELS[p.secondary];

  return {
    profileSummary: {
      typeLine: `${p.primary}${p.secondary === p.primary ? "" : p.secondary} (${primary}${secondary ? ` + ${secondary}` : ""})`,
      styleLine: `Primary behavioral energy: ${primary}${secondary ? ` with a strong ${secondary} blend` : ""}.`,
      keyTraits: [
        `Leans ${primary} under typical conditions`,
        ...(secondary ? [`Shows measurable ${secondary} tendencies in context`] : []),
        "Behavior shifts with pressure, priorities, and environment",
      ],
    },
    behavioralTraits: [
      "Responds to incentives and constraints in the current context",
      "Priorities show up in where you invest energy day to day",
    ],
    strengths: result.insights.strengths,
    limitations: result.insights.weaknesses,
    communication: {
      howYouCommunicate: result.insights.communication_style,
      whatYouNeed: ["Clear expectations", "Respect for your working style", "Timely feedback when misalignment appears"],
    },
    howToWorkWithYou: result.insights.management_style,
    teamBehavior: [
      "Contribution to group dynamics depends on role clarity and psychological safety",
      "Under stress, the dominant dimension tends to amplify first",
    ],
    workEnvironment: [
      "Environment fit matters: pace, structure, autonomy, and how decisions get made",
      "Mismatch between natural and required style increases adaptation cost",
    ],
    stressBehavior: [
      "Under pressure people typically lean harder into their strongest dimension(s)",
      "Watch for overuse of a strength that becomes a liability (too fast, too loud, too cautious, too critical)",
    ],
    growth: [
      `Develop complementary habits outside your strongest dimension (${secondary ?? "neighboring styles"})`,
      "Practice active listening and slowing down when collaboration quality matters",
    ],
    keyInsight:
      "DISC describes observable behavioral tendencies and situational stress patterns—not fixed identity. Use it to predict friction points and design better collaboration.",
  };
}

/** Richer copy for common 12-style codes; falls back to `baseInsight`. */
const STYLE_OVERRIDES: Partial<Record<string, Partial<DiscFullReport>>> = {
  Di: {
    profileSummary: {
      typeLine: "Di (Dominance + Influence)",
      styleLine: "Persuasive, results-driven, entrepreneurial energy.",
      keyTraits: ["Assertive", "Energetic", "Decisive", "Comfortable owning outcomes"],
    },
    behavioralTraits: [
      "Fast decision-making when stakes are clear",
      "High energy in meetings and execution phases",
      "Comfortable with calculated risk when the upside is visible",
      "Influences stakeholders directly; sells the “why” and the next step",
    ],
    strengths: [
      "Drives execution and removes blockers",
      "Motivates teams with momentum",
      "Takes initiative under ambiguity",
      "Handles pressure by accelerating and asserting direction",
    ],
    limitations: [
      "Impatience with slower pacing (high-S contexts)",
      "May overlook details or governance (high-C contexts)",
      "Can dominate conversations if not moderated",
      "Risk of burnout when adaptation cost stays high for long periods",
    ],
    communication: {
      howYouCommunicate: ["Direct", "Persuasive", "Big-picture and outcome-focused"],
      whatYouNeed: ["Clarity", "Speed", "Decision rights", "Concrete results"],
    },
    howToWorkWithYou: [
      "Be direct; avoid long preamble",
      "Bring solutions, not only problems",
      "Respect time and efficiency",
      "Challenge with data, not endless debate",
    ],
    teamBehavior: [
      "Natural pace-setter; can pull a team forward",
      "Can overwhelm more reflective styles if tone and space aren’t managed",
    ],
    workEnvironment: [
      "Fast-paced",
      "Autonomous with clear goals",
      "Low bureaucracy where decisions are actionable",
    ],
    stressBehavior: [
      "Becomes more controlling (D++)",
      "More impatient; less tolerant of rework",
      "Pushes harder for ownership and closure",
    ],
    growth: [
      "Develop patience and pacing (S)",
      "Improve attention to detail and quality gates (C)",
      "Practice active listening in 1:1s and stakeholder updates",
    ],
    keyInsight:
      "Your edge is speed + influence; your risk is collateral damage to trust and quality when context demands steadiness or precision.",
  },
  iD: {
    profileSummary: {
      typeLine: "iD (Influence + Dominance)",
      styleLine: "Charismatic, goal-oriented, inspiring leader energy.",
      keyTraits: ["Outgoing", "Bold", "Vision-led", "Comfortable in the spotlight"],
    },
    behavioralTraits: [
      "Builds energy socially while still pushing for outcomes",
      "Uses enthusiasm to align people around a direction",
    ],
    strengths: [
      "Motivates through story and momentum",
      "Good at unblocking people issues that stall delivery",
    ],
    limitations: [
      "May underweight risk and operational detail when excited",
      "Can over-promise pace if optimism runs ahead of capacity",
    ],
    communication: {
      howYouCommunicate: ["Animated", "Persuasive", "Future-focused"],
      whatYouNeed: ["Visibility", "Buy-in", "Quick feedback loops"],
    },
    howToWorkWithYou: [
      "Give public clarity on priorities",
      "Pair with someone strong on execution detail when stakes are high",
    ],
    teamBehavior: ["Often sets the emotional tone of the room"],
    workEnvironment: ["Collaborative but outcome-led", "Room to influence stakeholders"],
    stressBehavior: ["May talk faster, push harder, seek control of narrative"],
    growth: ["Slow down for written specs (C)", "Create space for quieter contributors (S)"],
    keyInsight: "Momentum is your fuel—pair it with structure when delivery risk increases.",
  },
};

export function buildFullReport(result: DiscResult): DiscFullReport {
  const code = result.profile.style12;
  const base = baseInsight(result);
  const override = STYLE_OVERRIDES[code];
  if (!override) return base;
  return {
    profileSummary: { ...base.profileSummary, ...override.profileSummary },
    behavioralTraits: override.behavioralTraits ?? base.behavioralTraits,
    strengths: override.strengths ?? base.strengths,
    limitations: override.limitations ?? base.limitations,
    communication: {
      howYouCommunicate: override.communication?.howYouCommunicate ?? base.communication.howYouCommunicate,
      whatYouNeed: override.communication?.whatYouNeed ?? base.communication.whatYouNeed,
    },
    howToWorkWithYou: override.howToWorkWithYou ?? base.howToWorkWithYou,
    teamBehavior: override.teamBehavior ?? base.teamBehavior,
    workEnvironment: override.workEnvironment ?? base.workEnvironment,
    stressBehavior: override.stressBehavior ?? base.stressBehavior,
    growth: override.growth ?? base.growth,
    keyInsight: override.keyInsight ?? base.keyInsight,
  };
}
