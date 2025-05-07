'use client'
import React from 'react'
import {motion} from "motion/react"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function ServicesCardDesplegable({
    data
}) {
  const router = useRouter();
  const {title, img, urlName} = data;
  
  return (
    <motion.div
      className='w-full h-80 flex flex-row items-center bg-gray-300 justify-between mt-4 object-cover'
      whileHover={{height : 500}}
      transition={{ stiffness : 150}}
    >
      <div className='w-full h-full relative '>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
        <Image
          className='z-0 absolute inset-0 w-full h-full object-cover '
          src={img}
          alt='Imagen de Grupo ByZ'
          width={400}
          height={200}
        />
        <div className="z-20 absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 ">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <button 
            className='mt-4 border border-white p-4 hover:bg-naranja text-white'
            onClick={()=>router.push(urlName)}  
          >
            <p className=' cursor-pointer font-bold'>Mas información</p>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
