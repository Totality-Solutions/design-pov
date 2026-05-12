"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import CTABtn from "@/components/common/CTABtn";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { cdn } from "@/lib/cdn";

interface ParticipationPopupFormProps {
  onClose: () => void;
}

export default function ParticipationPopupForm({ onClose }: ParticipationPopupFormProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [fileName, setFileName] = useState("");
  
  const formRef = useRef<HTMLFormElement>(null);

  const { submit, loading, success, error } = useHubspotForm({
    type: "brands",
    onSuccess: () => {
      setSelectedOption("");
      setFileName("");
      if (formRef.current) formRef.current.reset();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  async function handleSubmit(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (loading || !formRef.current) return;
    if (!formRef.current.reportValidity()) return;

    const formData = new FormData(formRef.current);
    await submit({
      name:     formData.get("fullname") as string,
      email:    formData.get("email") as string,
      contact:  formData.get("contact") as string,
      category: selectedOption,
      fileName,
    });
  }

  const options = ["Core", "Circle", "Objects", "Elevate", "Brands", "Partnership"];

  return (
    <div className="relative w-full max-w-[1100px] h-[90vh] bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl">
      
      {/* CLOSE BUTTON */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-black hover:bg-neutral-100 rounded-full transition-colors"
      >
        <X size={24} />
      </button>

      {/* LEFT SIDE (Branding) */}
      <div className="hidden lg:flex flex-col relative bg-red-600 p-10 items-center justify-center">
        <div className="relative w-60 h-32 opacity-90">
          <Image src={cdn("/logo/Logo.svg")} alt="Logo" fill className="object-contain" priority />
        </div>
        <h2 className="mt-8 text-black text-lg font-medium uppercase tracking-widest font-['Montserrat']">
          Design Done Differently
        </h2>
      </div>

      {/* RIGHT SIDE (Scrollable Form Content) */}
      <div className="bg-white border-[10px] border-red-600 flex flex-col h-full overflow-hidden">
        
        {/* Fixed Header Inside Right Side */}
        <div className="flex items-center gap-3 px-8 md:px-16 pt-10 pb-6 flex-shrink-0">
          <div className="w-2 h-2 bg-black rounded-full" />
          <h3 className="text-black text-2xl font-medium uppercase font-['Montserrat']">
            Participation Form
          </h3>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-16 pb-10">
          <form ref={formRef} className="flex flex-col gap-8 w-full">
            
            {/* Standard Inputs */}
            <div className="space-y-6">
              {[
                { label: "Full Name :", name: "fullname", placeholder: "Full Name" },
                { label: "Email :", name: "email", placeholder: "xyz@gmail.com" },
                { label: "Contact :", name: "contact", placeholder: "+91 XXXXX XXXXX" }
              ].map((input) => (
                <div key={input.name} className="flex flex-col gap-1">
                  <label className="text-[14px] text-black/50 font-medium">{input.label}</label>
                  <input
                    name={input.name}
                    placeholder={input.placeholder}
                    className="border-b border-black/20 py-2 outline-none text-[14px] focus:border-black transition-colors bg-transparent"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Selection */}
            <div className="space-y-4">
              <label className="text-[14px] text-black/50 font-medium block">Select One :</label>
              <div className="grid grid-cols-2 gap-4">
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="participation-type" 
                      checked={selectedOption === opt}
                      onChange={() => setSelectedOption(opt)}
                      className="w-4 h-4 accent-red-600"
                    />
                    <span className={`text-[14px] transition-colors ${selectedOption === opt ? "text-red-600 font-bold" : "text-black/60 group-hover:text-black"}`}>
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <label className="text-[15px] text-black/50 font-medium block">
                Upload your file :
              </label>

              <div className="flex flex-col gap-2">
                {!fileName ? (
                  <label className="cursor-pointer border border-black/20 px-8 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit">
                    <span className="text-[14px] text-black/60">Upload file</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="flex flex-wrap items-center gap-4 border border-black/10 p-2 pr-4 bg-gray-50 w-fit max-w-full">
                    <div className="bg-red-600 text-white px-2 py-1 text-[10px] font-bold">DOC</div>
                    <span className="text-[13px] text-black truncate max-w-[150px]">
                      {fileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFileName("")}
                      className="text-red-600 text-[12px] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-[11px] text-black/30">
                  Documents: Max 10 MB each | Images: Max 5 MB each
                </p>
              </div>
            </div>

            {/* Submit Button Section */}
            <div className="pt-4 pb-6">
              <div
                onClick={handleSubmit}
                className={`w-fit ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <CTABtn 
                  label={loading ? "Sending..." : "Submit"} 
                  iconType="arrow"
                  btnHoverBg="var(--primary-blue)"
                  textColor="black"
                />
              </div>
              
              {success && <p className="text-green-600 text-sm mt-4 font-medium">Submitted successfully!</p>}
              {error && <p className="text-red-600 text-sm mt-4 font-medium">{error}</p>}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}