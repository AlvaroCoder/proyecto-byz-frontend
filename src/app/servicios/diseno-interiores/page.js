'use client'
import { useFetch } from '@/app/hooks/useHooks';
import {  IMAGE_INTERIORES } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import { Tittle } from '@/components/Commons';
import { LoadingWindowProject } from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const URL_GET_SERVICES = process.env.NEXT_PUBLIC_GET_SERVICES;
  const {data : dataServices, loading : loadingDataServices, error : errorDataServices} = useFetch(URL_GET_SERVICES);
  const [dataCurrentService, setDataCurrentService] = useState(null);
  const URL_IMAGEN = "https://res.cloudinary.com/dabyqnijl/image/upload/v1745184308/ImagesByZ/vkfiopjvpxedimxlewkf.jpg";

  useEffect(()=>{
    if (!loadingDataServices) {
      const currentServices = dataServices?.projects.filter((item)=>item?.title?.toUpperCase() === "Diseño de Interiores".toUpperCase())[0];
      setDataCurrentService(currentServices);
    }
  }, [dataServices])

  if (loadingDataServices) {
    return (
      <section className='py-4'>
        <LoadingWindowProject
          loading={loadingDataServices}
        />
        <Skeleton className={"w-full min-h-screen"} />
      </section>
    )
  }
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_INTERIORES}
        alt='Imagen de Diseño de interiores'
        title={dataCurrentService?.title}
      />
      <section className='w-full min-h-[100px] bg-gris flex flex-row justify-center items-center gap-8'>
        <Tittle>Nuestro Brouchure</Tittle>
        <a 
          className='bg-naranja text-white  p-8 h-full'
          href='https://www.canva.com/design/DAGfV71tljo/A66BYrCzHrL6AYg6-LHQmw/view?utm_content=DAGfV71tljo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc6a184adec#1' 
          target='_blank' 
        >
          Mira nuestro Brouchure
        </a>
      </section>
      <section className='w-full grid grid-cols-1 md:grid-cols-2 min-h-screen'>
        <div className='order-2 md:order-1 bg-gray-100 relative'>
          <Image
            className='absolute'
            src={URL_IMAGEN}
            alt='Imagen de fondo'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='order-1 md:order-2 p-4 flex flex-col gap-3 justify-center items-center '>
          <Tittle>Descripción</Tittle>
          {
            dataCurrentService?.description?.map((item, idx)=><p key={idx} className='max-w-80 text-justify' >{item}</p>)
          }
        </div>
      </section>
    </section>
  )

}
