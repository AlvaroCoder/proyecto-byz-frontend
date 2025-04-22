'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_DISEÑO } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const URL_GET_SERVICES = process.env.NEXT_PUBLIC_GET_SERVICES;
  const {data : dataServices, loading : loadingDataServices, error :  errorDataServices} = useFetch(URL_GET_SERVICES)
    
  const [dataCurrentService, setDataCurrentService] = useState(null);
  const URL_IMAGEN = "https://res.cloudinary.com/dabyqnijl/image/upload/v1744654339/ImagesByZ/eoaosaiyrcguy0fjsign.jpg"
  
  
  useEffect(()=>{
    if (!loadingDataServices) {
      const currentService = dataServices?.projects?.filter((item)=>item?.title?.toUpperCase() === "Diseño Arquitectónico modificado".toUpperCase())[0];      
      setDataCurrentService(currentService);
    }
  },[dataServices]);
  
  if (loadingDataServices) {
    return(
      <section className='py-4'>
        <Skeleton
        className={"w-full min-h-screen"}
      />
      </section>
    )
  }
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_DISEÑO}
        alt='Imagen de Diseño arquitectonico'
        title={dataCurrentService?.title}
      />
      <section className='w-full grid grid-cols-2'>
        <div className='bg-gray-100 h-[600px] relative'>
          <Image
            className='absolute'
            src={URL_IMAGEN}
            alt='Imagen de fondo'
            layout='fill'
            objectFit='cover'

          />
        </div>
        <div className='p-4 flex flex-col gap-3 justify-center items-center'> 
          <h1 className='font-bold text-2xl'>Descripción</h1>
          {
            dataCurrentService?.description?.map((item, idx)=><p key={idx} className='max-w-72 text-center '>{item}</p>)
          }
        </div>
      </section>
      <section className='w-full min-h-screen flex flex-col justify-center items-center'>
          <h1 className='font-bold underline text-3xl'>Lo que ofrecemos</h1>
          <div className='max-w-4xl w-full mt-4 grid grid-cols-3 auto-cols-max  h-auto gap-4'
          >
            {
              dataCurrentService?.services?.map((item,idx)=><p key={idx} className='p-2 rounded-lg bg-gray-300  w-full text-center'>{item}</p>)
            }
          </div>
      </section>
    </section>
  )
}
