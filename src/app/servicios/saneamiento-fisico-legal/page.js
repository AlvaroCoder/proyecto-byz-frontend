'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_SFL } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import { FormContactPage } from '@/components/Forms';
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
    <section className='w-full min-h-screen pb-8'>
      <ImageCardBanner
        src={IMAGE_SFL}
        alt='Imagen de Saneamiento Fisico Legal'
        title={dataCurrentService?.title}
      />
      <section className='w-full grid grid-cols-1  md:grid-cols-2 h-[700px]'>
        <div className='order-2 md:order-1 bg-gray-100  relative '>
          <Image
            className='absolute'
            src={URL_IMAGEN}
            alt='Imagen de fondo'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='order-1 md:order-2 p-4 flex flex-col gap-3 justify-center items-center '>
          <h1 className='font-bold text-lg'>Descripción</h1>
          {
            dataCurrentService?.description?.map((item, idx)=><p key={idx} className='max-w-80 text-justify' >{item}</p>)
          }
        </div>
      </section>
      <section className='w-full min-h-screen flex flex-col justify-center items-center bg-gris'>
          <h1 className='font-bold text-4xl text-center text-white border-b-2 border-b-naranja'>Servicios</h1>
          <div className='max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {
              dataCurrentService?.services?.map((item, idx)=>
                <div
                  key={idx}
                  className='bg-white hover:bg-orange-300 transition-colors duration-300 rounded-xl shadow-md flex justify-center items-center text-center p-6 cursor-pointer'
                >
                    <p>{item}</p>
                </div>)
            }
          </div>
      </section>
      <section className='w-full h-[700px] grid grid-cols-2'>
            <div className='p-4 flex flex-col gap-3 justify-center items-center'>
              <h1 className='font-bold text-lg'>Nuestros Objetivos</h1>
              <ul className='p-8 gap-4'>
                {
                  dataCurrentService?.goals?.map((item, idx)=>
                   <li key={idx} className='list-disc text-justify w-80'>
                    {item}
                   </li>
                  )
                }
              </ul>
            </div>
            <div className='flex-1 relative '>
              <Image
                src={URL_IMAGEN}
                alt='Imagen de fondo de nuestros objetivos'
                layout='fill'
                objectFit='cover'
                className='absolute'
              />
            </div>
            
      </section>
        <section className="border-t-[1px] border-t-gris w-full min-h-screen flex flex-col justify-center items-center" >
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
