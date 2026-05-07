import React from "react";
import ThemeCollaborators from "@/components/edition26/theme/ThemeCollaborators"; // Adjust the import path as per your folder structure
import ThemeIntro from "@/components/edition26/theme/ThemeIntro";

export default function ThemePage() {
  return (
    <main className="min-h-screen bg-white">
      <ThemeIntro />
      <ThemeCollaborators />
    </main>
  );
}