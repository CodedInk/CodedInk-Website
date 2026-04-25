"use client";

import { useEffect, useRef, useState } from "react";

type Step =
  | "greeting"
  | "intent"
  | "recruiter"
  | "business"
  | "curious"
  | "self"
  | "done";

type Reply = {
  label: string;
  next: Step;
  href?: string;
};

type Bubble = {
  text: string;
  replies?: Reply[];
};

const STORAGE_KEY = "ink-greeted";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const flow: Record<Step, () => Bubble> = {
  greeting: () => ({
    text:
      "Whoa whoa whoa — hold up. Don't try to figure this whole site out by yourself. Let me help! I'm Ink. Want a tour?",
    replies: [
      { label: "Yes please, show me around", next: "intent" },
      { label: "I got this, Ink", next: "self" },
    ],
  }),
  intent: () => ({
    text:
      "Sweet. So what brings you to Ross's corner of the internet today?",
    replies: [
      { label: "I'm hiring / recruiting", next: "recruiter" },
      { label: "I need design services", next: "business" },
      { label: "Just exploring", next: "curious" },
      { label: "I know what I want", next: "self" },
    ],
  }),
  recruiter: () => ({
    text:
      "Oh nice, a recruiter — Ross loves you. Heads up: most of his best work is under NDA, so the portfolio is locked. Hit the email link on the page and he'll send the key.",
    replies: [
      { label: "Take me to the portfolio", next: "done", href: `${BASE}/portfolio` },
      { label: "Show me services first", next: "business" },
      { label: "Back", next: "intent" },
    ],
  }),
  business: () => ({
    text:
      "Looking to hire Ross? Smart move. There are three subscription tiers (Advisory, Embedded, Systems & Sites) plus one-off add-ons. I'll show you.",
    replies: [
      { label: "Show me the services", next: "done", href: `${BASE}/services` },
      { label: "Show me his past work", next: "recruiter" },
      { label: "Back", next: "intent" },
    ],
  }),
  curious: () => ({
    text:
      "A curious one, I love it. Start with the typing intro up top, scroll down for the work history, then peek at services. I'll be here if you get lost.",
    replies: [
      { label: "Show me services", next: "done", href: `${BASE}/services` },
      { label: "Show me portfolio", next: "recruiter" },
      { label: "I'll keep scrolling", next: "done" },
    ],
  }),
  self: () => ({
    text:
      "Alright, lone wolf. I respect it. Tap me anytime if you change your mind — I'll be over here judging your scroll speed.",
    replies: [{ label: "Got it", next: "done" }],
  }),
  done: () => ({ text: "" }),
};

const idleQuips = [
  "Pssst — over here.",
  "No no no, don't click randomly! Let me help.",
  "Oh no, you're on your own again? Want a hand?",
  "I see you scrolling. I see you.",
  "Lost? Confused? Just curious about Ross? Tap me.",
  "I'm not bumping the screen on purpose. Mostly.",
  "Hey hey hey — I have shortcuts for that.",
];

function MetalHand({
  cx,
  cy,
  flip = false,
}: {
  cx: number;
  cy: number;
  flip?: boolean;
}): React.JSX.Element {
  // Mini "rock horns" hand: little fist with index + pinky up
  const dir = flip ? -1 : 1;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* fist */}
      <circle cx="0" cy="0" r="5" fill="#fb7185" stroke="#7f1d1d" strokeWidth="1.2" />
      {/* index finger */}
      <line
        x1={-2 * dir}
        y1="-3"
        x2={-2 * dir}
        y2="-12"
        stroke="#fb7185"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <line
        x1={-2 * dir}
        y1="-3"
        x2={-2 * dir}
        y2="-12"
        stroke="#7f1d1d"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* pinky */}
      <line
        x1={3 * dir}
        y1="-3"
        x2={3 * dir}
        y2="-10"
        stroke="#fb7185"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <line
        x1={3 * dir}
        y1="-3"
        x2={3 * dir}
        y2="-10"
        stroke="#7f1d1d"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </g>
  );
}

function DropletBuddy({
  waving,
  bumping,
  metal,
  size = 96,
}: {
  waving: boolean;
  bumping: boolean;
  metal: boolean;
  size?: number;
}): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={size * (140 / 120)}
      aria-hidden="true"
      style={{ overflow: "visible", display: "block" }}
      className={bumping ? "ink-bumping" : metal ? "ink-headbang" : "ink-idle"}
    >
      <defs>
        <linearGradient id="ink-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <radialGradient id="ink-shine" cx="0.35" cy="0.35" r="0.25">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Legs (behind body) */}
      <g stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round">
        <line x1="48" y1="118" x2="44" y2="132">
          <animate
            attributeName="x2"
            values="44;48;44"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </line>
        <line x1="72" y1="118" x2="76" y2="132">
          <animate
            attributeName="x2"
            values="76;72;76"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </line>
      </g>
      {/* Shoes */}
      <ellipse cx="44" cy="134" rx="6" ry="3" fill="#1a0a1a" />
      <ellipse cx="76" cy="134" rx="6" ry="3" fill="#1a0a1a" />

      {/* Drop body */}
      <g>
        <path
          d="M60 8 C 30 50, 18 78, 30 98 C 42 118, 78 118, 90 98 C 102 78, 90 50, 60 8 Z"
          fill="url(#ink-body)"
          stroke="#7f1d1d"
          strokeWidth="1.5"
        />
        <path
          d="M60 8 C 30 50, 18 78, 30 98 C 42 118, 78 118, 90 98 C 102 78, 90 50, 60 8 Z"
          fill="url(#ink-shine)"
        />
        {/* Eyes — bumping=shock X, metal=cheeky squint, default=blinking */}
        {bumping ? (
          <g stroke="#1a0a1a" strokeWidth="2.5" strokeLinecap="round">
            <line x1="42" y1="76" x2="54" y2="80" />
            <line x1="42" y1="80" x2="54" y2="76" />
            <line x1="66" y1="76" x2="78" y2="80" />
            <line x1="66" y1="80" x2="78" y2="76" />
          </g>
        ) : metal ? (
          <g stroke="#1a0a1a" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M 42 78 Q 48 74, 54 78" />
            <path d="M 66 78 Q 72 74, 78 78" />
          </g>
        ) : (
          <>
            <g fill="#fff">
              <circle cx="48" cy="78" r="9" />
              <circle cx="72" cy="78" r="9" />
            </g>
            <g fill="#1a0a1a">
              <circle cx="50" cy="80" r="4">
                <animate
                  attributeName="cy"
                  values="80;79;80"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="74" cy="80" r="4">
                <animate
                  attributeName="cy"
                  values="80;79;80"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </>
        )}
        {/* Cheeks */}
        <circle cx="42" cy="92" r="4" fill="#fb7185" opacity="0.5" />
        <circle cx="78" cy="92" r="4" fill="#fb7185" opacity="0.5" />
        {/* Mouth — bumping=O, metal=tongue out, default=smile */}
        {bumping ? (
          <ellipse cx="60" cy="100" rx="5" ry="6" fill="#1a0a1a" />
        ) : metal ? (
          <g>
            <path
              d="M 50 96 Q 60 106, 70 96"
              fill="#1a0a1a"
              stroke="#1a0a1a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* tongue */}
            <path
              d="M 56 100 Q 60 110, 64 100 Z"
              fill="#fb7185"
              stroke="#7f1d1d"
              strokeWidth="0.8"
            />
          </g>
        ) : (
          <path
            d="M 52 96 Q 60 102, 68 96"
            fill="none"
            stroke="#1a0a1a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </g>

      {/* LEFT ARM */}
      {metal ? (
        <>
          <path
            d="M28 86 Q 14 60, 18 36"
            stroke="#7f1d1d"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <MetalHand cx={18} cy={36} flip />
        </>
      ) : (
        <>
          <path
            d={bumping ? "M28 86 Q 14 84, 14 72" : "M28 86 Q 18 92, 22 102"}
            stroke="#7f1d1d"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={bumping ? 14 : 22}
            cy={bumping ? 72 : 102}
            r="4"
            fill="#fb7185"
            stroke="#7f1d1d"
            strokeWidth="1.5"
          />
        </>
      )}

      {/* RIGHT ARM */}
      {metal ? (
        <>
          <path
            d="M92 86 Q 106 60, 102 36"
            stroke="#7f1d1d"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <MetalHand cx={102} cy={36} />
        </>
      ) : (
        <g style={{ transformOrigin: "92px 84px" }}>
          {waving && !bumping && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 92 84; -25 92 84; 15 92 84; -25 92 84; 0 92 84"
              dur="1.4s"
              repeatCount="3"
            />
          )}
          <path
            d={bumping ? "M92 86 Q 106 84, 106 72" : "M92 86 Q 104 80, 104 70"}
            stroke="#7f1d1d"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={bumping ? 106 : 104}
            cy={bumping ? 72 : 70}
            r="4.5"
            fill="#fb7185"
            stroke="#7f1d1d"
            strokeWidth="1.5"
          />
        </g>
      )}
    </svg>
  );
}

export default function Mascot(): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [waving, setWaving] = useState(false);
  const [bumping, setBumping] = useState(false);
  const [metal, setMetal] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);
  const quipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const metalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const greeted = sessionStorage.getItem(STORAGE_KEY) === "1";
    setHasGreeted(greeted);
    if (!greeted) {
      const t = setTimeout(() => {
        setOpen(true);
        setWaving(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
        setHasGreeted(true);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, []);

  // Periodic playful quips when chat is closed and user is idle-ish
  useEffect(() => {
    if (!mounted || open) {
      if (quipTimer.current) clearTimeout(quipTimer.current);
      setQuip(null);
      return;
    }
    function scheduleQuip(): void {
      const wait = 18000 + Math.random() * 22000; // 18-40s
      quipTimer.current = setTimeout(() => {
        const q = idleQuips[Math.floor(Math.random() * idleQuips.length)];
        setQuip(q);
        setBumping(true);
        setTimeout(() => setBumping(false), 600);
        setTimeout(() => setQuip(null), 5000);
        scheduleQuip();
      }, wait);
    }
    scheduleQuip();
    return () => {
      if (quipTimer.current) clearTimeout(quipTimer.current);
    };
  }, [mounted, open]);

  // Periodic metal-horns moment, much rarer than quips, only when chat closed
  useEffect(() => {
    if (!mounted || open) {
      if (metalTimer.current) clearTimeout(metalTimer.current);
      return;
    }
    function scheduleMetal(): void {
      const wait = 35000 + Math.random() * 60000; // 35-95s
      metalTimer.current = setTimeout(() => {
        setMetal(true);
        setQuip("🤘 ROCK ON 🤘");
        setTimeout(() => {
          setMetal(false);
          setQuip(null);
        }, 2400);
        scheduleMetal();
      }, wait);
    }
    scheduleMetal();
    return () => {
      if (metalTimer.current) clearTimeout(metalTimer.current);
    };
  }, [mounted, open]);

  if (!mounted) return null;

  const bubble = flow[step]();

  function handleReply(r: Reply): void {
    if (r.href) {
      window.location.assign(r.href);
      return;
    }
    if (r.next === "done") {
      setOpen(false);
      setStep("greeting");
    } else {
      setStep(r.next);
    }
  }

  function handleMascotClick(): void {
    setQuip(null);
    if (open) {
      setOpen(false);
      setStep("greeting");
    } else {
      setOpen(true);
      setStep("greeting");
      setWaving(true);
      setBumping(true);
      setTimeout(() => setBumping(false), 600);
      setTimeout(() => setWaving(false), 4500);
    }
  }

  return (
    <div
      className="fixed z-[60] bottom-4 right-4 lg:bottom-6 lg:right-6 flex items-end gap-3 pointer-events-none"
      aria-live="polite"
    >
      {/* Idle quip OR full chat */}
      {open && bubble.text ? (
        <div className="pointer-events-auto max-w-[320px] mb-2 rounded-2xl bg-gradient-to-br from-slate-950 via-red-950/40 to-slate-950 border border-red-500/30 shadow-2xl shadow-red-900/40 p-4 backdrop-blur-md ink-pop">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="text-[10px] uppercase tracking-widest text-red-400 font-semibold">
              Ink · CodedInk guide
            </div>
            <button
              onClick={() => {
                setOpen(false);
                setStep("greeting");
              }}
              className="text-white/40 hover:text-white/80 transition-colors text-lg leading-none -mt-1"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-white/90 text-sm leading-relaxed mb-3">
            {bubble.text}
          </p>
          {bubble.replies && (
            <div className="flex flex-col gap-1.5">
              {bubble.replies.map((r) => (
                <button
                  key={r.label}
                  onClick={() => handleReply(r)}
                  className="text-left text-sm px-3 py-2 rounded-lg bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/40 text-white/85 transition-all"
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : quip ? (
        <button
          type="button"
          onClick={() => {
            setQuip(null);
            handleMascotClick();
          }}
          className="pointer-events-auto max-w-[260px] mb-2 rounded-2xl bg-slate-950/90 border border-red-500/30 shadow-xl shadow-red-900/30 px-4 py-2.5 backdrop-blur-md ink-pop text-left hover:border-red-500/60 transition-colors"
          aria-label="Open Ink"
        >
          <div className="text-[10px] uppercase tracking-widest text-red-400 font-semibold mb-0.5">
            Ink
          </div>
          <p className="text-white/90 text-sm leading-snug">{quip}</p>
        </button>
      ) : null}

      {/* Mascot button */}
      <button
        type="button"
        onClick={handleMascotClick}
        className="pointer-events-auto relative w-20 h-24 lg:w-24 lg:h-28 hover:scale-105 transition-transform"
        aria-label={open ? "Close Ink" : "Talk to Ink"}
      >
        {!hasGreeted && (
          <span className="absolute top-1 right-1 z-10 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        )}
        <DropletBuddy waving={waving} bumping={bumping} metal={metal} size={96} />
      </button>
    </div>
  );
}
