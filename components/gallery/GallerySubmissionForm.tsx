  "use client";

  import { useState, useCallback, useRef, useEffect } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { Upload, X, Loader2, Trash2 } from "lucide-react";
  import { validateFiles, filesToBase64, getUploadConstraints } from "@/lib/upload";

  interface GallerySubmissionFormProps {
    isOpen: boolean;
    onClose?: () => void;
    onSuccess?: () => void;
    onError?: (message: string) => void;
  }

  const schema = z.object({
    title: z.string().min(1, "Project title is required"),
    contributor: z.string().min(1, "Contributor name is required"),
    email: z.string().email("Please enter a valid email address"),
    organization: z.string().optional(),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    story: z
      .string()
      .min(50, "Project story must be at least 50 characters")
      .max(1000, "Project story must not exceed 1000 characters"),
  });

  type FormData = z.infer<typeof schema>;

  interface ImageFile {
    file: File;
    preview: string;
  }

  export default function GallerySubmissionForm({
    isOpen,
    onClose,
    onSuccess,
    onError,
  }: GallerySubmissionFormProps) {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [uploadErrors, setUploadErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { maxImages } = getUploadConstraints();

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        title: "",
        contributor: "",
        email: "",
        organization: "",
        website: "",
        story: "",
      },
    });

    const storyValue = watch("story", "");
    const storyLength = storyValue.length;

    useEffect(() => {
      if (!isOpen) {
        setImages([]);
        setUploadErrors([]);
      }
    }, [isOpen]);

    useEffect(() => {
      return () => {
        images.forEach((img) => URL.revokeObjectURL(img.preview));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const processFiles = useCallback(
      (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const { valid, errors: validationErrors } = validateFiles(fileArray);

        setUploadErrors(validationErrors);

        if (valid.length === 0) return;

        const remaining = maxImages - images.length;
        const toAdd = valid.slice(0, remaining);

        const newImages = toAdd.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages].slice(0, maxImages));

        if (remaining <= 0) {
          setUploadErrors((prev) => [
            ...prev,
            `Maximum ${maxImages} images allowed.`,
          ]);
        }
      },
      [images.length, maxImages]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (e.dataTransfer.files) {
          processFiles(e.dataTransfer.files);
        }
      },
      [processFiles]
    );

    const handleFileSelect = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          processFiles(e.target.files);
          e.target.value = "";
        }
      },
      [processFiles]
    );

    const removeImage = useCallback((index: number) => {
      setImages((prev) => {
        const img = prev[index];
        if (img) URL.revokeObjectURL(img.preview);
        return prev.filter((_, i) => i !== index);
      });
      setUploadErrors([]);
    }, []);

    const totalSize = images.reduce((acc, img) => acc + img.file.size, 0);

    const onSubmit = useCallback(
      async (data: FormData) => {
        if (images.length < 2) {
          setUploadErrors(["Minimum 2 images required."]);
          return;
        }

        setIsSubmitting(true);
        setUploadErrors([]);

        try {
          const imageData = await filesToBase64(images.map((img) => img.file));

          const response = await fetch("/api/gallery-submission", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, images: imageData }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || "Submission failed.");
          }

          reset();
          setImages([]);
          setUploadErrors([]);
          onSuccess?.();
        } catch (err: any) {
          const message = err.message || "Something went wrong. Please try again.";
          setUploadErrors([message]);
          onError?.(message);
        } finally {
          setIsSubmitting(false);
        }
      },
      [images, reset, onSuccess, onError]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
          const target = e.target as HTMLElement;
          if (target.tagName !== "TEXTAREA") {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }
      },
      [handleSubmit, onSubmit]
    );

    const inputClass =
      "w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm";
    const inputErrorClass =
      "w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-400 text-sm border border-red-400";

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 bottom-full sm:bottom-auto sm:top-full origin-bottom sm:origin-top z-40 bg-white border-t sm:border-t-0 sm:border-b border-black shadow-lg"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black text-white hover:bg-black/80 transition-colors cursor-pointer z-10"
              aria-label="Close form"
            >
              <X className="w-4.5 h-4.5" strokeWidth={2} />
            </button>
                {/* Scrolling happens on this inner div, not the animated
                    (transformed) motion.div above — touch scroll gestures
                    are unreliable on an element that also has an active
                    transform. */}
                <div className="max-h-[80vh] sm:max-h-[75vh] overflow-y-auto custom-scrollbar">
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={handleKeyDown}
              noValidate
              className="p-4 sm:p-6"
            >
              <div className="px-2 py-4 sm:px-20 sm:py-8">
                <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
                  <span className="text-black">•</span> Get Featured on Design POV
                </h2>

                <p className="text-gray-600 mb-8">
                  Submit your project for editorial review and a chance to be
                  featured in the Design POV Gallery.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload project images"
                    className={`bg-[#F8F8F8] border-2 transition-colors flex flex-col items-center justify-center p-10 min-h-[400px] cursor-pointer group text-center ${
                      isDragOver
                        ? "border-black bg-gray-100"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {images.length === 0 ? (
                      <>
                        <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-md flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                          <Upload size={20} className="text-black" />
                        </div>

                        <h3 className="font-medium text-black ">
                          Upload Project Images
                        </h3>

                        <p className="text-sm text-gray-400">
                          Drag & drop your files here
                          <br />
                          or click to upload.
                        </p>

                        <div className="mt-6 flex flex-col items-center gap-2 text-xs text-gray-400">
                          <p>Upload 2–10 images for review.</p>
                          <p>Max total upload size: 100 MB.</p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                          {images.map((img, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-md overflow-hidden border border-gray-200 bg-white group/image"
                            >
                              <img
                                src={img.preview}
                                alt={`Upload preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                                className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover/image:opacity-100"
                                aria-label={`Remove image ${index + 1}`}
                              >
                                <Trash2 size={12} className="text-white" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col items-center gap-1 text-xs text-gray-500">
                          <p>
                            {images.length} / {maxImages} images
                          </p>
                          <p>
                            Total: {(totalSize / (1024 * 1024)).toFixed(1)} MB
                          </p>
                          {images.length < maxImages && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                              className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity mt-1"
                            >
                              Add more images
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {uploadErrors.length > 0 && (
                      <ul className="mt-4 space-y-1">
                        {uploadErrors.map((err, i) => (
                          <li
                            key={i}
                            className="text-xs text-red-500 flex items-start gap-1"
                          >
                            <span className="mt-0.5 shrink-0">•</span>
                            <span>{err}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col gap-6">
                    <div>
                      <label
                        htmlFor="gallery-title"
                        className="block text-sm text-gray-800 mb-2"
                      >
                        Project Title
                      </label>

                      <input
                        id="gallery-title"
                        type="text"
                        placeholder="Title*"
                        aria-invalid={!!errors.title}
                        aria-describedby={
                          errors.title ? "gallery-title-error" : undefined
                        }
                        {...register("title")}
                        className={errors.title ? inputErrorClass : inputClass}
                      />

                      {errors.title && (
                        <p
                          id="gallery-title-error"
                          className="text-xs text-red-500 mt-1"
                        >
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="gallery-contributor"
                          className="block text-sm text-gray-800 mb-2"
                        >
                          Contributor Name
                        </label>

                        <input
                          id="gallery-contributor"
                          type="text"
                          placeholder="xyz solutions"
                          aria-invalid={!!errors.contributor}
                          aria-describedby={
                            errors.contributor
                              ? "gallery-contributor-error"
                              : undefined
                          }
                          {...register("contributor")}
                          className={
                            errors.contributor ? inputErrorClass : inputClass
                          }
                        />

                        {errors.contributor && (
                          <p
                            id="gallery-contributor-error"
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.contributor.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="gallery-email"
                          className="block text-sm text-gray-800 mb-2"
                        >
                          Email Address
                        </label>

                        <input
                          id="gallery-email"
                          type="email"
                          placeholder="xyz@gmail.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "gallery-email-error" : undefined
                          }
                          {...register("email")}
                          className={errors.email ? inputErrorClass : inputClass}
                        />

                        {errors.email && (
                          <p
                            id="gallery-email-error"
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="gallery-organization"
                          className="block text-sm text-gray-800 mb-2"
                        >
                          Studio / Organization
                        </label>

                        <input
                          id="gallery-organization"
                          type="text"
                          placeholder="xyz solutions"
                          {...register("organization")}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gallery-website"
                          className="block text-sm text-gray-800 mb-2"
                        >
                          Website
                        </label>

                        <input
                          id="gallery-website"
                          type="text"
                          placeholder="https://abc.com"
                          aria-invalid={!!errors.website}
                          aria-describedby={
                            errors.website ? "gallery-website-error" : undefined
                          }
                          {...register("website")}
                          className={errors.website ? inputErrorClass : inputClass}
                        />

                        {errors.website && (
                          <p
                            id="gallery-website-error"
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.website.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="gallery-story"
                        className="block text-sm text-gray-800 mb-2"
                      >
                        Project Story
                      </label>

                      <textarea
                        id="gallery-story"
                        placeholder="Project Story"
                        rows={4}
                        aria-invalid={!!errors.story}
                        aria-describedby={
                          errors.story ? "gallery-story-error" : undefined
                        }
                        {...register("story")}
                        className={`${
                          errors.story ? inputErrorClass : inputClass
                        } resize-none`}
                      />

                      <div className="flex items-center justify-between mt-1">
                        {errors.story ? (
                          <p
                            id="gallery-story-error"
                            className="text-xs text-red-500"
                          >
                            {errors.story.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="text-xs text-gray-400">
                          {storyLength} / 1000
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="border border-black px-6 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting && (
                          <Loader2
                            size={16}
                            className="animate-spin shrink-0"
                          />
                        )}
                        {isSubmitting ? "Submitting..." : "Send for Consideration"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
                </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
