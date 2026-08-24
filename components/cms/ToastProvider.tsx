"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ToastType = "success" | "error";
type ToastItem = { id: number; type: ToastType; message: string };

interface ToastContextValue {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Plain-language fallback in case a component ever renders outside the provider.
const noop: ToastContextValue = { showSuccess: () => {}, showError: () => {} };

export function useToast(): ToastContextValue {
  return useContext(ToastContext) ?? noop;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((type: ToastType, message: string) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const showSuccess = useCallback((message: string) => push("success", message), [push]);
  const showError = useCallback((message: string) => push("error", message), [push]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 pl-3 pr-4 py-3 shadow-lg border text-sm font-medium max-w-sm bg-white animate-in fade-in slide-in-from-top-2 duration-200 ${
              t.type === "success" ? "border-l-4 border-l-green-500 border-y-black/10 border-r-black/10" : "border-l-4 border-l-red-500 border-y-black/10 border-r-black/10"
            }`}
          >
            <span className={`mt-0.5 text-base leading-none ${t.type === "success" ? "text-green-500" : "text-red-500"}`}>
              {t.type === "success" ? "🟢" : "🔴"}
            </span>
            <span className="text-gray-800 leading-snug">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-1 text-gray-300 hover:text-black text-xs shrink-0"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
