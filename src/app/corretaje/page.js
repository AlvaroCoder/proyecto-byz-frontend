'use client';
import React from 'react';
import { useFetch, useFetchApi } from '../hooks/useHooks';
import { SearchPropertyBanner } from '@/components/Commons';
import { CardPropertyHoriz } from '@/components/Cards';

export default function Page() {

  const URL_GET_PROPERTIES_DATA = process.env.NEXT_PUBLIC_GET_PROPERTIES;
  const {data : dataProperties, loading : loadingDataProperties} = useFetch(URL_GET_PROPERTIES_DATA);
  
  if (loadingDataProperties) {
    return (<p>Cargando ... </p>)
  }
  return (
    <div className='w-full min-h-screen'>
      <section className='p-9 bg-gray-100'>
        <h1 className='font-bold text-3xl'>Busca tu próxima propiedad</h1>
        <SearchPropertyBanner/>
      </section>
      <p className='w-full my-2 px-9 text-2xl font-bold mt-8 text-gray-600'>
        Resultados más cercanos
      </p>
      <section className='w-full flex flex-col gap-10 mb-2 p-10'>
        {
          dataProperties?.projects?.map((item, key)=><CardPropertyHoriz  key={key} {...item}/>)
        }
      </section>
    </div>
  )
}
