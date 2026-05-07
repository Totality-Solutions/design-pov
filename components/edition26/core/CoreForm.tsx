"use client"
import React, { useRef, useState } from 'react'
import { useHubspotForm } from '@/hooks/useHubspotForm'
import CTABtn from '../../common/CTABtn'
import SectionHeading from '../../common/SectionHeading';

const CoreForm = () => {
  const [fileName, setFileName] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { submit, loading, success, error } = useHubspotForm({
    type: "exhibit",
    onSuccess: () => {
      setFileName("");
      if (formRef.current) formRef.current.reset();
    }
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  async function handleSubmit(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (!formRef.current) return;

    if (!formRef.current.reportValidity()) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("fullname") as string,
      email: formData.get("email") as string,
      contact: formData.get("contact") as string,
      fileName: fileName
    };

    await submit(data);
  }

  return (
    <section className="w-full bg-white font-display pb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading 
        titleMain="Core Collaboration" 
        titleBold="Form" 
        sticky={false} 
        isSectionHovered={isHovered} 
      />

      <form ref={formRef} className="flex flex-col gap-12 px-6 md:px-10 items-end ">
        
        <div className="flex-1 w-full space-y-10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[15px] text-black/50 font-medium">Full Name :</label>
              {/* Added 'name' attribute */}
              <input name="fullname" type="text" required placeholder="Name" className="border-b border-black/20 py-2 text-[#000000] outline-none text-[13px] font-medium transition-colors" />
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


          {/* FILE UPLOAD */}
          <div className="space-y-4">
            <label className="text-[15px] text-black/50 font-medium block">Upload your file :</label>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
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
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-center gap-4">
          {success && (
            <p className="text-sm text-green-600 font-medium">Your submission was received. We'll be in touch soon.</p>
          )}
          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}
        </div>

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

      </form>
    </section>
  );
}

export default CoreForm