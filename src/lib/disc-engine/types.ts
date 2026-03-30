export type DiscDimension = "D" | "I" | "S" | "C";

export type DiscOption = {
  id: string;
  text: string;
  dimension: DiscDimension;
  desirability: number;
};

export type DiscBlock = {
  id: number;
  options: [DiscOption, DiscOption, DiscOption, DiscOption];
};

export type ForcedChoiceAnswer = {
  blockId: number;
  mostOptionId: string;
  leastOptionId: string;
};

export type DiscDataset = {
  label: "natural" | "adapted";
  answers: ForcedChoiceAnswer[];
};

export type DiscScore = {
  raw: number;
  z: number;
  percentile: number;
};

export type DiscScores = Record<DiscDimension, DiscScore>;

export type IntensityBand = "Very Low" | "Low" | "Moderate" | "High" | "Very High";

export type DiscProfile = {
  primary: DiscDimension;
  secondary: DiscDimension;
  type: string;
  style12: string;
};

export type DiscQuality = {
  reliable: boolean;
  contradictionIndex: number;
  monotonyIndex: number;
  socialDesirabilityIndex: number;
  flags: string[];
};

export type DiscInsights = {
  strengths: string[];
  weaknesses: string[];
  management_style: string[];
  communication_style: string[];
};

export type DiscResult = {
  model: "DISC_IPSATIVE_V1";
  dataset: "natural" | "adapted";
  scores: DiscScores;
  profile: DiscProfile;
  intensity: Record<DiscDimension, IntensityBand>;
  quality: DiscQuality;
  insights: DiscInsights;
  radar: { labels: DiscDimension[]; values: number[] };
};

export type DiscComparison = {
  natural: DiscResult;
  adapted: DiscResult | null;
  delta: Record<DiscDimension, number> | null;
};
