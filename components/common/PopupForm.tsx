"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import CTABtn from "./CTABtn";
import { cdn } from "@/lib/cdn";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/validation";

const SHOW_DECK_PDF = cdn("/pdf/DESIGNPOV2027SHOWDECK.pdf");

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupForm({ isOpen, onClose }: PopupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const submittingRef = useRef(false);

  if (!isOpen) return null;

  const validate = () => {
    const next: typeof errors = {};
    if (!isValidName(name)) next.name = "Please enter your full name";
    if (!isValidEmail(email)) next.email = "Please enter a valid email address";
    if (!isValidPhone(phone)) next.phone = "Please enter a valid phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (submittingRef.current) return;
    if (!validate()) return;
    submittingRef.current = true;
    setIsLoading(true);

    try {
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "popup",
          category: "Show Deck Download",
          name,
          email,
          contact: phone,
          fileName: null,
        }),
      });
    } catch {
      // Proceed to download even if API fails
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
    }

    const link = document.createElement("a");
    link.href = "/api/download/show-deck";
    link.download = "Design-POV-Show-Deck.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* BACKDROP: Closes form when clicking outside */}
      <div 
        className="absolute inset-0 bg-black/70 transition-opacity" 
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-[1100px] min-h-[500px] md:min-h-[600px] bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-black hover:bg-neutral-100 rounded-full transition-colors md:text-black"
        >
          <FiX size={24} />
        </button>

        {/* LEFT COLUMN: BRANDING & LOGO */}
         <div className="hidden lg:flex flex-col relative bg-red-600 p-8 md:p-12 items-center min-h-full">
              <div className="flex-grow flex items-center justify-center">
                <div className="relative w-40 h-20 md:w-80 md:h-40 opacity-90">
                  <Image
                    src={cdn("/logo/Logo.svg")}
                    alt="Design POV Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="w-full text-center md:pb-6">
                <h2 className="text-black text-md md:text-xl font-medium uppercase tracking-widest leading-tight font-['Montserrat']">
                  Design Done Differently
                </h2>
              </div>
            </div>

        {/* RIGHT COLUMN: FORM (With added 10px Red Border) */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-between border-10 border-red-600">
          
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-black rounded-full" />
            <h3 className="text-black text-2xl font-medium tracking-tight font-['Montserrat']">
              Join <span className="font-bold">the movement</span>
            </h3>
          </div>

          <form className="space-y-6 flex-grow" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="flex flex-col gap-2">
              <label className="text-black text-[14px] font-medium tracking-wide font-['Montserrat']">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 bg-zinc-100 text-sm font-['Montserrat'] outline-none focus:ring-1 focus:ring-black transition-all"
              />
              {errors.name && <span className="text-red-600 text-xs font-['Montserrat']">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black text-[14px] font-medium tracking-wide font-['Montserrat']">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-zinc-100 text-sm font-['Montserrat'] outline-none focus:ring-1 focus:ring-black transition-all"
              />
              {errors.email && <span className="text-red-600 text-xs font-['Montserrat']">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black text-[14px] font-medium tracking-wide font-['Montserrat']">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-5 py-4 bg-zinc-100 text-sm font-['Montserrat'] outline-none focus:ring-1 focus:ring-black transition-all"
              />
              {errors.phone && <span className="text-red-600 text-xs font-['Montserrat']">{errors.phone}</span>}
            </div>

            <div className="pt-4">
              <CTABtn
                label={isLoading ? "Submitting..." : "Submit & Download"}
                btnBg="var(--color-black)"
                btnHoverBg="var(--primary-red)"
                textColor="var(--color-white)"
                borderColor="transparent"
                borderHoverColor="transparent"
                lineColor="var(--color-white)"
                lineHoverColor="var(--primary-red)"
                bottomKey1Width="30px"
                bottomKey2Width="10px"
                bottomKey1Right="40px"
                bottomKey2Right="10px"
                // onClick={handleSubmit}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}