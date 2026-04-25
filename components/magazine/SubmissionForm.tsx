"use client";

import React, { useState, useRef } from 'react';
import SectionHeading from '../common/SectionHeading';
import CTABtn from '../common/CTABtn';

export default function MagazineSubmissionForm() {
  const [docName, setDocName] = useState("");
  const [imgName, setImgName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  // File handlers for separate state
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, type: 'doc' | 'img') {
    let file = e.target.files?.[0];
    if (file) {
      if (type === 'doc') setDocName(file.name);
      else setImgName(file.name);
    }
  }

  function handleSubmit(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    
    // UI Feedback
    setIsSubmitted(true);
    
    // Clear dynamic states
    setDocName("");
    setImgName("");

    // Reset native form inputs
    if (formRef.current) {
      formRef.current.reset();
    }
    
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <section className="w-full bg-white font-display "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <form ref={formRef} className="flex flex-col px-3 md:px-10 items-start">
        
        {/* FORM FIELDS AREA */}
        <div className="flex-1 w-full space-y-10 py-12">
          
          {/* TOP ROW: NAME, EMAIL, PHONE */}
          <div className='py-8'>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-black/50 font-medium">Full Name :</label>
              <input type="text" placeholder="@Name" className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors focus:border-primary-blue" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-x-12 gap-y-12 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-black/50 font-medium">Email :</label>
              <input type="email" placeholder="info@yourdomain.com" className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors focus:border-primary-blue" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-black/50 font-medium">Phone No :</label>
              <input type="text" placeholder="+91 XXXXX XXXXX" className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors focus:border-primary-blue" />
            </div>
          </div>

          {/* BOTTOM ROW: DUAL FILE UPLOADS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* DOC UPLOAD */}
            <div className="space-y-4">
              <label className="text-[15px] text-black/50 font-medium block">Doc Upload :</label>
              <div className="flex flex-col gap-4">
                {!docName ? (
                  <label className="cursor-pointer border border-black/20 px-8 py-2 my-4 rounded-sm flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit">
                    <span className="text-[15px] text-black/60">Upload file</span>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleFileChange(e, 'doc')} />
                  </label>
                ) : (
                  <div className="flex items-center gap-4 border border-black/10 p-2 pr-4 my-2 bg-gray-50 w-fit">
                    <div className="bg-blue-800 text-white px-2 py-1 rounded-sm text-[10px] font-bold uppercase">Doc</div>
                    <span className="text-[15px] text-black max-w-[200px] truncate">{docName}</span>
                    <button type="button" onClick={() => setDocName("")} className="text-red-500 text-[12px] ml-4 hover:underline">Remove</button>
                  </div>
                )}
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="space-y-4">
              <label className="text-[15px] text-black/50 font-medium block">Image Upload :</label>
              <div className="flex flex-col gap-4">
                {!imgName ? (
                  <label className="cursor-pointer border border-black/20 px-8 py-2 my-4 rounded-sm flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit">
                    <span className="text-[15px] text-black/60">Upload image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'img')} />
                  </label>
                ) : (
                  <div className="flex items-center gap-4 border border-black/10 p-2 pr-4 my-2 bg-gray-50 w-fit">
                    <div className="bg-green-700 text-white px-2 py-1 rounded-sm text-[10px] font-bold uppercase">Img</div>
                    <span className="text-[15px] text-black max-w-[200px] truncate">{imgName}</span>
                    <button type="button" onClick={() => setImgName("")} className="text-red-500 text-[12px] ml-4 hover:underline">Remove</button>
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* SUBMIT BUTTON AREA */}
            <div className="w-full flex flex-col items-end justify-end relative">
              <div onClick={handleSubmit} className="cursor-pointer">
                <CTABtn
                  label="Submit"
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
                  {/* SUCCESS MESSAGE */}
                  {isSubmitted && (
                    <p className="absolute top-0 right-0 text-green-600 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 duration-300 whitespace-nowrap">
                      Your submission has been received successfully!
                    </p>
                  )}
              </div>
                
            </div>

          </div>
        </div>



      </form>
    </section>
  );
}