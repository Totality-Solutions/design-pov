"use client";

import React, { useState, useRef } from "react";
import CTABtn from "../common/CTABtn";
import { isValidEmail, isValidName } from "@/lib/validation";

type FormData = {
  name: string;
  email: string;
  contact: string;
  organization: string;
  designation: string;
  location: string;
  message: string;
};

const EMPTY: FormData = {
  name: "", email: "", contact: "", organization: "", designation: "", location: "", message: "",
};

const ContactFormSection = () => {
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submittingRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    if (!isValidName(formData.name)) {
      setStatus("error");
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setFormData(EMPTY);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to send. Please try again.");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section className="w-full bg-white py-12 font-['Montserrat']">
      <div className="w-full bg-[#DEDEDE]/20 flex flex-col lg:flex-row justify-between items-start py-6 px-6 md:px-10 gap-12">

        {/* Left: Info Column */}
        <div className="flex flex-col gap-12 w-full lg:w-1/3 mt-10">
          <h4 className="text-2xl font-semibold text-[#010101]">Get in Touch</h4>
          <div className="space-y-12">
            <InfoItem
              label="Office Address"
              value="501, Janki Centre, Off Veera Desai Rd, opp. Chitrakoot Ground, near Decathlon Showroom, Industrial Area, Andheri West, Mumbai, Maharashtra 400053"
            />
            <InfoItem label="Phone" value="+91 8655654736" />
            <InfoItem label="Email" value="marketing@designpovindia.com" />
          </div>
        </div>

        {/* Right: Form Column */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:max-w-[584px] bg-white p-4 md:p-10 flex flex-col gap-6"
        >
          <Input label="Name" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email" name="email" type="email" placeholder="xyz@gmail.com" value={formData.email} onChange={handleChange} required />
            <Input label="Contact" name="contact" placeholder="XXXXX XXXXX" value={formData.contact} onChange={handleChange} />
          </div>

          <Input label="Organization" name="organization" placeholder="Organization Name" value={formData.organization} onChange={handleChange} />
          <Input label="Designation" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
          <Input label="Your Location" name="location" placeholder="Mumbai, India" value={formData.location} onChange={handleChange} />

          <div className="flex flex-col gap-1 w-full">
            <label className="px-0 lg:px-6 text-base font-medium text-[#010101]">Message</label>
            <textarea
              name="message"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-0 lg:px-6 py-2 bg-transparent border-b border-[#D9D9D9] text-sm focus:outline-none focus:border-[#0000B3] placeholder:text-black/30 font-medium resize-none"
            />
          </div>

          {status === "success" && (
            <p className="text-sm text-green-600 font-medium px-1">
              Message sent successfully! We will get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500 font-medium px-1">{errorMsg}</p>
          )}

          <CTABtn
            label={status === "loading" ? "Sending..." : "Talk to Us"}
            disabled={status === "loading"}
          />
        </form>
      </div>
    </section>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-[2px] my-4">
    <span className="text-base font-medium text-[#010101]">{label}</span>
    <span className="text-sm font-normal text-[#010101]/70">{value}</span>
  </div>
);

const Input = ({
  label, name, placeholder, type = "text", value, onChange, required,
}: {
  label: string; name: string; placeholder: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="px-0 lg:px-6 text-base font-medium text-[#010101]">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-0 lg:px-6 py-1 bg-transparent border-b border-[#D9D9D9] text-sm focus:outline-none focus:border-[#0000B3] placeholder:text-black/30 font-medium"
    />
  </div>
);

export default ContactFormSection;
