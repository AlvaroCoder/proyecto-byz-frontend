'use client'
import Image from 'next/image';
import React from 'react'
import { useFetch } from '../hooks/useHooks';
import { GridLoadingCard } from '@/components/Loading';
import { GridCardProjects } from '@/components/Cards';

export default function Page() {
  const IMAGE_BANNER="https://res.cloudinary.com/dabyqnijl/image/upload/t_crop_family/kmyseko3q7rzir0wacze";
  const URL_GET_PROYECTOS =process.env.NEXT_PUBLIC_GET_PROJECTS_2;
  const {data : dataProjects, loading : loadinDataProjects, error : errorDataProjects} = useFetch(URL_GET_PROYECTOS);
  
  return (
    <div className='w-full min-h-screen'>
      <section className='w-full h-[600px] bg-gray-300 relative flex items-center justify-center'>
        <div className='absolute w-full h-full inset-0 opacity-80 z-0'>
          <Image
            src={IMAGE_BANNER}
            alt='Imagen de banner'
            layout='fill'
            objectFit='cover'
          />
        </div>  
        <div className='absolute bottom-10 right-1/2 bg-white p-4 rounded-lg z-10 w-96 shadow-md'>
          <h1 className='font-bold text-gris text-3xl '>Nuestros Proyectos</h1>
          <p className='mt-4 text-gris'>Descubre el espacio; para tu futuro. Encuentra el mejor y más cercano para ti.</p>
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
