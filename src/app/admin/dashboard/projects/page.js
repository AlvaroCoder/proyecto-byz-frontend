'use client'
import { useFetch } from '@/app/hooks/useHooks'
import { ButtonAdd } from '@/components/Buttons'
import { TableProjects } from '@/components/Tables';
import React from 'react'

export default function Page() {
  const URL_GET_PROJECTS = process.env.NEXT_PUBLIC_GET_PROJECTS;
  const URL_GET_STATUS_PROJECTS = process.env.NEXT_PUBLIC_GET_STATUS_PROJECTS;
  
  const {data : dataProjects, loading : loadingDataProjects, error : errorDataProjects} = useFetch(URL_GET_PROJECTS);
  const {data : dataStatusProjects, loading : loadingDataStatusProjects, error : errorDataStatusProjects} = useFetch(URL_GET_STATUS_PROJECTS);
    
  return (
    <div className='w-full h-full overflow-y-auto p-8'>
      <section className='w-full flex flex-row justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Proyectos inmobiliarios</h1>
          <p className='text-sm'>Proyectos de ByZ</p>
        </div>
        <div>
          <ButtonAdd
            routeName='/admin/dashboard/projects/add'
            titleButton='Agregar Proyecto'
          />
        </div>
      </section>
      <section className='w-full min-h-24 mt-4'>
        {
          (loadingDataProjects || loadingDataStatusProjects)?
          <p>Cargando ... </p> :
          <TableProjects
            dataPojects={dataProjects?.projects}
            dataStatus={dataStatusProjects?.projects}
          />  
        }
      </section>
    </div>
  )
}
