import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

// ─── Input ────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-label text-pov-mist">
          {label}
          {props.required && <span className="text-pov-clay ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full bg-transparent border text-pov-white text-sm font-light px-3 py-3",
          "placeholder:text-pov-mist/40",
          "focus:outline-none transition-colors duration-300",
          error
            ? "border-red-400/50 focus:border-red-400"
            : "border-white/10 focus:border-pov-clay",
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-[0.65rem] text-pov-mist/60 tracking-wide">{hint}</p>
      )}
      {error && (
        <p className="text-[0.65rem] text-red-400 tracking-wide">{error}</p>
      )}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, rows = 4, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-label text-pov-mist">
          {label}
          {props.required && <span className="text-pov-clay ml-1">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          "w-full bg-transparent border text-pov-white text-sm font-light px-3 py-3",
          "placeholder:text-pov-mist/40 resize-none",
          "focus:outline-none transition-colors duration-300",
          error
            ? "border-red-400/50 focus:border-red-400"
            : "border-white/10 focus:border-pov-clay",
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-[0.65rem] text-pov-mist/60 tracking-wide">{hint}</p>
      )}
      {error && (
        <p className="text-[0.65rem] text-red-400 tracking-wide">{error}</p>
      )}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────

interface SelectProps {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  id?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  value,
  onChange,
  required,
  className,
  id,
}: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-label text-pov-mist">
          {label}
          {required && <span className="text-pov-clay ml-1">*</span>}
        </label>
      )}
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        className={cn(
          "w-full bg-pov-black border text-sm font-light px-3 py-3 appearance-none cursor-pointer",
          "focus:outline-none transition-colors duration-300",
          value ? "text-pov-white" : "text-pov-mist/40",
          error ? "border-red-400/50 focus:border-red-400" : "border-white/10 focus:border-pov-clay",
          className
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-pov-black text-pov-white">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-[0.65rem] text-red-400 tracking-wide">{error}</p>
      )}
    </div>
  );
}
