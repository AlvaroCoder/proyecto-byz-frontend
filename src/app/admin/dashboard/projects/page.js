'use client'
import { useFetch } from '@/app/hooks/useHooks'
import { ButtonAddProject } from '@/components/Buttons'
import { TableProjects } from '@/components/Tables';
import React from 'react'

export default function Page() {
  const URL_GET_PROJECTS = process.env.NEXT_PUBLIC_GET_PROJECTS;
  const {data, loading, error} = useFetch(URL_GET_PROJECTS);
  
  return (
    <div className='w-full h-full overflow-y-auto p-8'>
      <section className='w-full flex flex-row justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Proyectos inmobiliarios</h1>
          <p className='text-sm'>Proyectos de ByZ</p>
        </div>
        <div>
          <ButtonAddProject/>
        </div>
      </section>
      <section className='w-full min-h-24 mt-4'>
        {
          loading ?
          <p>Cargando ... </p> :
          <TableProjects
            data={data}
          />  
        }
      </section>
    </div>
  )
}
