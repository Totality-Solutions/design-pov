import React from 'react'
import Theme1 from "@/public/temp/1.jpg"
import Image from 'next/image'
import { Container } from '../common/Container'
import CTABtn from '../common/CTABtn'
const Theme = () => {
  return (
    <Container>

            <div className="flex h-[600px] overflow-hidden">
                <div className="w-full  bg-gray-200">
                    <Image src={Theme1} alt="Theme 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-full px-10 h-full text-start flex items-start justify-center flex-col gap-4 ">
                    <p className='text-xl '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, sint quidem totam illum minus tempore molestias suscipit voluptatibus dolores non corrupti quibusdam repellat.</p>
                    <CTABtn label="2026 THEME" />
                </div>
            </div>
    </Container>
  )
}

export default Theme