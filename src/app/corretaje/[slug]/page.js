'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { CarrouselImagesCard } from '@/components/Cards';
import { SeparatorForms } from '@/components/Commons';
import { useParams } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import React from 'react'

export default function Page() {
    const {slug} = useParams();

    const URL_GET_PROPERTY_BY_ID = process.env.NEXT_PUBLIC_GET_PROPERTIES+"/"+slug;
    const {data : dataProperty, loading : loadingDataProperty, error : errorDataProperty} = useFetch(URL_GET_PROPERTY_BY_ID);
    
  if (loadingDataProperty) {
    return (<p>Cargando ...</p>)
  }
  return (
    <div>
      <section className='w-full p-10 h-[600px]'>
        <CarrouselImagesCard
          images={dataProperty?.projects?.[0]?.images}
          className={"h-[600px]"}
        />
      </section> 
      <section className='w-full p-10 grid grid-cols-3 gap-4 mt-4'>
        <div className='col-span-2 bg-white p-4 shadow-md'>
          <h1 className='font-bold text-naranja text-4xl'>S/.{dataProperty?.projects?.[0]?.price?.soles} - ${dataProperty?.projects?.[0]?.price?.dolar}</h1>
          <h1 className='font-bold text-3xl'>{dataProperty?.projects?.[0]?.name}</h1>
          <p className='bg-naranja rounded-full px-2 py-1 text-sm text-white w-fit my-2'>{dataProperty?.projects?.[0]?.status}</p>
          <p>{dataProperty?.projects?.[0]?.description}</p>
          <SeparatorForms/>
          <h1><LocationOnIcon/> <span>{dataProperty?.projects?.[0]?.location?.detailedLocation?.zone}</span></h1>
          <h1><span>{dataProperty?.projects?.[0]?.location}</span></h1>
        </div>
        <div className='bg-white p-4 shadow-lg'>
          
        </div>
      </section>
    </div>
  )
}