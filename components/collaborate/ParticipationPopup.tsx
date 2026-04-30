"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import FormInner from '@/components/common/FormInner';

interface ParticipationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function ParticipationPopup({ isOpen, onClose, category }: ParticipationPopupProps) {
  
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-[900px] p-8 shadow-2xl overflow-y-auto max-h-[90vh] rounded-none"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-black hover:text-primary-red transition-color">
              <X size={28} />
            </button>
            
            <div className="mb-4">
              {/* <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-2">Participation Form</span> */}
              <h2 className="text-h3 font-semibold uppercase tracking-tight leading-none">{category}</h2>
              <div className="w-16 h-[3px] bg-black mt-2" />
            </div>
            
            <FormInner category={category} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}