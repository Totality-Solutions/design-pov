"use client";
import { useState } from 'react';
import CTABtn from './CTABtn';

export default function FormInner({ category }: { category?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [imgName, setImgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isElevate = category?.toLowerCase() === "elevate";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImgName(file.name);
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "participation",
          category: category || "General Enquiry",
          name,
          email,
          contact: phone,
          fileName: imgName || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setIsSubmitted(true);
      setName(""); setEmail(""); setPhone(""); setMessage(""); setImgName("");
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-col w-full items-start" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="flex-1 w-full space-y-10 pt-6 pb-12">
        {/* FULL NAME */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[15px] text-black/50 font-medium">Full Name <span className="text-red-600">*</span></label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue w-full"
          />
        </div>

        {/* EMAIL & PHONE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-black/50 font-medium">Email <span className="text-red-600">*</span></label>
            <input
              type="email"
              placeholder="info@yourdomain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-black/50 font-medium">Phone No <span className="text-red-600">*</span></label>
            <input
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue"
            />
          </div>
        </div>

        {/* MESSAGE */}
        <div className="w-full mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-black/50 font-medium">Message :</label>
            <textarea
              placeholder="How can we help you?"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-b border-black/20 py-2 text-black outline-none text-[13px] font-medium transition-colors focus:border-primary-blue resize-none"
            />
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
            <div className="hidden md:block" />
          )}

          {/* SUBMIT SECTION */}
          <div className="w-full flex flex-col items-start justify-start lg:items-end lg:justify-end space-y-4">
            <div className="h-6 flex items-center justify-end w-full">
              {isSubmitted && (
                <p className="text-green-600 text-[13px] font-medium animate-in fade-in slide-in-from-bottom-1 duration-300">
                  Message sent successfully!
                </p>
              )}
              
            </div>

            <div onClick={handleSubmit} className="w-fit">
              <CTABtn
                label={isLoading ? "Submitting..." : "Submit"}
                iconType="arrow"
                btnBg="transparent"
                textColor="black"
                borderColor="black"
                disabled={isLoading}
                href="javascript:void(0)"
              />
            </div>
          </div>
        </div>
      </div>
        {errorMsg && (
                <p className="text-red-600 text-[13px] text-center w-full font-medium">{errorMsg}</p>
              )}
    </form>
  );
}