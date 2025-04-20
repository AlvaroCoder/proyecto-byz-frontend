'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_INGENIERIA } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const  URL_GET_SERVICES = process.env.NEXT_PUBLIC_GET_SERVICES;
  const {data : dataServices, loading : loadingDataServices, error : errorDataServices} = useFetch(URL_GET_SERVICES)
  const [dataCurrentService, setDataCurrentService] = useState(null);
  console.log(dataServices);
  
  useEffect(()=>{
    if (!loadingDataServices) {
      const currentServices = dataServices?.projects?.filter((item)=>item?.title?.toUpperCase() === "Ingeniería y construcción".toUpperCase())[0]
      setDataCurrentService(currentServices);
    }
  },[dataServices]);
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_INGENIERIA}
        alt='Imagen de Ingenieria y construccion'
        title='Ingeniería y Construcción'
      />
    </section>
  )
}
