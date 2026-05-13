"use client";

import Link from "next/link";

export type ActionType =
  | "internal-link"
  | "external-link"
  | "modal"
  | "custom";

export interface TextAction {
  text: string;
  type: ActionType;
  href?: string;
  onClick?: () => void;
}

interface InteractiveTextProps {
  text: string;
  actions?: TextAction[];
  className?: string;
}

export default function InteractiveText({
  text,
  actions = [],
  className = "",
}: InteractiveTextProps) {
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  if (!actions.length) {
    return <span className={className}>{text}</span>;
  }

  const pattern = new RegExp(
    `(${actions.map((a) => escapeRegex(a.text)).join("|")})`,
    "gi"
  );

  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const matchedAction = actions.find(
          (a) => a.text.toLowerCase() === part.toLowerCase()
        );

        if (!matchedAction) {
          return <span key={index}>{part}</span>;
        }

        const commonClass =
          "underline underline-offset-4 hover:opacity-70 transition cursor-pointer";

        // INTERNAL LINK
        if (matchedAction.type === "internal-link") {
          return (
            <Link
              key={index}
              href={matchedAction.href || "/"}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={commonClass}
            >
              {part}
            </Link>
          );
        }

        // EXTERNAL LINK
        if (matchedAction.type === "external-link") {
          return (
            <a
              key={index}
              href={matchedAction.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={commonClass}
            >
              {part}
            </a>
          );
        }

        // MODAL / CUSTOM
        return (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              matchedAction.onClick?.();
            }}
            className={commonClass}
          >
            {part}
          </button>
        );
      })}
    </span>
  );
}

