'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_DISEÑO } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import React from 'react'

export default function Page() {
  const URL_GET_SERVICES = process.env.NEXT_PUBLIC_GET_SERVICES;
  const {data : dataServices, loading : loadingDataServices, error :  errorDataServices} = useFetch(URL_GET_SERVICES)
  console.log(dataServices);
  
  if (loadingDataServices) {
    return (<p>Cargando ...</p>)
  }
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_DISEÑO}
        alt='Imagen de Diseño arquitectonico'
        title={dataServices?.projects[2]?.title}
      />
      <section className='w-full grid grid-cols-2'>
        <div className='bg-gray-100'>

        </div>
        <div className='p-4'> 
          {
            dataServices?.projects[2]?.description?.map((item, idx)=><p key={idx}>{item}</p>)
          }
        </div>
      </section>
    </section>
  )
}
