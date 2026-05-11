"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";
import { useHubspotForm } from "@/hooks/useHubspotForm";

export default function ParticipationForm() {
  let [selectedOption, setSelectedOption] = useState("");
  let [fileName, setFileName] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // HUBSPOT FORM
  const { submit, loading, success, error } = useHubspotForm({
    type: "ecosystem",
    onSuccess: () => {
      setSelectedOption("");
      setFileName("");

      if (formRef.current) {
        formRef.current.reset();
      }
    },
  });

  let imageMap: Record<string, any> = {
    Core: "/temp/home/ecosystem/N1.jpg",
    Circle: "/temp/home/ecosystem/N-3.jpg",
    Objects: "/temp/home/ecosystem/OBJECT.jpeg",
    Elevate: "/temp/home/ecosystem/N-2.jpg",
    Brands: "/temp/edition/brands/brand-hero.png",
    Partnership: "/temp/about/3.png",
  };

  let options = [
    "Core",
    "Circle",
    "Objects",
    "Elevate",
    "Brands",
    "Partnership",
  ];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    let file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  }

  async function handleSubmit(e?: React.MouseEvent) {
    if (e) e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data = {
      name: formData.get("fullname") as string,
      email: formData.get("email") as string,
      contact: formData.get("contact") as string,
      category: selectedOption,
      fileName: fileName,
    };

    await submit(data);
  }

  return (
    <section
      className="w-full bg-white font-display pb-20 overflow-x-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Participation "
        titleBold="Form"
        sticky={false}
        isSectionHovered={isHovered}
      />

      {/* FORM */}
      <form
        ref={formRef}
        className="flex flex-col xl:flex-row gap-8 xl:gap-12 px-4 md:px-6 items-start w-full overflow-x-hidden"
      >

        {/* LEFT SIDE */}
        <div className="flex-1 w-full min-w-0 space-y-10 pt-8 lg:pt-12">

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-6">

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[15px] text-black/50 font-medium">
                Full Name :
              </label>

              <input
                name="fullname"
                type="text"
                required
                placeholder="@Name"
                className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-black/50 font-medium">
                Email :
              </label>

              <input
                name="email"
                type="email"
                required
                placeholder="info@yourdomain.com"
                className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-black/50 font-medium">
                Contact :
              </label>

              <input
                name="contact"
                type="text"
                placeholder="+91 XXXXX XXXXX"
                className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors w-full"
              />
            </div>
          </div>

          {/* RADIO SELECTION */}
          <div className="space-y-10 mb-6">

            <label className="text-[15px] text-black/50 font-medium block mb-4 lg:mb-0">
              Select One :
            </label>

            <div className="flex flex-wrap gap-x-8 gap-y-6">

              {options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center py-2 gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">

                    <input
                      type="radio"
                      name="participation-type"
                      className="peer appearance-none w-5 h-5 border border-black/20 rounded-full checked:border-primary-blue transition-all"
                      onChange={() => setSelectedOption(opt)}
                      checked={selectedOption === opt}
                    />

                    <div className="absolute w-2.5 h-2.5 bg-primary-blue rounded-full scale-0 peer-checked:scale-100 transition-transform" />

                  </div>

                  <span
                    className={`text-[15px] transition-colors ${
                      selectedOption === opt
                        ? "text-primary-blue font-semibold"
                        : "text-black/40"
                    }`}
                  >
                    {opt}
                  </span>
                </label>
              ))}

            </div>
          </div>

          {/* FILE UPLOAD */}
          <div className="space-y-4">

            <label className="text-[15px] text-black/50 font-medium block">
              Upload your file :
            </label>

            <div className="flex flex-col gap-4">

              {!fileName ? (

                <label className="cursor-pointer border border-black/20 px-8 py-2 my-2 flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit">

                  <span className="text-[15px] text-black/60">
                    Upload file
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                </label>

              ) : (

                <div className="flex flex-wrap items-center gap-4 border border-black/10 p-2 pr-4 my-2 bg-gray-50 w-fit max-w-full">

                  <div className="bg-primary-blue text-white px-2 py-1 text-[10px] font-bold">
                    DOC
                  </div>

                  <span className="text-[15px] text-black break-all">
                    {fileName}
                  </span>

                  <button
                    type="button"
                    onClick={() => setFileName("")}
                    className="text-primary-red text-[12px] hover:underline"
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

          {/* MOBILE BUTTON */}
          <div className="xl:hidden w-full flex flex-col items-start relative mt-6 pb-8">

            <div
              onClick={handleSubmit}
              className={`cursor-pointer ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <CTABtn
                label={loading ? "Sending..." : "Submit"}
                iconType="arrow"
                btnBg="transparent"
                btnHoverBg="var(--primary-blue)"
                textColor="black"
                borderColor="black"
                borderHoverColor="transparent"
                lineColor="transparent"
                lineHoverColor="var(--primary-blue)"
                bottomKey1Width="40px"
                bottomKey2Width="12px"
                bottomKey1Right="50px"
                bottomKey2Right="15px"
                href="javascript:void(0)"
              />
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className="absolute bottom-0 right-0 text-green-600 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 duration-300 whitespace-nowrap">
                Your form has been submitted successfully!
              </p>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <p className="absolute bottom-0 right-0 text-red-600 text-[11px] font-medium whitespace-nowrap">
                {error}
              </p>
            )}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden xl:flex w-[220px] flex-shrink-0 flex-col items-end justify-between self-stretch min-h-[400px]">

          {/* IMAGE */}
          <div className="w-full aspect-square relative overflow-hidden flex items-center justify-center">

            {selectedOption && imageMap[selectedOption] && (
              <div className="w-full h-full relative">

                <Image
                  src={imageMap[selectedOption]}
                  alt={selectedOption}
                  fill
                  className="object-cover transition-opacity duration-500"
                />

              </div>
            )}

          </div>

          {/* DESKTOP BUTTON */}
          <div className="w-full flex flex-col items-end relative mt-12 lg:mt-0 pb-8">

            <div
              onClick={handleSubmit}
              className={`cursor-pointer ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <CTABtn
                label={loading ? "Sending..." : "Submit"}
                iconType="arrow"
                btnBg="transparent"
                btnHoverBg="var(--primary-blue)"
                textColor="black"
                borderColor="black"
                borderHoverColor="transparent"
                lineColor="transparent"
                lineHoverColor="var(--primary-blue)"
                bottomKey1Width="40px"
                bottomKey2Width="12px"
                bottomKey1Right="50px"
                bottomKey2Right="15px"
                href="javascript:void(0)"
              />
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className="absolute bottom-0 right-0 text-green-600 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 duration-300 whitespace-nowrap">
                Your form has been submitted successfully!
              </p>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <p className="absolute bottom-0 right-0 text-red-600 text-[11px] font-medium whitespace-nowrap">
                {error}
              </p>
            )}

          </div>
        </div>
      </form>
    </section>
  );
}