import CmsSidebar from "@/components/cms/CmsSidebar";

// Shared frame for the CMS page-content screens: sidebar, title, "View page"
// links, and the page_sections table warning.

export default function CmsPageShell({
  title,
  description,
  viewLinks,
  error,
  wide = false,
  children,
}: {
  /** Drop the max width, for screens that also hold a wide table. */
  wide?: boolean;
  title: string;
  description?: string;
  viewLinks: { href: string; label: string }[];
  /** page_sections load error, if any. */
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className={`ml-56 p-10 ${wide ? "" : "max-w-5xl"}`}>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">{title}</h1>
            {description && <p className="text-sm text-gray-400 mt-0.5">{description}</p>}
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {viewLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-dashed border-gray-300"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>page_sections</code> table exists in Supabase. Run{" "}
              <code>supabase-page-sections-table.sql</code> first. Until then the editor shows the default content
              and saving won&apos;t work.
            </p>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
