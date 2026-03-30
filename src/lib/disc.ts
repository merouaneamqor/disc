export type DiscFactor = "D" | "I" | "S" | "C";

export type DiscOption = {
  text: string;
  factor: DiscFactor;
};

export type DiscQuestion = {
  id: number;
  options: DiscOption[];
};

export type QuestionAnswer = {
  most: number | null;
  least: number | null;
};

export const DISC_QUESTIONS: DiscQuestion[] = [
  {
    id: 1,
    options: [
      { text: "People look up to me", factor: "I" },
      { text: "I tend to be a kind person", factor: "S" },
      { text: "I accept life as it comes", factor: "C" },
      { text: "People say I have a strong personality", factor: "D" },
    ],
  },
  {
    id: 2,
    options: [
      { text: "I find it difficult to relax", factor: "D" },
      { text: "I have a very wide circle of friends", factor: "I" },
      { text: "I am always ready to help others", factor: "S" },
      { text: "I like to behave correctly", factor: "C" },
    ],
  },
  {
    id: 3,
    options: [
      { text: "I tend to do what I am told", factor: "S" },
      { text: "I like things to be very neat and tidy", factor: "C" },
      { text: "People can't put me down", factor: "D" },
      { text: "I enjoy having fun", factor: "I" },
    ],
  },
  {
    id: 4,
    options: [
      { text: "I respect my elders and those in authority", factor: "C" },
      { text: "I am always willing to do new things - to take a risk", factor: "D" },
      { text: "I believe things will go well", factor: "I" },
      { text: "I am always willing to help", factor: "S" },
    ],
  },
  {
    id: 5,
    options: [
      { text: "I am a neat and orderly person", factor: "C" },
      { text: "I am very active, both at work and play", factor: "I" },
      { text: "I am a very calm and placid person", factor: "S" },
      { text: "I generally get my own way", factor: "D" },
    ],
  },
  {
    id: 6,
    options: [
      { text: "I am very contented with life", factor: "S" },
      { text: "I tend to trust people", factor: "I" },
      { text: "I like peace and quiet", factor: "C" },
      { text: "I have a very positive attitude", factor: "D" },
    ],
  },
  {
    id: 7,
    options: [
      { text: "I have a great deal of will power", factor: "D" },
      { text: "I always take notice of what other people say", factor: "C" },
      { text: "I try to be obliging", factor: "S" },
      { text: "I am always cheerful", factor: "I" },
    ],
  },
  {
    id: 8,
    options: [
      { text: "I am self-confident", factor: "D" },
      { text: "People say I am a sympathetic type", factor: "S" },
      { text: "I have a tolerant attitude towards life", factor: "C" },
      { text: "I am an assertive person", factor: "I" },
    ],
  },
  {
    id: 9,
    options: [
      { text: "I never lose my temper", factor: "S" },
      { text: "I like things to be precise and correct", factor: "C" },
      { text: "I am very sure of myself", factor: "D" },
      { text: "I enjoy having a laugh and a joke", factor: "I" },
    ],
  },
  {
    id: 10,
    options: [
      { text: "My behaviour is well disciplined", factor: "C" },
      { text: "People see me as being helpful", factor: "S" },
      { text: "I am always on the move", factor: "I" },
      { text: "I persevere until I get what I want", factor: "D" },
    ],
  },
  {
    id: 11,
    options: [
      { text: "I enjoy competition", factor: "D" },
      { text: "I do not treat life too seriously", factor: "I" },
      { text: "I always consider others", factor: "S" },
      { text: "I am an agreeable type", factor: "C" },
    ],
  },
  {
    id: 12,
    options: [
      { text: "I am very persuasive", factor: "D" },
      { text: "I see myself as a gentle person", factor: "S" },
      { text: "I am a very modest type", factor: "C" },
      { text: "I often come up with original ideas", factor: "I" },
    ],
  },
  {
    id: 13,
    options: [
      { text: "I am very helpful towards others", factor: "S" },
      { text: "I don't like tempting fate", factor: "C" },
      { text: "I don't give up easily", factor: "D" },
      { text: "People like my company", factor: "I" },
    ],
  },
  {
    id: 14,
    options: [
      { text: "I tend to be a cautious person", factor: "C" },
      { text: "I am a very determined person", factor: "D" },
      { text: "I am good at convincing people", factor: "I" },
      { text: "I tend to be a friendly person", factor: "S" },
    ],
  },
  {
    id: 15,
    options: [
      { text: "I don't scare easily", factor: "D" },
      { text: "People find my company stimulating", factor: "I" },
      { text: "I am always willing to follow orders", factor: "C" },
      { text: "I am a rather shy person", factor: "S" },
    ],
  },
  {
    id: 16,
    options: [
      { text: "I am very willing to change my opinion", factor: "S" },
      { text: "I like a good argument", factor: "D" },
      { text: "I tend to be an easy going type", factor: "C" },
      { text: "I always look on the bright side of life", factor: "I" },
    ],
  },
  {
    id: 17,
    options: [
      { text: "I am a very social sort of person", factor: "I" },
      { text: "I am very patient", factor: "S" },
      { text: "I am a very self-sufficient sort of person", factor: "D" },
      { text: "I rarely raise my voice", factor: "C" },
    ],
  },
  {
    id: 18,
    options: [
      { text: "I am always ready and willing", factor: "S" },
      { text: "I am always keen to try new things", factor: "D" },
      { text: "I don't like arguments", factor: "C" },
      { text: "People describe me as high spirited", factor: "I" },
    ],
  },
  {
    id: 19,
    options: [
      { text: "I enjoy taking a chance", factor: "D" },
      { text: "I tend to be very receptive to other people's ideas", factor: "S" },
      { text: "I am always polite and courteous", factor: "C" },
      { text: "I am a moderate rather than an extreme person", factor: "I" },
    ],
  },
  {
    id: 20,
    options: [
      { text: "I tend to be a forgiving type", factor: "S" },
      { text: "I am a sensitive person", factor: "C" },
      { text: "I have a lot of energy and vigour", factor: "D" },
      { text: "I can mix with anybody", factor: "I" },
    ],
  },
  {
    id: 21,
    options: [
      { text: "I enjoy chatting with people", factor: "I" },
      { text: "I control my emotions", factor: "C" },
      { text: "I am very conventional in my outlook", factor: "S" },
      { text: "I make decisions quickly", factor: "D" },
    ],
  },
  {
    id: 22,
    options: [
      { text: "I tend to keep my feelings to myself", factor: "S" },
      { text: "Accuracy is very important to me", factor: "C" },
      { text: "I like to speak my mind", factor: "D" },
      { text: "I am very friendly", factor: "I" },
    ],
  },
  {
    id: 23,
    options: [
      { text: "I like to handle things with diplomacy", factor: "S" },
      { text: "I am very daring", factor: "D" },
      { text: "Most people find me acceptable", factor: "I" },
      { text: "I feel satisfied with life", factor: "C" },
    ],
  },
  {
    id: 24,
    options: [
      { text: "I am obedient", factor: "C" },
      { text: "I am always willing to have a go", factor: "D" },
      { text: "Loyalty is one of my strengths", factor: "S" },
      { text: "I have a good deal of charm", factor: "I" },
    ],
  },
  {
    id: 25,
    options: [
      { text: "I tend to be an aggressive type", factor: "D" },
      { text: "I am good fun and have a lot of personality", factor: "I" },
      { text: "People tend to see me as an \"easy touch\"", factor: "S" },
      { text: "I tend to be rather timid", factor: "C" },
    ],
  },
  {
    id: 26,
    options: [
      { text: "I am good at motivating people", factor: "I" },
      { text: "Patience is one of my major strengths", factor: "S" },
      { text: "I am careful to say the right thing", factor: "C" },
      { text: "I have a strong desire to win", factor: "D" },
    ],
  },
  {
    id: 27,
    options: [
      { text: "People find me easy to get on with", factor: "I" },
      { text: "I get a lot of satisfaction from helping others", factor: "S" },
      { text: "I always think things through", factor: "C" },
      { text: "I prefer to get things done now rather than later", factor: "D" },
    ],
  },
  {
    id: 28,
    options: [
      { text: "I am good at analysing situations", factor: "C" },
      { text: "I get restless quickly", factor: "D" },
      { text: "I think about how my decisions might affect others", factor: "S" },
      { text: "People see me as relaxed and easy going", factor: "I" },
    ],
  },
];

const FACTORS: DiscFactor[] = ["D", "I", "S", "C"];

/** Ring order for adjacency: D–I–S–C–D (Everything DiSC®–style circumplex). */
const RING: DiscFactor[] = ["D", "I", "S", "C"];

const PURITY_NET_GAP = 5;

export type TwelveStyleCode =
  | "Di"
  | "iD"
  | "I"
  | "iS"
  | "Si"
  | "S"
  | "SC"
  | "CS"
  | "C"
  | "CD"
  | "DC"
  | "D";

export type TwelveStyleInfo = {
  code: TwelveStyleCode;
  title: string;
  zone: string;
  summary: string;
};

const TWELVE_STYLE_INFO: Record<TwelveStyleCode, TwelveStyleInfo> = {
  Di: {
    code: "Di",
    title: "Di — Dominance + Influence",
    zone: "Action / leadership",
    summary:
      "Action- and opportunity-oriented; often daring. Persuasive and results-driven (entrepreneurial energy).",
  },
  iD: {
    code: "iD",
    title: "iD — Influence + Dominance",
    zone: "Action / leadership",
    summary:
      "Results-based; bold choices and inspiring others. Charismatic and goal-oriented (inspiring leader).",
  },
  I: {
    code: "I",
    title: "I — Influence",
    zone: "People / energy",
    summary: "Focus on networking, enthusiasm, and being social.",
  },
  iS: {
    code: "iS",
    title: "iS — Influence + Steadiness",
    zone: "People / collaboration",
    summary: "Collaborative and accommodating; friends, positivity, team glue.",
  },
  Si: {
    code: "Si",
    title: "Si — Steadiness + Influence",
    zone: "People / collaboration",
    summary: "Relationships and group contribution; warm, agreeable, cooperative.",
  },
  S: {
    code: "S",
    title: "S — Steadiness",
    zone: "Stability / support",
    summary: "Prefers a stable environment; calm, patient, supportive.",
  },
  SC: {
    code: "SC",
    title: "SC — Steadiness + Conscientiousness",
    zone: "Stability / process",
    summary: "Progress-oriented with a calm environment; detail-aware (ops / reliability).",
  },
  CS: {
    code: "CS",
    title: "CS — Conscientiousness + Steadiness",
    zone: "Stability / process",
    summary: "Careful, methodical, reliable; humble preference for stability.",
  },
  C: {
    code: "C",
    title: "C — Conscientiousness",
    zone: "Logic / accuracy",
    summary: "Clear communication, accurate results, analytical and systematic.",
  },
  CD: {
    code: "CD",
    title: "CD — Conscientiousness + Dominance",
    zone: "Logic / control",
    summary: "Clear, thought-out, logical; analytical plus assertive.",
  },
  DC: {
    code: "DC",
    title: "DC — Dominance + Conscientiousness",
    zone: "Logic / control",
    summary: "Independent; strong standards. Strategic, technical-leadership energy.",
  },
  D: {
    code: "D",
    title: "D — Dominance",
    zone: "Action / results",
    summary: "Direct, competitive, results-focused; control and pace.",
  },
};

function adjacent(a: DiscFactor, b: DiscFactor): boolean {
  if (a === b) return false;
  const i = RING.indexOf(a);
  const j = RING.indexOf(b);
  const diff = Math.abs(i - j);
  return diff === 1 || diff === 3;
}

function neighborsOf(f: DiscFactor): [DiscFactor, DiscFactor] {
  const i = RING.indexOf(f);
  return [RING[(i + 3) % 4], RING[(i + 1) % 4]];
}

function mixedCodeForAdjacentPair(
  a: DiscFactor,
  b: DiscFactor,
  net: Record<DiscFactor, number>
): TwelveStyleCode {
  const na = net[a];
  const nb = net[b];
  const pair = new Set([a, b]);

  if (pair.has("D") && pair.has("I")) {
    return na >= nb ? "Di" : "iD";
  }
  if (pair.has("I") && pair.has("S")) {
    return na >= nb ? "iS" : "Si";
  }
  if (pair.has("S") && pair.has("C")) {
    return na >= nb ? "SC" : "CS";
  }
  if (pair.has("C") && pair.has("D")) {
    return na >= nb ? "CD" : "DC";
  }
  return "D";
}

export function resolveTwelveStyle(net: Record<DiscFactor, number>): TwelveStyleInfo {
  const ranked = FACTORS.map((f) => ({ f, n: net[f] }))
    .sort((x, y) => y.n - x.n || x.f.localeCompare(y.f));

  const top = ranked[0];
  const second = ranked[1];

  if (top.n - second.n >= PURITY_NET_GAP) {
    const pure = top.f as TwelveStyleCode;
    return TWELVE_STYLE_INFO[pure];
  }

  const a: DiscFactor = top.f;
  let b: DiscFactor = second.f;

  if (!adjacent(a, b)) {
    const [n1, n2] = neighborsOf(a);
    b = net[n1] > net[n2] ? n1 : net[n2] > net[n1] ? n2 : n1 < n2 ? n1 : n2;
  }

  const code = mixedCodeForAdjacentPair(a, b, net);
  return TWELVE_STYLE_INFO[code];
}

export type DiscResult = {
  most: Record<DiscFactor, number>;
  least: Record<DiscFactor, number>;
  net: Record<DiscFactor, number>;
  primary: DiscFactor;
  twelveStyle: TwelveStyleInfo | null;
};

export function calculateDisc(answers: QuestionAnswer[]): DiscResult {
  const most: Record<DiscFactor, number> = { D: 0, I: 0, S: 0, C: 0 };
  const least: Record<DiscFactor, number> = { D: 0, I: 0, S: 0, C: 0 };

  answers.forEach((answer, index) => {
    if (answer.most !== null) {
      const factor = DISC_QUESTIONS[index].options[answer.most].factor;
      most[factor] += 1;
    }
    if (answer.least !== null) {
      const factor = DISC_QUESTIONS[index].options[answer.least].factor;
      least[factor] += 1;
    }
  });

  const net: Record<DiscFactor, number> = { D: 0, I: 0, S: 0, C: 0 };
  FACTORS.forEach((factor) => {
    net[factor] = most[factor] - least[factor];
  });

  const primary = FACTORS.reduce((best, current) =>
    net[current] > net[best] ? current : best
  );

  const complete = answers.every((a) => a.most !== null && a.least !== null);
  const twelveStyle = complete ? resolveTwelveStyle(net) : null;

  return { most, least, net, primary, twelveStyle };
}
