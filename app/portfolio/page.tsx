"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { heroByCaseId, GenericVisual } from "./visuals";

const PASSWORD_HASH =
  "057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86";
const STORAGE_KEY = "portfolio-auth";

async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type Metric = { value: string; label: string };

type CaseStudy = {
  id: string;
  company: string;
  role: string;
  period: string;
  hook: string;
  tags: string[];
  problem: string;
  approach: string[];
  solution: string;
  outcome: string;
  metrics: Metric[];
  visuals: number; // number of placeholder visuals to render
};

const cases: CaseStudy[] = [
  {
    id: "tds-telecom",
    company: "TDS Telecom",
    role: "Senior UX/UI Designer",
    period: "Oct 2025 — Mar 2026",
    hook:
      "Led end-to-end UX/UI across Salesforce Field Service Mobile, Service Cloud, and Experience Cloud — plus AI-driven workflows and conversational design — for technicians, agents, and customers.",
    tags: ["Salesforce", "AI Workflows", "Service Cloud", "Conversational UX", "Design Systems"],
    problem:
      "Service technicians, support agents, and customers were each living in different surfaces with different patterns. Workflows were manual, AI capability sat unused, and chat experiences (both internal and external) weren't pulling their weight on deflection or resolution.",
    approach: [
      "Designed end-to-end UX/UI across Salesforce Field Service Mobile, Service Cloud, and Experience Cloud",
      "Scaled enterprise design system components aligned to Salesforce Lightning Design System (SLDS)",
      "Partnered with product + engineering to integrate AI-driven workflows and automation into service operations",
      "Designed external customer chat and internal agent chat — conversational flows, self-service deflection, escalation paths",
      "Facilitated discovery workshops + journey mapping in FigJam to align distributed teams in a fully remote enterprise",
    ],
    solution:
      "A unified set of Salesforce-native experiences with AI assist baked in, shared SLDS-aligned components, and chat surfaces that finally reduce manual load on agents while improving the customer self-serve path.",
    outcome:
      "Faster cross-team product delivery, more consistent service experiences, and conversational surfaces that move the needle on both deflection and CSAT.",
    metrics: [
      { value: "SLDS", label: "Aligned design system" },
      { value: "AI", label: "Workflow integration" },
      { value: "End-to-end", label: "Field, agent, customer" },
    ],
    visuals: 4,
  },
  {
    id: "pointclickcare",
    company: "PointClickCare",
    role: "Senior UX/UI Designer",
    period: "Jun 2025 — Sep 2025",
    hook:
      "Modernized a senior-living EMAR/EHR platform and a Material-UI design system that made engineering handoff measurably faster.",
    tags: ["Healthcare", "EMAR / EHR", "Material-UI", "Design Systems", "AI Workflows"],
    problem:
      "Clinical and care staff in senior living facilities were running on legacy EMAR/EHR workflows — slow, hard to learn, and built on inconsistent components. Engineering handoff was costly because every team rebuilt the same patterns.",
    approach: [
      "Led UX/UI for a senior-living EMAR/EHR platform, modernizing legacy clinical workflows",
      "Implemented a customized Material-UI (MUI) design system with rigorous consistency rules",
      "Validated designs directly with clinical and care stakeholders to drive task-time and training improvements",
      "Facilitated discovery + journey mapping in FigJam to align product, engineering, and business",
    ],
    solution:
      "A modern EMAR/EHR experience built on a customized MUI system, validated against real clinical users, with AI workflow surfaces that show their work.",
    outcome:
      "Clinical staff hit tasks faster with less training, and engineering shipped quicker because the design language was finally shared.",
    metrics: [
      { value: "30%", label: "Faster engineering handoff" },
      { value: "MUI", label: "Customized design system" },
      { value: "Validated", label: "With clinical users" },
    ],
    visuals: 4,
  },
  {
    id: "healthedge",
    company: "HealthEdge",
    role: "Lead UX/UI Designer",
    period: "Apr 2023 — Nov 2024",
    hook:
      "Led UX strategy across Claims Processing, Integration, Data Science, and Help Center — modernizing a healthcare platform for major payers and providers.",
    tags: ["Healthcare", "Platform UX", "B2B + B2C", "Claims Processing", "AI Workflows"],
    problem:
      "A high-stakes B2B/B2C healthcare platform had grown faster than its UX could keep up. Claims teams were stuck in slow processes, integration tooling was inconsistent, and there was no shared definition of what good UX even looked like across product lines.",
    approach: [
      "Led platform-wide UX modernization across four value streams",
      "Established the company's first UX metrics framework via a system-wide platform audit",
      "Reframed claims processing UX around the actual time-to-decision specialists needed",
      "Designed and scaled design system foundations + AI-enabled workflows across customer-facing and internal tools",
    ],
    solution:
      "A unified UX direction with measurable benchmarks, modernized claims and integration surfaces, and a metrics framework that turned 'feels better' into provable lifts.",
    outcome:
      "Customer satisfaction up, claims processing time down, and a feature-adoption story that finally had numbers behind it.",
    metrics: [
      { value: "37%", label: "Increase in customer satisfaction" },
      { value: "45%", label: "Reduction in claims processing time" },
      { value: "55%", label: "Improvement in feature adoption" },
    ],
    visuals: 5,
  },
  {
    id: "wipro",
    company: "WIPRO",
    role: "Principal UX Consultant",
    period: "Apr 2022 — Apr 2023",
    hook:
      "Directed UX engagements for TD Bank, Estée Lauder, and FedEx — turning Fortune 500 ambition into shipping product.",
    tags: ["Enterprise UX", "Fortune 500", "Salesforce Lightning", "E-commerce", "Service Cloud"],
    problem:
      "Three very different Fortune 500 clients with one shared symptom: digital surfaces that didn't match their brand promise. TD Bank was leaking transactions. Estée Lauder's global e-commerce wasn't converting. FedEx needed Service Cloud modernization. Each needed senior direction, fast, with no time to ramp.",
    approach: [
      "Plugged into each client's product + engineering teams as a Principal — not a contractor on the bench",
      "TD Bank: rebuilt the mobile banking flow on Salesforce Lightning Design System (SLDS)",
      "Estée Lauder: re-architected the global e-commerce experience around real conversion friction",
      "FedEx: modernized Salesforce Service Cloud — agent workflows, parcel tracking, case management, self-service",
      "Held a portfolio view across 5 enterprise projects and a $5M+ engagement book",
    ],
    solution:
      "Senior UX leadership embedded into each engagement — fast, opinionated, accountable to outcomes — with reusable patterns and design QA so the wins stuck after I left the room.",
    outcome:
      "Three Fortune 500 clients, three measurable lifts, and a 95% client satisfaction rate across the portfolio.",
    metrics: [
      { value: "$12M", label: "Added quarterly revenue (Estée Lauder)" },
      { value: "32%", label: "Mobile banking adoption lift (TD Bank)" },
      { value: "95%", label: "Client satisfaction across 5 projects" },
    ],
    visuals: 4,
  },
  {
    id: "aflac",
    company: "Aflac",
    role: "Lead UX/UI Designer (COE Team)",
    period: "Sep 2019 — Feb 2022",
    hook:
      "Directed UX/UI strategy across Claims Intake, Employee Benefits, HR, and the Leave Forecaster — serving 50M+ policyholders.",
    tags: ["Insurance", "B2C Enterprise", "AI Forecasting", "Design System", "Salesforce"],
    problem:
      "Aflac's enterprise platforms touched 50M+ policyholders, but core flows like benefits enrollment and HR leave management were still slow, manual, and hard for both employees and admins. The COE team needed to lead the next wave of digital transformation across multiple value streams at once.",
    approach: [
      "Owned UX/UI strategy across four enterprise value streams as a COE lead",
      "Rebuilt the employee benefits enrollment flow around real time-to-completion data",
      "Designed the Leave Forecaster — an AI-assisted tool predicting employee absences with high accuracy",
      "Established design system standards + UX best practices across the Center of Excellence",
    ],
    solution:
      "A modernized benefits enrollment flow that finished much faster, plus a Leave Forecaster tool that gave HR teams predictive power they didn't have before.",
    outcome:
      "Faster enrollments, higher benefits adoption, and HR teams that could now plan for absences instead of reacting to them.",
    metrics: [
      { value: "75%", label: "Faster benefits enrollment" },
      { value: "92%", label: "Leave Forecaster accuracy" },
      { value: "45%", label: "Admin overhead reduction" },
    ],
    visuals: 3,
  },
];

type Client = {
  name: string;
  size: "lg" | "md" | "sm";
  accent?: string; // brand color
  initials?: string;
};

const clients: Client[] = [
  { name: "TD Bank", size: "lg", accent: "#00B14F", initials: "TD" },
  { name: "FedEx", size: "lg", accent: "#660099", initials: "Fx" },
  { name: "Estée Lauder", size: "md", accent: "#000000", initials: "EL" },
  { name: "American Express", size: "md", accent: "#016FD0", initials: "Ax" },
  { name: "Aflac", size: "md", accent: "#FF5500", initials: "Af" },
  { name: "HealthEdge", size: "md", accent: "#0078D4", initials: "He" },
  { name: "PointClickCare", size: "md", accent: "#1E5FAD", initials: "PC" },
  { name: "BYUtv", size: "sm", accent: "#002E5D", initials: "BY" },
  { name: "Vans Warped Tour", size: "sm", accent: "#000000", initials: "VW" },
  { name: "Honda", size: "sm", accent: "#CC0000", initials: "Hd" },
  { name: "Acura", size: "sm", accent: "#000000", initials: "Ac" },
  { name: "Michigan State", size: "sm", accent: "#18453B", initials: "MS" },
  { name: "Vodafone", size: "sm", accent: "#E60000", initials: "Vo" },
  { name: "WIPRO", size: "md", accent: "#341F65", initials: "Wp" },
  { name: "Appirio", size: "sm", accent: "#FF6F2C", initials: "Ap" },
  { name: "Haulynx", size: "sm", accent: "#1E40AF", initials: "Hx" },
  { name: "STC Health", size: "sm", accent: "#0EA5E9", initials: "St" },
  { name: "ON Semiconductor", size: "sm", accent: "#FF6600", initials: "On" },
  { name: "Nextiva", size: "sm", accent: "#FF7A00", initials: "Nx" },
  { name: "CompuGroup Medical", size: "sm", accent: "#0075BB", initials: "Cg" },
  { name: "American Traffic Solutions", size: "sm", accent: "#003B5C", initials: "AT" },
  { name: "Universal Laser Systems", size: "sm", accent: "#1F2937", initials: "Ul" },
  { name: "Rich Dad Education", size: "sm", accent: "#7C2D12", initials: "Rd" },
  { name: "Helix House", size: "sm", accent: "#9F1239", initials: "Hh" },
];

function ClientChip({
  c,
  index,
}: {
  c: Client;
  index: number;
}): React.JSX.Element {
  const sizeClasses =
    c.size === "lg"
      ? "col-span-2 row-span-2 p-5"
      : c.size === "md"
        ? "col-span-2 row-span-1 p-4"
        : "col-span-1 row-span-1 p-3";

  // Stagger entrance + per-item drift phase
  const delay = (index * 0.08).toFixed(2);
  const drift = ((index * 0.7) % 2).toFixed(2);

  return (
    <div
      className={`client-chip group relative ${sizeClasses} rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-950/40 backdrop-blur-sm overflow-hidden cursor-default`}
      style={
        {
          ["--accent" as string]: c.accent ?? "#ef4444",
          ["--delay" as string]: `${delay}s`,
          ["--drift" as string]: `${drift}s`,
        } as React.CSSProperties
      }
    >
      {/* Brand color glow that intensifies on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${c.accent ?? "#ef4444"} 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between gap-2">
        {/* Initials badge */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center justify-center font-bold text-xs tracking-tight"
            style={{
              width: c.size === "lg" ? 36 : 28,
              height: c.size === "lg" ? 36 : 28,
              borderRadius: 8,
              background: c.accent,
              color: "#fff",
            }}
          >
            {c.initials}
          </div>
          <span
            className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ background: c.accent }}
          />
        </div>
        <div
          className={`text-white font-semibold leading-tight ${
            c.size === "lg"
              ? "text-lg"
              : c.size === "md"
                ? "text-sm"
                : "text-xs"
          }`}
        >
          {c.name}
        </div>
      </div>
    </div>
  );
}

function ClientShowcase(): React.JSX.Element {
  return (
    <div className="px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 client-grid">
          {clients.map((c, i) => (
            <ClientChip key={c.name} c={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseStudy({ c, index }: { c: CaseStudy; index: number }): React.JSX.Element {
  const Hero = heroByCaseId[c.id];
  return (
    <section
      id={c.id}
      className="py-20 px-6 border-t border-white/10 scroll-mt-20"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header row */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-red-400 mb-2">
            Case 0{index + 1} · {c.period}
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-4xl lg:text-5xl font-semibold">{c.company}</h2>
            <div className="text-white/60 text-sm">{c.role}</div>
          </div>
          <p className="text-xl text-white/85 max-w-3xl leading-relaxed mt-5">
            {c.hook}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {c.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="aspect-[16/9] lg:aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 mb-12">
          {Hero ? <Hero /> : <GenericVisual seed={index} />}
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {c.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 via-rose-400 to-red-600 bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-red-400 mb-3">
              The problem
            </h3>
            <p className="text-white/80 leading-relaxed">{c.problem}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-red-400 mb-3">
              The approach
            </h3>
            <ul className="space-y-2">
              {c.approach.map((step) => (
                <li
                  key={step}
                  className="text-white/80 text-sm flex gap-2 leading-relaxed"
                >
                  <span className="text-red-400 shrink-0">→</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-red-400 mb-3">
              The outcome
            </h3>
            <p className="text-white/80 leading-relaxed mb-3">{c.solution}</p>
            <p className="text-white/70 leading-relaxed text-sm">{c.outcome}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioContent(): React.JSX.Element {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 uppercase tracking-widest">
              NDA cleared
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 uppercase tracking-widest">
              Selected work
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight mb-5">
            Portfolio
          </h1>
          <p className="text-xl text-white/85 max-w-3xl leading-relaxed mb-4">
            Product Design Leader. Enterprise UX/UI. Design Systems.
            AI-driven product experiences.
          </p>
          <p className="text-base text-white/70 max-w-3xl leading-relaxed mb-8">
            20+ years helping organizations turn complex digital products into
            intuitive, scalable systems. Each case below leads with the
            problem, the approach, the outcome, and the numbers.
          </p>
          <div className="border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
              Past work spans
            </p>
          </div>
        </div>
      </section>

      {/* Client showcase */}
      <section className="pb-16 -mt-2">
        <ClientShowcase />
      </section>

      {/* Index */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cases.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="group block rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-red-500/40 p-5 transition-all"
              >
                <div className="text-xs uppercase tracking-widest text-red-400 mb-2">
                  Case 0{i + 1}
                </div>
                <div className="text-lg font-semibold mb-1 group-hover:text-red-300 transition-colors">
                  {c.company}
                </div>
                <div className="text-xs text-white/60">{c.role}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      {cases.map((c, i) => (
        <CaseStudy key={c.id} c={c} index={i} />
      ))}

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold mb-3">
            Want a deeper walkthrough?
          </h2>
          <p className="text-white/70 mb-6">
            Most of these have richer material I can share live — flows,
            sketches, before/after screens, decisions that didn&apos;t make the
            cut. Email me and I&apos;ll set up a session.
          </p>
          <a
            href="mailto:ross@codedink.com?subject=Portfolio%20walkthrough"
            className="inline-block rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium px-6 py-3 transition-all shadow-lg shadow-red-900/40"
          >
            Schedule a walkthrough →
          </a>
        </div>
      </section>
    </>
  );
}

export default function Portfolio(): React.JSX.Element {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const hash = await sha256(password);
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
    } else {
      setError("Nope — try again, or ping me and I'll send you the key.");
      setPassword("");
    }
    setSubmitting(false);
  }

  if (authed === null) {
    return <main className="min-h-screen bg-[#110720]" />;
  }

  return (
    <main className="min-h-screen bg-[#110720] text-white">
      <Header />
      {authed ? (
        <PortfolioContent />
      ) : (
        <section className="pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="w-full max-w-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-md shadow-2xl shadow-red-900/20">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-lg shadow-red-900/50">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-white"
                  aria-hidden="true"
                >
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                  <circle cx="12" cy="16" r="1.3" fill="currentColor" />
                </svg>
                <span className="absolute -top-1 -right-1 text-[10px] font-bold tracking-widest bg-black/60 border border-red-500/40 text-red-300 rounded-full px-2 py-0.5">
                  NDA
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-center mb-3">
              Classified by{" "}
              <span className="bg-gradient-to-r from-red-600 via-rose-400 to-red-600 bg-clip-text text-transparent">
                legal
              </span>
              , not by ego.
            </h1>

            <p className="text-white/80 text-center leading-relaxed mb-6">
              Most of my best work lives under signed NDAs with Enterprise and
              Fortune 500 clients. I can&apos;t drop screenshots into a public
              gallery without summoning a legal team, so everything sensitive
              sits behind this little red door.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-sm text-white/75 space-y-2">
              <p className="font-semibold text-white">What&apos;s inside:</p>
              <ul className="space-y-1.5 list-none">
                <li className="flex gap-2">
                  <span className="text-red-400 shrink-0">→</span>
                  <span>Case studies from WIPRO, HealthEdge, Aflac, and TDS Telecom</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 shrink-0">→</span>
                  <span>Design system work, research artifacts, and before/after flows</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 shrink-0">→</span>
                  <span>Full-resolution visuals (no blurred screenshots)</span>
                </li>
              </ul>
            </div>

            <p className="text-white/70 text-sm text-center mb-6">
              Recruiter, hiring manager, or just curious?{" "}
              <a
                href="mailto:ross@codedink.com?subject=Portfolio%20access"
                className="text-red-400 hover:text-red-300 underline underline-offset-2"
              >
                Email me
              </a>{" "}
              and I&apos;ll send you the password.
            </p>

            <form onSubmit={handleSubmit}>
              <label className="block text-sm text-white/80 mb-2" htmlFor="pwd">
                Password
              </label>
              <input
                id="pwd"
                type="password"
                autoFocus
                placeholder="Enter the key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-white placeholder-white/30 outline-none focus:border-red-500 transition-colors"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting || !password}
                className="mt-5 w-full rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 transition-all shadow-lg shadow-red-900/40"
              >
                {submitting ? "Verifying…" : "Unlock portfolio"}
              </button>
            </form>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
