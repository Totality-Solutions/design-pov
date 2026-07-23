"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ToastData {
  id: string;
  message: string;
  type: "success" | "error";
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: (id: string) => void;
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 shadow-lg border ${
            toast.type === "success"
              ? "bg-white border-green-500 text-green-800"
              : "bg-white border-red-400 text-red-800"
          }`}
        >
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Dismiss"
          >
            <X
              size={16}
              className={
                toast.type === "success" ? "text-green-600" : "text-red-600"
              }
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
