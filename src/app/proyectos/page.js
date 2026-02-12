'use client'
import Image from 'next/image';
import React from 'react'
import { useFetch } from '../hooks/useHooks';
import { GridLoadingCard } from '@/components/Loading';
import { GridCardProjects } from '@/components/Cards';

export default function Page() {
  const IMAGE_BANNER="https://res.cloudinary.com/dabyqnijl/image/upload/v1741805665/ImagesByZ/gljjm312uxdaiand8e8h.jpg";
  const URL_GET_PROYECTOS =process.env.NEXT_PUBLIC_GET_PROJECTS;
  const {data : dataProjects, loading : loadinDataProjects, error : errorDataProjects} = useFetch(URL_GET_PROYECTOS);
  
  return (
    <div className='w-full min-h-screen'>
      <section className='w-full h-[400px] bg-gray-300 relative flex items-center justify-center'>
        <div className='absolute bottom-10 md:right-1/2 bg-white p-4  z-30 w-96 shadow-md'>
          <h1 className='font-bold text-gris text-3xl '>Nuestros Proyectos</h1>
          <p className='mt-4 text-gris'>Descubre los espacios que tenemos disponibles para ti.</p>
        </div> 
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-20" />
        <div className='absolute w-full h-full inset-0 opacity-80 z-0'>
            <Image
              src={IMAGE_BANNER}
              alt='Imagen de banner'
              layout='fill'
              objectFit='cover'
            />
        </div>  

      </section>
      <section className='w-full flex justify-center items-center my-8'>
        <div className='max-w-6xl w-full'>
          {
            loadinDataProjects ? 
            <GridLoadingCard/>:
            <GridCardProjects
              data={dataProjects?.projects}
            />
          }
        </div>
      </section>
    </div>
  )
}
