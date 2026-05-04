"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import CTABtn from '../common/CTABtn';
import { useHubspotForm } from '@/hooks/useHubspotForm'; // 1. Import the hook

export default function ParticipationForm() {
  let [selectedOption, setSelectedOption] = useState("");
  let [fileName, setFileName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  // 2. Initialize the hook (we use 'exhibit' as the type for this form)
  const { submit, loading, success, error } = useHubspotForm({
    type: "exhibit",
    onSuccess: () => {
      // Reset UI on success
      setSelectedOption("");
      setFileName("");
      if (formRef.current) formRef.current.reset();
    }
  });

  let imageMap: Record<string, any> = {
    'Core': "/temp/home/ecosystem/N1.jpg",
    'Circle': "/temp/home/ecosystem/N-3.jpg",
    'Objects': "/temp/home/ecosystem/OBJECT.jpeg",
    'Elevate': "/temp/home/ecosystem/N-2.jpg",
    'Brands': "/temp/about/2.png",
    'Sponsorship': "/temp/about/3.png",
  };

  let options = ['Core', 'Circle', 'Objects', 'Elevate', 'Brands', 'Sponsorship'];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    let file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  // 3. Update handleSubmit to collect actual data
  async function handleSubmit(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (!formRef.current) return;

    // Collect data from the form
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("fullname") as string,
      email: formData.get("email") as string,
      contact: formData.get("contact") as string,
      category: selectedOption,
      fileName: fileName
    };

    // Send to Supabase via our hook
    await submit(data);
  }

  return (
    <section className="w-full bg-white font-display lg:pb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading 
        titleMain="Participation " 
        titleBold="Form" 
        sticky={false} 
        isSectionHovered={isHovered} 
      />

      <form ref={formRef} className="flex flex-col lg:flex-row gap-12 px-6 md:px-10 items-start">
        
        <div className="flex-1 w-full space-y-10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[15px] text-black/50 font-medium">Full Name :</label>
              {/* Added 'name' attribute */}
              <input name="fullname" type="text" required placeholder="@Name" className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-black/50 font-medium">Email :</label>
              {/* Added 'name' attribute */}
              <input name="email" type="email" required placeholder="info@yourdomain.com" className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-black/50 font-medium">Contact :</label>
              {/* Added 'name' attribute */}
              <input name="contact" type="text" placeholder="+91 XXXXX XXXXX" className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors" />
            </div>
          </div>

          {/* RADIO SELECTION */}
          <div className="space-y-10 mb-6">
            <label className="text-[15px] text-black/50 font-medium block mb-4 lg:mb-0">Select One :</label>
            <div className="flex flex-col lg:flex-wrap gap-x-8 lg:gap-y-6">
              {options.map((opt) => (
                  <label key={opt} className="flex items-center py-2 gap-3 cursor-pointer group">
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
                    <span className={`text-[15px] transition-colors ${selectedOption === opt ? 'text-primary-blue font-semibold' : 'text-black/40'}`}>
                      {opt}
                    </span>
                  </label>
              ))}
            </div>
          </div>

          {/* FILE UPLOAD */}
          <div className="space-y-4">
            <label className="text-[15px] text-black/50 font-medium block">Upload your file :</label>
            <div className="flex flex-col md:flex-row md:items-center lg:gap-6">
              {!fileName ? (
                <label className="cursor-pointer border border-black/20 px-8 py-2 my-2 rounded-sm flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit">
                  <span className="text-[15px] text-black/60">Upload file</span>
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              ) : (
                <div className="flex items-center gap-4 border border-black/10 p-2 pr-4 my-2 bg-gray-50 w-fit">
                  <div className="bg-blue-800 text-white px-2 py-1 rounded-sm text-[10px] font-bold">DOC</div>
                  <span className="text-[15px] text-black">{fileName}</span>
                  <button type="button" onClick={() => setFileName("")} className="text-red-500 text-[12px] ml-4 hover:underline">Remove</button>
                </div>
              )}
              <p className="text-[11px] text-black/30">Documents: Max 10 MB each | Images: Max 5 MB each</p>
            </div>
          </div>

          <div className="w-full flex flex-col items-start relative mt-6 pb-8">
            <div onClick={handleSubmit} className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
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

        {/* RIGHT SIDE: IMAGE + SUBMIT BUTTON */}
        <div className="hidden lg:flex w-full lg:w-[250px] flex flex-col items-end justify-between self-stretch lg:min-h-[400px] lg:min-h-full">
          <div className="hidden lg:flex w-full max-w-[250px] aspect-square relative overflow-hidden flex items-center justify-center">
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
        
          <div className="w-full flex flex-col items-end relative mt-12 lg:mt-0 pb-8">
            <div onClick={handleSubmit} className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
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