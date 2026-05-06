import React from "react";
import ThemeCollaborators from "@/components/theme/ThemeCollaborators"; // Adjust the import path as per your folder structure
import ThemeIntro from "@/components/theme/ThemeIntro";

export default function ThemePage() {
  return (
    <main className="min-h-screen bg-white">
      <ThemeIntro />
      <ThemeCollaborators />
    </main>
  );
}