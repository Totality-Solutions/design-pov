// hooks/useHubspotForm.ts
import { useState } from "react";
import type { ApplyType } from "@/types";

interface UseHubspotFormOptions {
  type: ApplyType | "waitlist" | "newsletter";
  onSuccess?: () => void;
}

export function useHubspotForm({ type, onSuccess }: UseHubspotFormOptions) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: Record<string, string>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...data }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, success, error, reset: () => { setSuccess(false); setError(null); } };
}
