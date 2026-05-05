"use client";
import React, { useState, useRef } from 'react';
import CTABtn from './CTABtn';

export default function FormInner({ category }: { category?: string }) {
  const [imgName, setImgName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isElevate = category?.toLowerCase() === "elevate";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    let file = e.target.files?.[0];
    if (file) setImgName(file.name);
  }

  function handleSubmit(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    
    setIsSubmitted(true);
    setImgName("");
    if (formRef.current) formRef.current.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <form ref={formRef} className="flex flex-col w-full items-start">
      <input type="hidden" name="form_category" value={category || "General Enquiry"} />

      <div className="flex-1 w-full space-y-10 pt-6 pb-12">
        {/* FULL NAME */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[15px] text-black/50 font-medium">Full Name :</label>
          <input name="full_name" type="text" placeholder="Name" className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue w-full" />
        </div>

        {/* EMAIL & PHONE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-black/50 font-medium">Email :</label>
            <input name="email" type="email" placeholder="info@yourdomain.com" className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-black/50 font-medium">Phone No :</label>
            <input name="phone" type="text" placeholder="+91 XXXXX XXXXX" className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue" />
          </div>
        </div>

        {/* MESSAGE */}
        <div className="w-full mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-black/50 font-medium">Message :</label>
            <textarea name="message" placeholder="How can we help you?" rows={3} className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue resize-none" />
          </div>
        </div>

        {/* UPLOAD & SUBMIT ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-end">
          
          {/* UPLOAD SECTION */}
          {!isElevate ? (
            <div className="space-y-4">
              <label className="text-[15px] text-black/50 font-medium block">Upload Image :</label>
              {!imgName ? (
                <label className="cursor-pointer border border-black/20 px-8 py-2 mt-2 rounded-sm flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit">
                  <span className="text-[15px] text-black/60">Upload image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              ) : (
                <div className="flex items-center gap-4 border border-black/10 p-2 pr-4 bg-gray-50 w-fit">
                  <div className="bg-green-700 text-white px-2 py-1 rounded-sm text-[10px] font-bold uppercase">Img</div>
                  <span className="text-[15px] text-black max-w-[200px] truncate">{imgName}</span>
                  <button type="button" onClick={() => setImgName("")} className="text-red-500 text-[12px] ml-4 hover:underline">Remove</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:block" /> /* Ghost spacer */
          )}

          {/* SUBMIT SECTION */}
          <div className="w-full flex flex-col items-start justify-start lg:items-end lg:justify-end space-y-4">
            {/* SUCCESS MESSAGE: Dedicated height container prevents overlap */}
            <div className="h-6 flex items-center justify-end w-full">
              {isSubmitted && (
                <p className="text-green-600 text-[13px] font-medium animate-in fade-in slide-in-from-bottom-1 duration-300">
                  Message sent successfully!
                </p>
              )}
            </div>
            
            <div onClick={handleSubmit} className="w-fit">
              <CTABtn label="Submit" iconType="arrow" btnBg="transparent" textColor="black" borderColor="black" href="javascript:void(0)" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}