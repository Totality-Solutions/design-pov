import FAQItem from "@/components/common/FAQItem";
import React from "react";


const faqData = [
  {
    question: "What exactly is the Design POV if not just an architecture exhibition?",
    answer: "With collaboration at the helm, Design POV India curates a design diaspora of industry stalwarts from across the country. It invites leading architecture and design studios to reimagine lived spaces at the Core – with luxury home, decor, and lifestyle brands driving their vision forward as material storytellers. The platform also hosts The Circle, a curated centre for unspoken design discourse that goes beyond commerce."
  },
  {
    question: "Is the event only for architects and designers?",
    answer: `No, it’s for the entire design fraternity and more. Our audience includes:
    • Design-centric home, lifestyle, and luxury brands
    • Multi-medium artists and creatives
    • Entrepreneurs and cultural thinkers
    • Interior, fashion, product, space, and design students
    • Anyone who simply loves great design`
  },
  {
    question: "Do I have to be an interior or home product brand to participate?",
    answer: "No, while most of our participating brands in the first edition belonged to the home and interior space, we’re keen on collaborating with brands in the technology, art, lifestyle, and hospitality sectors, amongst others. If design is at the core of what you do, we want to hear from you."
  },
  {
    question: "How can I be a part of the next edition?",
    answer: "You can apply as a Core design studio, participating brand, panelist at the Circle, artistic collaboration, or sponsor based on what fits your practice and purpose best. We can’t wait to review your application."
  }
];

export default function FAQPage() {
  return (
    <main className="bg-white flex flex-col items-start justify-start gap-10 md:gap-[60px]">
      {/* Header Section */}
      <header className="w-full h-[168px] px-8 md:px-[60px] py-5 bg-white border-b-2 border-black/60 flex items-end">
        <h1 className="text-black text-[56px] font-semibold font-['Montserrat'] leading-[68px]">
          FAQs
        </h1>
      </header>

      {/* Accordion Container */}
      <section 
        className="w-full flex flex-col items-start justify-start py-6"
        style={{ 
          background: "linear-gradient(0deg, rgba(221, 221, 221, 0.20) 0%, rgba(221, 221, 221, 0.20) 100%), #FFFFFF" 
        }}
      >
        {faqData.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </section>
    </main>
  );
}