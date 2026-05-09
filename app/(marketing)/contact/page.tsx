import ContactFormSection from "@/components/contact/ContactFormSection";
// Import other common layout components if needed
import { Container } from "@/components/common/Container"; 
import ContactHeader from "@/components/contact/ContactHeader";
import CTAStrip from "@/components/common/CTAStrip";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* You can wrap it in your existing Container or Section components */}
      <ContactHeader />
      <ContactFormSection />
      <ShowDeckCTA />
    </main>
  );
}