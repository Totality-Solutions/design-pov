import ContactFormSection from "@/components/contact/ContactFormSection";
// Import other common layout components if needed
import { Container } from "@/components/common/Container"; 
import ContactHeader from "@/components/contact/ContactHeader";
import CTAStrip from "@/components/common/CTAStrip";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* You can wrap it in your existing Container or Section components */}
      <ContactHeader />
      <ContactFormSection />
      <div className="w-full z-10 border-t border-black/30 bg-white">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
          floatingImage="/temp/ctastrip/strip-1.png"
        />
        </div>
    </main>
  );
}