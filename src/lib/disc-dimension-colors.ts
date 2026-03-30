import type { DiscDimension } from "@/lib/disc-engine/types";

/** Tailwind background classes for percentile bars (saturated dimension hues). */
export const DISC_DIMENSION_BAR_CLASS: Record<DiscDimension, string> = {
  D: "bg-disc-d-bar",
  I: "bg-disc-i-bar",
  S: "bg-disc-s-bar",
  C: "bg-disc-c-bar",
};

/** Softer same-hue bars for “natural” in dual comparison rows. */
export const DISC_DIMENSION_BAR_NATURAL_CLASS: Record<DiscDimension, string> = {
  D: "bg-disc-d-bar/55",
  I: "bg-disc-i-bar/55",
  S: "bg-disc-s-bar/55",
  C: "bg-disc-c-bar/55",
};

/** CSS custom property names (defined in globals.css) for SVG fills. */
export const DISC_DIMENSION_BAR_CSS_VAR: Record<DiscDimension, string> = {
  D: "--disc-d-bar",
  I: "--disc-i-bar",
  S: "--disc-s-bar",
  C: "--disc-c-bar",
};
