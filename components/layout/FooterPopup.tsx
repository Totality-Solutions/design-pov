"use client";

import { useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { cdn } from "@/lib/cdn";
import CTABtn from "../common/CTABtn";

interface FooterPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024;

export default function FooterPopup({
    isOpen,
    onClose,
}: FooterPopupProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [reason, setReason] = useState("");
    const [cv, setCv] = useState<File | null>(null);

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        role?: string;
        experience?: string;
        cv?: string;
        reason?: string;
    }>({});

    if (!isOpen) return null;

    const validate = () => {
        const next: typeof errors = {};

        if (!name.trim()) next.name = "Full Name is required";
        if (!email.trim()) next.email = "Email is required";
        if (!phone.trim()) next.phone = "Phone Number is required";
        if (!role.trim()) next.role = "Current Role is required";
        if (!experience.trim())
            next.experience = "Years of Experience is required";
        if (!cv) next.cv = "CV Upload is required";
        else if (cv.size > MAX_CV_SIZE_BYTES) next.cv = "File size must be under 10 MB";
        if (!reason.trim())
            next.reason = "This field is required";

        setErrors(next);

        return Object.keys(next).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsLoading(true);

        try {
            // Using FormData because we have a File binary payload (the CV)
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("role", role);
            formData.append("experience", experience);
            formData.append("portfolio", portfolio);
            formData.append("reason", reason);
            
            // Context identifiers for backend tracking verification
            formData.append("type", "career");
            formData.append("category", "hr");

            if (cv) {
                formData.append("cv", cv);
            }

            // Connecting cleanly to your isolated new handler route folder
            const response = await fetch("/api/career", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Something went wrong with the submission");
            }

            // Resetting form fields on a successful response
            setName("");
            setEmail("");
            setPhone("");
            setRole("");
            setExperience("");
            setPortfolio("");
            setReason("");
            setCv(null);
            
            alert("Application submitted successfully!");
            onClose();
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/70 transition-opacity"
                onClick={onClose}
            />

            {/* MODAL */}
            <div className="relative w-full max-w-[1100px] h-[90vh] bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-black hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <FiX size={24} />
                </button>

                {/* LEFT COLUMN */}
                <div className="hidden lg:flex flex-col relative bg-red-600 p-8 md:p-12 items-center min-h-full">
                    <div className="flex-grow flex items-center justify-center">
                        <div className="relative w-40 h-20 md:w-80 md:h-40 opacity-90">
                            <Image
                                src={cdn("/logo/Logo.svg")}
                                alt="Design POV Logo"
                                fill
                                loading="lazy"
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

                {/* RIGHT COLUMN */}
                <div className="bg-white border-[10px] border-red-600 flex flex-col h-full overflow-hidden">

                    {/* HEADER */}
                    <div className="flex items-center gap-3 px-8 pt-8 md:pt-6 pb-6 flex-shrink-0">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <h3 className="text-black text-2xl font-medium tracking-tight font-['Montserrat']">
                            Join <span className="font-bold">Our Team</span>
                        </h3>
                    </div>

                    {/* FORM */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <form
                            className="space-y-5 flex-grow"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            {/* FULL NAME */}
                            <div className="mb-3">
                                <label className=" text-sm block mb-2">
                                    Full Name <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="full name*"
                                    className="w-full bg-zinc-100 px-5 py-3 outline-none"
                                />

                                {errors.name && (
                                    <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* EMAIL + PHONE */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="mb-3">
                                    <label className=" text-sm block mb-2">
                                        Email <span className="text-red-600">*</span>
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="xyz@gmail.com"
                                        className="w-full bg-zinc-100 px-5 py-3 outline-none"
                                    />

                                    {errors.email && (
                                        <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className=" text-sm block mb-2">
                                        Phone Number <span className="text-red-600">*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full bg-zinc-100 px-5 py-3 outline-none"
                                    />

                                    {errors.phone && (
                                        <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* ROLE */}
                            <div className="mb-3">
                                <label className=" text-sm block mb-2">
                                    Current Role / Designation
                                    <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Role"
                                    className="w-full bg-zinc-100 px-5 py-3 outline-none"
                                />

                                {errors.role && (
                                    <p className="text-red-600 text-xs mt-1">{errors.role}</p>
                                )}
                            </div>

                            {/* EXPERIENCE */}
                            <div className="mb-3">
                                <label className=" text-sm block mb-2">
                                    Years of Experience
                                    <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="text"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    placeholder="No. of years"
                                    className="w-full bg-zinc-100 px-5 py-3 outline-none"
                                />

                                {errors.experience && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.experience}
                                    </p>
                                )}
                            </div>

                            {/* CV */}
                            <div className="mb-3">
                                <label className=" text-sm block mb-2">
                                    CV Upload <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        if (file.size > MAX_CV_SIZE_BYTES) {
                                            setCv(null);
                                            setErrors((prev) => ({ ...prev, cv: "File size must be under 10 MB" }));
                                            e.target.value = "";
                                            return;
                                        }

                                        setCv(file);
                                        setErrors((prev) => ({ ...prev, cv: undefined }));
                                    }}
                                    className="w-full border bg-white p-3"
                                />

                                <p className="text-xs text-neutral-500 mt-2">
                                    Documents: Max 10 MB
                                </p>

                                {errors.cv && (
                                    <p className="text-red-600 text-xs mt-1">{errors.cv}</p>
                                )}
                            </div>

                            {/* PORTFOLIO - OPTIONAL */}
                            <div className="mb-3">
                                <label className=" text-sm block mb-2">
                                    Portfolio Link
                                </label>

                                <input
                                    type="text"
                                    value={portfolio}
                                    onChange={(e) => setPortfolio(e.target.value)}
                                    placeholder="https://xyz.com"
                                    className="w-full bg-zinc-100 px-5 py-3 outline-none"
                                />
                            </div>

                            {/* WHY */}
                            <div className="mb-3">
                                <label className=" text-sm block mb-2">
                                    Why do you want to join our team?
                                    <span className="text-red-600">*</span>
                                </label>

                                <textarea
                                    rows={4}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Your Answer"
                                    className="w-full bg-zinc-100 px-5 py-3 outline-none resize-none"
                                />

                                {errors.reason && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.reason}
                                    </p>
                                )}
                            </div>

                            <div className="pt-6">
                                <CTABtn
                                    label={isLoading ? "Submitting..." : "Apply Now"}
                                    btnBg="var(--color-black)"
                                    btnHoverBg="var(--primary-red)"
                                    textColor="var(--color-white)"
                                    borderColor="transparent"
                                    borderHoverColor="transparent"
                                    lineColor="var(--color-white)"
                                    lineHoverColor="var(--primary-red)"
                                    disabled={isLoading}
                                />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}