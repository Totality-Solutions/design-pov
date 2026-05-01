"use client";

import React, { useState } from 'react';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', contact: '', organization: '', designation: '', location: '',
  });

  return (
    <section className="w-full bg-white py-12 font-['Montserrat']">
      <div className="max-w-[1440px] mx-auto">
        <div className="w-full bg-[#DEDEDE]/20 flex flex-col lg:flex-row justify-between items-start py-6 px-6 md:px-10 gap-12">
          
          {/* Left: Info Column */}
          <div className="flex flex-col gap-12 w-full lg:w-1/3 mt-10">
            <h4 className="text-lg font-semibold text-[#010101] ">Get in Touch</h4>
            <div className="space-y-12">
              <InfoItem label="Office Address" value="Mumbai, Maharashtra, India" />
              <InfoItem label="Phone" value="+91 XXXXX XXXXX" />
              <InfoItem label="Email" value="info@yourdomain.com" />
            </div>
            <div className='mt-20'>
               <InfoItem label="Support Line" value='Available Monday – Saturday | 10:00 AM – 7:00 PM' />
            </div>
          </div>

          {/* Right: Form Column */}
          <form className="w-full lg:max-w-[584px] bg-white p-6 md:p-10 flex flex-col gap-6 shadow-sm border border-gray-100">
            <Input label="Name" placeholder="@Name" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Email" type="email" placeholder="info@domain.com" />
              <Input label="Contact" placeholder="+91 XXXXX XXXXX" />
            </div>
            <Input label="Organization" placeholder="@Name" />
            <Input label="Designation" placeholder="@Name" />
            <Input label="Your Location" placeholder="Mumbai, India" />
            
            <button type="submit" className="w-full bg-[#0000B3] text-white font-semibold py-2 mt-3 hover:bg-blue-800 transition-colors">
              Talk to Us
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* Internal Sub-components for cleaner code */
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-[2px] my-4">
    <span className="text-base font-medium text-[#010101]">{label}</span>
    <span className="text-sm font-normal text-[#010101]/70">{value}</span>
  </div>
);

const Input = ({ label, placeholder, type = "text" }: any) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="px-6 text-base font-medium text-[#010101]">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full px-6 py-1 bg-transparent border-b border-[#D9D9D9] text-sm focus:outline-none focus:border-[#0000B3] placeholder:text-black/30 font-medium"
    />
  </div>
);

export default ContactFormSection;