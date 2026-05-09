"use client";

import { useRouter } from "next/navigation";

export default function CmsLogout() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.push("/cms/login");
  }

  return (
    <button
      onClick={logout}
      className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
    >
      Logout
    </button>
  );
}
