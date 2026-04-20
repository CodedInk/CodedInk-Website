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
      setError("Incorrect password.");
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
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
          >
            <h1 className="text-2xl font-semibold mb-2">Portfolio</h1>
            <p className="text-white/70 text-sm mb-6">
              This section is password protected.
            </p>
            <label className="block text-sm text-white/80 mb-2" htmlFor="pwd">
              Password
            </label>
            <input
              id="pwd"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white outline-none focus:border-red-500 transition-colors"
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting || !password}
              className="mt-6 w-full rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 transition-colors"
            >
              {submitting ? "Checking…" : "Enter"}
            </button>
          </form>
        </section>
      )}
      <Footer />
    </main>
  );
}
