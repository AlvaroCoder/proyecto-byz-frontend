'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_INGENIERIA } from '@/assets/ImagesServices'
import { ButtonNaranja } from '@/components/Buttons';
import { ImageCardBanner } from '@/components/Cards'
import { FormContactPage } from '@/components/Forms';
import { LoadingWindowProject } from '@/components/Loading';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const  URL_GET_SERVICES = process.env.NEXT_PUBLIC_GET_SERVICES;
  const {data : dataServices, loading : loadingDataServices, error : errorDataServices} = useFetch(URL_GET_SERVICES)
  const [dataCurrentService, setDataCurrentService] = useState(null);
  const URL_IMAGEN = "https://res.cloudinary.com/dabyqnijl/image/upload/v1745184308/ImagesByZ/vkfiopjvpxedimxlewkf.jpg";

  useEffect(()=>{
    if (!loadingDataServices) {
      const currentServices = dataServices?.projects?.filter((item)=>item?.title?.toUpperCase() === "Ingeniería y construcción".toUpperCase())[0]
      setDataCurrentService(currentServices);
    }
  },[dataServices]);
  if (loadingDataServices) {
    return(
      <section className='py-4'>
                <LoadingWindowProject
                  loading={loadingDataServices}
                />
        <Skeleton
          className={"w-full min-h-screen"}
        />
      </section>
    )
  }
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_INGENIERIA}
        alt='Imagen de Ingenieria y construccion'
        title='Ingeniería y Construcción'
      />
      <section className='w-full min-h-[400px] flex flex-row gap-8 justify-center items-center'>
        <h1 className='font-bold text-4xl'>Mision y Vision</h1>
        <ul className='max-w-2xl w-full'>
          {
            dataCurrentService?.misionVision?.description?.map((item, idx)=>
            <li key={idx} className='mt-4'>{item}</li>
            )
          }
        </ul>
      </section>
      <section className='w-full min-h-screen grid grid-cols-1 md:grid-cols-2'>
        <div className='relative'>
          <Image
            src={URL_IMAGEN}
            alt='Imagen de Fondo'
            layout='fill'
            objectFit='cover'
            className='absolute'
          />
        </div>
        <div className='flex flex-col text-white justify-center items-center gap-4 bg-gris'>
          <h1 className='font-bold text-3xl text-naranja'>{dataCurrentService?.quality?.title}</h1>
          <div>
            {
              dataCurrentService?.quality?.content?.map((item, idx)=>
              <p key={idx}>{item}</p>
              )
            }
          </div>
        </div>
      </section>
      <section>
        <h1>Nuestros Servicios</h1>
        <div>
          
        </div>
      </section>
    </section>
  )
}
