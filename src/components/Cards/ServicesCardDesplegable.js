'use client'
import React from 'react'
import {motion} from "motion/react"
import Image from 'next/image';
export default function ServicesCardDesplegable({
    data
}) {
  const {title, img, urlName} = data;
  return (
    <motion.div
      className='w-full h-80 flex flex-row items-center bg-gray-300 justify-between mt-4 object-cover'
      whileHover={{height : 500}}
      transition={{type :"spring", stiffness : 200}}
    >
      <div className='w-full h-full relative '>
        <Image
          className='z-0 absolute inset-0 w-full h-full object-cover '
          src={img}
          alt='Imagen de Grupo ByZ'
          width={400}
          height={200}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 ">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <p className='underline text-white cursor-pointer'>Mas información</p>
        </div>
      </div>
    </motion.div>
  )
}
