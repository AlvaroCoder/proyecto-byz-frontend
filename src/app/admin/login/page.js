'use client'
import { FormLogin } from '@/components/Forms'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {AnimatePresence, motion} from "framer-motion"

export default function Page() {
  const [indexImage, setIndexImage] = useState(0);
  const IMAGES = [
    "https://res.cloudinary.com/dabyqnijl/image/upload/v1740173073/ImagesByZ/folxzzhy3o3mwmagono7.png",
    "https://res.cloudinary.com/dabyqnijl/image/upload/v1740173060/ImagesByZ/zrkyw9zor5pctbyfhywc.png",
    "https://res.cloudinary.com/dabyqnijl/image/upload/v1740158491/ImagesByZ/oh4chfekpcpjzqchpjsu.png"
  ]
  useEffect(()=>{
    const interval =setInterval(()=>{
      setIndexImage((prev) => (prev + 1) % IMAGES.length)
    }, 9000);

    return () => clearInterval(interval);
  },[]);
  const URL_LOGO_BYZ="https://res.cloudinary.com/dabyqnijl/image/upload/v1738629648/p13jmnqe8xytp8fggkxa.png";
  return (
    <section className='w-full min-h-screen flex flex-row'>
        <section className='flex-1 relative overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={indexImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
                <Image
                  src={IMAGES[indexImage]}
                  alt='Imagen de Fondo'
                  layout='fill'
                  objectFit="cover"
                />
            </motion.div>
          </AnimatePresence>
        </section>
        <section className='flex-1 flex flex-col items-center justify-center '>
            <Image
              src={URL_LOGO_BYZ}
              width={100}
              height={200}  
              alt='Imagen del Logo ByZ'
            />
            <FormLogin/>
        </section>
    </section>
  )
}
