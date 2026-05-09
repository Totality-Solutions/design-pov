"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CmsLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/cms/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/cms/dashboard");
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Design POV</p>
          <h1 className="text-2xl font-semibold text-black">CMS Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-widest text-gray-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="border border-black/20 px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-white"
              placeholder="Enter CMS password"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white text-[11px] uppercase tracking-widest py-3 hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Enter CMS"}
          </button>
        </form>
      </div>
    </div>
  );
}
