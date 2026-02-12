'use client'
import React from 'react'
import {motion} from "motion/react";
import CarrouselImagesCard from './CarrouselImagesCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Image from 'next/image';
import { SeparatorForms } from '../Commons';

export default function ProjectCard({
    images,
    description,
    name,
    price,
    status,
    geographicalDetails,
    location
}) {
  return (
    <motion.div 
        className='w-96 mx-4 bg-gray-50 rounded-lg'
        initial={{ opacity : 0, x : -50 }}
        animate={{ opacity : 1, x : 0 }}
        transition={{ duration : 0.5, ease : "easeOut"}}
    >
       <section className='flex-col p-2'>
            <div className='relative h-48 w-full'>
                {
                    images?.length > 1 ?
                    <CarrouselImagesCard
                    images={images}
                    /> : 
                    <div className='absolute h-full inset-0 rounded-lg'>
                        <Image
                            src={images[0]}
                            alt='Imagen de previsualizacion'
                            className='rounded-lg'
                            objectFit='cover'
                            layout='fill'
                        />
                    </div>
                }
            </div>
            <div className='p-4'>
                <h1 className='font-bold text-naranja text-3xl'>${price?.dolar} - S./{price?.soles}</h1>
                <h1 className='font-bold text-lg hover:underline cursor-pointer' >{name}</h1>
                <p className='p-1 rounded-lg bg-naranja text-white  w-fit my-1 text-sm'>{status}</p>
                <p className='text-sm'>{description}</p>
                <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className='ml-2'>{location?.detailedLocation?.zone}</span></p>
                <SeparatorForms/>
                <h1>Area Total : <span>{Number(geographicalDetails?.totalArea?.depth)*Number(geographicalDetails?.totalArea?.frontage)} mt2</span></h1>
            </div>
       </section>
    </motion.div>
  )
}