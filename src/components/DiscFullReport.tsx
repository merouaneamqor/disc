import type { ReactNode } from "react";
import type { DiscResult } from "@/lib/disc-engine/types";
import { buildFullReport } from "@/lib/disc-report/fullReportContent";
import type { AdaptationStress } from "@/lib/disc-report/adaptation";

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-primary-indigo">
        Section {n}
      </h3>
      <h4 className="mt-1 text-base font-semibold text-foreground">{title}</h4>
      <div className="mt-3 text-sm text-text-secondary">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

type Props = {
  natural: DiscResult;
  adapted: DiscResult | null;
  stress: AdaptationStress | null;
};

export function DiscFullReport({ natural, adapted, stress }: Props) {
  const report = buildFullReport(natural);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-dashed border-border bg-zinc-50/80 p-4 text-sm text-text-secondary dark:bg-zinc-900/40">
        <p className="font-medium text-foreground">Key insight</p>
        <p className="mt-1">{report.keyInsight}</p>
        <p className="mt-2 text-xs">
          DISC reflects behavioral prediction under context (pace, pressure, role demands)—not a label of who you are
          permanently.
        </p>
      </div>

      <Section n={1} title="Profile summary">
        <p className="font-medium text-foreground">Type: {report.profileSummary.typeLine}</p>
        <p className="mt-1">{report.profileSummary.styleLine}</p>
        <p className="mt-2 text-xs font-semibold text-foreground">Key traits</p>
        <Bullets items={report.profileSummary.keyTraits} />
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {(["D", "I", "S", "C"] as const).map((d) => (
            <div key={d} className="rounded-lg border border-border bg-background px-2 py-1.5">
              <span className="font-semibold text-foreground">{d}</span>
              <span className="block text-text-secondary">{natural.intensity[d]}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section n={2} title="Behavioral traits">
        <Bullets items={report.behavioralTraits} />
      </Section>

      <Section n={3} title="Strengths">
        <Bullets items={report.strengths} />
      </Section>

      <Section n={4} title="Limitations">
        <Bullets items={report.limitations} />
      </Section>

      <Section n={5} title="Communication style">
        <p className="text-xs font-semibold text-foreground">How you tend to communicate</p>
        <Bullets items={report.communication.howYouCommunicate} />
        <p className="mt-3 text-xs font-semibold text-foreground">What you typically need from others</p>
        <Bullets items={report.communication.whatYouNeed} />
      </Section>

      <Section n={6} title="How to work with you">
        <Bullets items={report.howToWorkWithYou} />
      </Section>

      <Section n={7} title="Team behavior">
        <Bullets items={report.teamBehavior} />
      </Section>

      <Section n={8} title="Work environment preferences">
        <Bullets items={report.workEnvironment} />
      </Section>

      <Section n={9} title="Stress behavior">
        <Bullets items={report.stressBehavior} />
      </Section>

      <Section n={10} title="Growth recommendations">
        <Bullets items={report.growth} />
      </Section>

      {adapted && stress ? (
        <section className="rounded-xl border border-primary-indigo/25 bg-gradient-to-br from-primary-indigo/5 to-accent-purple/5 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-primary-indigo">
            Addendum — Natural vs adapted
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Your natural profile summarizes the first pass; adapted reflects how you behave at work. The gap is a
            practical signal of role fit and sustainable pacing—not a grade.
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            Adaptation stress: {stress.label} (≈{stress.meanPercentileGap} average percentile shift)
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-text-secondary">
            <li>
              Natural style: {natural.profile.style12} ({natural.profile.primary}
              {natural.profile.secondary === natural.profile.primary ? "" : `+${natural.profile.secondary}`})
            </li>
            <li>
              Adapted style: {adapted.profile.style12} ({adapted.profile.primary}
              {adapted.profile.secondary === adapted.profile.primary ? "" : `+${adapted.profile.secondary}`})
            </li>
          </ul>
        </section>
      ) : null}
    </div>
  );
}
