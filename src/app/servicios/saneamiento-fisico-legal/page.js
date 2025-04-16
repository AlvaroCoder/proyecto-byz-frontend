'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_SFL } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const URL_GET_SERVICES = process.env.NEXT_PUBLIC_GET_SERVICES;
  const {data : dataServices, loading : loadingDataServices, error : errorDataServices} = useFetch(URL_GET_SERVICES);
  const URL_IMAGEN = "https://res.cloudinary.com/dabyqnijl/image/upload/v1744654339/ImagesByZ/eoaosaiyrcguy0fjsign.jpg"

  const [dataCurrentService, setDataCurrentService] = useState(null);
  
  useEffect(()=>{
    if (!loadingDataServices) {
      const currentService = dataServices?.projects?.filter((item)=>item?.title?.toUpperCase()==="Sanemamiento Físico Legal (SFL)".toUpperCase())[0]
      console.log(currentService);
      
      setDataCurrentService(currentService);
    }
  },[dataServices])
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
        src={IMAGE_SFL}
        alt='Imagen de Saneamiento Fisico Legal'
        title={dataCurrentService?.title}
      />
      <section className='w-full grid grid-cols-1  md:grid-cols-2 '>
        <div className='bg-gray-100 h-[600px] relative '>
          <Image
            className='absolute'
            src={URL_IMAGEN}
            alt='Imagen de fondo'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='p-4 flex flex-col gap-3 justify-center items-center '>
          <h1 className='font-bold text-lg'>Descripción</h1>
          {
            dataCurrentService?.description?.map((item, idx)=><p key={idx} className='max-w-72 text-center' >{item}</p>)
          }
        </div>
      </section>
    </section>
  )
}
