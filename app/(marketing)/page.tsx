import type { Metadata } from "next";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Design POV — A Platform for Design Beyond Sight",
};

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
