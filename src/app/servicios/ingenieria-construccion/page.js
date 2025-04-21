'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_INGENIERIA } from '@/assets/ImagesServices'
import { ButtonNaranja } from '@/components/Buttons';
import { ImageCardBanner } from '@/components/Cards'
import { FormContactPage } from '@/components/Forms';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const  URL_GET_SERVICES = process.env.NEXT_PUBLIC_GET_SERVICES;
  const {data : dataServices, loading : loadingDataServices, error : errorDataServices} = useFetch(URL_GET_SERVICES)
  const [dataCurrentService, setDataCurrentService] = useState(null);
  console.log(dataServices);
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

        <section className=" pb-8 border-t-[1px] border-t-gris w-full min-h-screen flex flex-col justify-center items-center" >
            <div className="w-full h-40 flex flex-col justify-center items-center">
              <h1 className="font-bold text-3xl">Contactanos</h1>
              <h2>Empecemos tu diseño juntos, contactanos para poder ponernos en contacto contigo</h2>
            </div>
            <FormContactPage
              
            />
        </section>
    </section>
  )
}
