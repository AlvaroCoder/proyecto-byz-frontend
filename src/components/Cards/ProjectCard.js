'use client'
import React from 'react'
import {motion} from "motion/react";

export default function ProjectCard({data}) {
    const {price, location, department, type} = data;
  return (
    <motion.div 
        className='h-96 w-72 mx-4 bg-gray-50 rounded-lg'
        initial={{ opacity : 0, x : -50 }}
        animate={{ opacity : 1, x : 0 }}
        transition={{ duration : 0.5, ease : "easeOut"}}
    >
       <section className='flex-col'>
            <div className='w-full h-60 flex justify-center items-center bg-gray-300 '>
                <p>Imagen</p>
            </div>
            <div className='p-2'>
                <p className='bg-naranja px-2 w-fit text-xs text-white rounded-lg mb-2'>{type}</p>
                <p className='text-sm'>Desde</p>
                <h1 className='font-bold text-lg'>${price}</h1>
                <div className='flex flex-col '>
                    <p className='text-sm '>{location}</p>
                    <p className='text-gris text-sm -mt-1'>{department}</p>
                </div>
            </div>
       </section>
    </motion.div>
  )
}