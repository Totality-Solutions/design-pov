// // hooks/useHubspotForm.ts
// import { useState } from "react";
// import type { ApplyType } from "@/types";

// interface UseHubspotFormOptions {
//   type: ApplyType | "waitlist" | "newsletter";
//   onSuccess?: () => void;
// }

// export function useHubspotForm({ type, onSuccess }: UseHubspotFormOptions) {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const submit = async (data: Record<string, string>) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/hubspot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, ...data }),
//       });

//       if (!res.ok) throw new Error("Submission failed");

//       setSuccess(true);
//       onSuccess?.();
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { submit, loading, success, error, reset: () => { setSuccess(false); setError(null); } };
// }


import { useState } from "react";
import type { ApplyType } from "@/types";

interface UseHubspotFormOptions {
  type: ApplyType | "waitlist" | "newsletter" | "brands";
  onSuccess?: () => void;
}

export function useHubspotForm({ type, onSuccess }: UseHubspotFormOptions) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: Record<string, string>, files?: Record<string, File | null | undefined>) => {
    setLoading(true);
    setError(null);

    try {
      // FormData (not JSON) so any attached file travels with the request and can be emailed directly
      const formData = new FormData();
      formData.append("type", type);
      Object.entries(data).forEach(([key, value]) => {
        if (value != null) formData.append(key, value);
      });
      if (files) {
        Object.entries(files).forEach(([key, file]) => {
          if (file) formData.append(key, file);
        });
      }

      const res = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.error || "Submission failed");
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, success, error, reset: () => { setSuccess(false); setError(null); } };
}