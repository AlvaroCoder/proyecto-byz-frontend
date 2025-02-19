'use client'
import React from 'react'
import {motion} from "motion/react"
export default function ServicesCardDesplegable({
    data
}) {
  const {title} = data;
  return (
    <motion.div
      className='w-full h-36 p-8 flex flex-row items-center bg-gray-300 justify-between mt-4'
      whileHover={{height : 250}}
      transition={{type :"spring", stiffness : 200}}
    >
     <h1>{title}</h1>
      <a ><p>Leer más información </p></a>
    </motion.div>
  )
}
