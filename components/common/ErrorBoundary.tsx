"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
  errorId: string | null;
  showDetails: boolean;
}

const isDev = process.env.NODE_ENV !== "production";

function makeErrorId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, errorId: null, showDetails: false };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error, errorId: makeErrorId() };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error);
    // fetch rejects asynchronously, so try/catch alone never caught network failures
    fetch("/api/log-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: error.message,
        stack: error.stack,
        componentStack: info.componentStack,
        errorId: this.state.errorId,
        url: typeof window !== "undefined" ? window.location.href : undefined,
        source: "ErrorBoundary",
      }),
      keepalive: true,
    }).catch(() => {});
  }

  private reset = () => this.setState({ error: null, errorId: null, showDetails: false });

  private toggleDetails = () => this.setState((s) => ({ showDetails: !s.showDetails }));

  render() {
    const { error, errorId, showDetails } = this.state;

    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <main
        role="alert"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 px-6"
      >
        {/* Subtle dotted backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:22px_22px]"
        />

        <div className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] sm:p-10">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-red-600"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
            Something went wrong
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
            An unexpected error stopped this page from loading. It&apos;s been reported, and trying
            again usually fixes it.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={this.reset}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" strokeLinecap="round" />
                <path d="M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.assign("/")}
              className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              Go to homepage
            </button>
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 text-xs text-neutral-400 underline-offset-4 transition hover:text-neutral-600 hover:underline"
          >
            Still stuck? Reload the page
          </button>

          {/* Reference ID for support */}
          {errorId && (
            <p className="mt-6 border-t border-neutral-100 pt-5 text-xs text-neutral-400">
              Error reference:{" "}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-neutral-600">{errorId}</code>
            </p>
          )}

          {/* Dev-only details */}
          {isDev && (
            <div className="mt-4 text-left">
              <button
                type="button"
                onClick={this.toggleDetails}
                aria-expanded={showDetails}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 hover:bg-neutral-50"
              >
                <span>Error details (dev only)</span>
                <span className={`transition-transform ${showDetails ? "rotate-180" : ""}`}>▾</span>
              </button>
              {showDetails && (
                <pre className="mt-2 max-h-60 overflow-auto rounded-lg bg-neutral-950 p-4 text-[11px] leading-relaxed text-red-300">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }
}