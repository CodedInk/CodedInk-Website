"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight mb-6">
              Portfolio
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Coming soon.
            </p>
          </div>
        </section>
      ) : (
        <section className="pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="w-full max-w-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-md shadow-2xl shadow-red-900/20">
            {/* Lock mark */}
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
