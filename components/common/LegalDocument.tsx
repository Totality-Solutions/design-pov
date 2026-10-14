"use client";

import React, { useState } from "react";
import SectionHeading from "./SectionHeading";

// Renders a legal page (Privacy Policy, Terms) from the plain-text body edited
// in CMS → Legal. Supported markers, one per line:
//   ## Heading    ### Sub-heading    - list item
// and inline **bold** and [link text](url). A blank line ends a paragraph.

type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "ul", items: list });
    list = [];
  };

  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (/^[-*] /.test(line)) {
      flushParagraph();
      list.push(line.slice(2));
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

/** **bold** and [text](url) inside a line of text. */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={match.index} className="font-bold text-black">{match[1]}</strong>);
    } else if (!/^(https?:|mailto:|tel:|\/|#)/i.test(match[3])) {
      // Unsupported scheme (e.g. javascript:) — show the text without a link.
      nodes.push(match[2]);
    } else {
      const href = match[3];
      const external = /^https?:/i.test(href);
      nodes.push(
        <a
          key={match.index}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-blue-600 hover:underline transition-colors"
        >
          {match[2]}
        </a>
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function LegalDocument({ title, sideLabel, body }: { title: string; sideLabel: string; body: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="py-12 bg-white text-gray-800 leading-relaxed"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading titleMain={title} isSectionHovered={isHovered}>
        {sideLabel && (
          <div className="hidden md:flex">
            <span className="opacity-100 text-lg font-medium text-black">{sideLabel}</span>
          </div>
        )}
      </SectionHeading>

      <div className="px-6 md:px-10 pt-5">
        {parseBlocks(body).map((block, i) => {
          switch (block.type) {
            case "h2":
              return <h2 key={i} className="text-xl md:text-2xl font-bold text-black mt-10 mb-5 first:mt-0">{renderInline(block.text)}</h2>;
            case "h3":
              return <h3 key={i} className="font-semibold text-black mt-5 mb-2">{renderInline(block.text)}</h3>;
            case "ul":
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 mb-6">
                  {block.items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
                </ul>
              );
            default:
              return <p key={i} className="mb-4">{renderInline(block.text)}</p>;
          }
        })}
      </div>
    </div>
  );
}
