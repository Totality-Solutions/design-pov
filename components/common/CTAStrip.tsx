import React from 'react'
import Image from 'next/image'
import CTABtn from './CTABtn'

const CTAStrip = ({src, alt, width, height,className, label, title}: {src: string, alt: string, width: number, height: number, className?: string, label?: string, title?: string}) => {
  return (
    <>
    <div className={`relative w-[${width}px] h-[${height}px] ${className || ''}`}>
        <Image src={src} alt={alt} width={width} height={height} />
        <div className='flex justify-between items-center'>
            <h1>{title || "Where Design Meets Dialogue"}</h1>
            <CTABtn label={label || "Apply As a Designer"} href="#" />
        </div>
    </div>

    </>
  )
}
export default CTAStrip