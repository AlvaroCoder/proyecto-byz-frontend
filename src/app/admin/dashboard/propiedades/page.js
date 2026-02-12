'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { ButtonAdd } from '@/components/Buttons';
import TableProperties from '@/components/Tables/TableProperties';
import React from 'react'


export default function Page() {
  const URL_GET_STATUS_PROPERTIES=process.env.NEXT_PUBLIC_GET_STATUS_PROPERTIES;
  const URL_GET_DATA_PROPERTIES=process.env.NEXT_PUBLIC_GET_PROPERTIES;
  const {data : dataStatusProperties, loading : loadingDataStatusProperties, error : errorDataStatusProperties} = useFetch(URL_GET_STATUS_PROPERTIES);
  const {data : dataProperties, loading : loadingDataProperties, error : errorDataProperties} = useFetch(URL_GET_DATA_PROPERTIES);
    
  return (
    <div className='w-full h-full overflow-y-auto p-8'>
      <section className='w-full flex flex-row justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Propiedades de Corretaje</h1>
          <p className='text-sm'>Propiedades creadas por los corredores inmobiliarios</p>
        </div>
        <div>
          <ButtonAdd
            routeName='/admin/dashboard/propiedades/add'
            titleButton='Agregar Propiedad'
          />
        </div>
      </section>
      <section className='w-full min-h-24 mt-4'>
        {
          (loadingDataStatusProperties || loadingDataProperties) ?
          <p>Cargando ... </p>:
          <TableProperties
            dataProperties={dataProperties?.projects}
            dataStatus={dataStatusProperties?.projects}
          />
        }
      </section>
    </div>
  )
}