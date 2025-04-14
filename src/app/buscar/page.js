'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useFetchApi } from '../hooks/useHooks';
import { SearchPropertyBanner } from '@/components/Commons';
import { CardPropertyHoriz } from '@/components/Cards';

export default function page() {
    const searchParams = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    const URL_GET_PROPERTIES_NEARBY = process.env.NEXT_PUBLIC_GET_PROPERTIES_NEARBY;
    const {data : dataProperties, loading : loadingDataProperties} = useFetchApi(URL_GET_PROPERTIES_NEARBY, {
        method : "POST",
        mode : "cors",
        headers : {
          'Content-Type':'application/json'
        },
        body : JSON.stringify({lat, lng})
      });
      
      if (loadingDataProperties) {
        return (<p>Cargando ...</p>)
      }
      return (
        <div className='w-full min-h-screen'>
            <section className='p-9 bg-gray-100'>
                <SearchPropertyBanner/>
            </section>
            <p className='w-full my-2 px-9 text-2xl font-bold mt-8 text-gray-600'>
              Resultados más cercanos
            </p>
            <section className='w-full flex flex-col gap-10 mb-2 p-10'>
                {
                dataProperties?.properties?.map((item, key)=><CardPropertyHoriz  key={key} {...item}/>)
                }           
            </section>
        </div>
      )
}
