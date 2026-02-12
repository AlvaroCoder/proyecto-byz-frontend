'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { IMAGE_INGENIERIA } from '@/assets/ImagesServices'
import { ButtonNaranja } from '@/components/Buttons';
import { ImageCardBanner } from '@/components/Cards'
import { Tittle } from '@/components/Commons';
import { FormContactPage } from '@/components/Forms';
import { LoadingWindowProject } from '@/components/Loading';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import GroupIcon from '@mui/icons-material/Group';

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
      <section className='w-full min-h-screen grid grid-cols-1 md:grid-cols-2'>
        <div className='order-2 md:order-1 bg-gray-100  relative '>
          <Image
            src={URL_IMAGEN}
            alt='Imagen de Fondo'
            layout='fill'
            objectFit='cover'
            className='absolute'
          />
        </div>
        <div className='order-1 md:order-2 p-4 flex flex-col gap-3 justify-center items-center'>
          <Tittle>Construye con ByZ</Tittle>
          {
            dataCurrentService?.buildWithBYZ?.description?.map((item, idx)=><p key={idx} className='max-w-80 text-justify'>{item}</p>)
          }
        </div>
      </section>
      <section className='bg-gris w-full min-h-[400px] flex flex-col md:flex-row gap-8 justify-center items-center'>
        <Tittle className="text-white border-b-2 border-b-naranja">Misión y Visión</Tittle>
        <ul className='max-w-2xl w-full p-4 md:p-0'>
          {
            dataCurrentService?.misionVision?.description?.map((item, idx)=>
            <li key={idx} className='mt-4 text-white' >{item}</li>
            )
          }
        </ul>
      </section>
      <section className='w-full min-h-screen grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col justify-center items-center gap-4 '>
          <Tittle>{dataCurrentService?.quality?.title}</Tittle>
          <div>
            {
              dataCurrentService?.quality?.content?.map((item, idx)=>
              <p key={idx} className='max-w-2xl w-full md:max-w-80 text-justify'>{item}</p>
              )
            }
          </div>
        </div>
        <div className='relative'>
          <Image
            src={URL_IMAGEN}
            alt='Imagen de Fondo'
            layout='fill'
            objectFit='cover'
            className='absolute'
          />
        </div>

      </section>
      <section className='w-full min-h-[600px] md:min-h-[400px] bg-gris flex flex-col justify-center items-center'>
        <Tittle className="text-white border-b-2 border-b-naranja">Servicios</Tittle>
        <div>
          <ul className='max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
          {
            dataCurrentService?.services?.map((item, key)=>
            <li 
              key={key}
              className='bg-white hover:bg-orange-300 transition-colors duration-300 rounded-xl shadow-md flex justify-center items-center text-center p-6 cursor-pointer'  
            >{item?.title}</li>)
          }
          </ul>
        </div>
      </section>
      <section className='w-full min-h-screen md:min-h-[500px] flex gap-10 flex-col md:flex-row justify-center items-center'>
        <section>
          <Tittle>{dataCurrentService?.quality?.title}</Tittle>
          <div >
            {
              dataCurrentService?.quality?.content?.map((item, idx)=>
              <p key={idx}>{item}</p>)
            }
          </div>
        </section>
        <section className='max-w-lg md:max-w-fit w-full  grid grid-cols-1 md:grid-cols-2 gap-1 text-gris text-xl'>
            <article className='border border-naranja hover:border-orange-300 transition-colors duration-300 hover:bg-orange-300 p-4 '>
              <RecordVoiceOverIcon className=''/>
              <p className=''>{dataCurrentService?.quality?.testimonials}</p>
            </article>
            <article className='border border-naranja hover:border-orange-300 transition-colors duration-300 hover:bg-orange-300 p-4 '>
              <HomeIcon/>
              <p>{dataCurrentService?.quality?.projects}</p>
            </article> 
            <article className='border border-naranja hover:border-orange-300 transition-colors duration-300 hover:bg-orange-300 p-4 '>
              <GroupIcon/>
              <p>{dataCurrentService?.quality?.brokers}</p>
            </article>
          </section>
      </section>
    </section>
  )
}
