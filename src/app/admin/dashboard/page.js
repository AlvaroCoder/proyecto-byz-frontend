'use client'
import { useFetch } from '@/app/hooks/useHooks'
import BarChartRealAgent from '@/components/Graphs/BarChartRealAgent';
import PieChartProjects from '@/components/Graphs/PieChartProjects';
import PieChartProperties from '@/components/Graphs/PieChartProperties';
import React from 'react'

export default function Page() {
  const URL_GET_USER = process.env.NEXT_PUBLIC_GET_USERS;
  const URL_GET_PROJECTS = process.env.NEXT_PUBLIC_GET_PROJECTS;
  const URL_GET_PROPERTIES = process.env.NEXT_PUBLIC_GET_PROPERTIES;
  const URL_GET_CLIENTES = process.env.NEXT_PUBLIC_GET_CLIENTS;

  const {data : dataUsers, loading : loadingDataUsers, error : errorDataUsers} = useFetch(URL_GET_USER);
  const {data : dataProjects, loading : loadingDataProjects, error : errorDataProjects} = useFetch(URL_GET_PROJECTS);
  const {data : dataProperties, loading : loadingDataProperties, error : errorDataProperties} = useFetch(URL_GET_PROPERTIES);
  const {data : dataClientes, loading : loadingDataClientes, error : errorDataClientes} = useFetch(URL_GET_CLIENTES);
  
  const dataPropiedadesSeparada = [
    dataProperties?.projects?.filter(item=>item?.status?.toUpperCase() === "VENTA DISPONIBLE")?.length,
    dataProperties?.projects?.filter(item=>item?.status?.toUpperCase() === "ALQUILER DISPONIBLE")?.length,
    dataProperties?.projects?.filter(item=>item?.status?.toUpperCase() === "VENDIDO")?.length,
    dataProperties?.projects?.filter(item=>item?.status?.toUpperCase() === "ALQUILADO")?.length
  ];

  const dataProyectosSeparados= [
    dataProjects?.projects?.filter(item=>item?.status?.toUpperCase() === "PREVENTA DISPONIBLE")?.length,
    dataProjects?.projects?.filter(item=>item?.status?.toUpperCase() === "VENTA DISPONIBLE")?.length,
    dataProjects?.projects?.filter(item=>item?.status?.toUpperCase() === "VENDIDO")?.length
  ];
  
  const agentesInmobiliarios = dataUsers?.filter((item)=>item?.role?.id === 5);
  if (loadingDataUsers || loadingDataProjects || loadingDataProperties || loadingDataClientes) {
    return (<p>Cargando ...</p>)
  }
  return (
    <div className='w-full p-4 min-h-screen bg-gray-100 overflow-hidden '>
      <h1 className='font-bold text-2xl mb-4'>Información General</h1>
      <section className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
        <div className='bg-white shadow-lg p-4'>
          <h1>Clientes registrados</h1>
          <h1 className='font-bold text-4xl'>{dataClientes?.length}</h1>
        </div>
        <div className='bg-white shadow-lg p-4'>
          <h1>Agentes Inmobiliarios</h1>
          <h1 className='font-bold text-4xl'>{agentesInmobiliarios?.length}</h1>
        </div>
        <div className='bg-white shadow-lg p-4'>
          <h1>Nro de Proyectos</h1>
          <h1 className='font-bold text-4xl'>{dataProjects?.projects?.length}</h1>
        </div>
        <div className='bg-white shadow-lg p-4'>
          <h1>Nro de Propiedades</h1>
          <h1 className='font-bold text-4xl'>{dataProperties?.projects?.length}</h1>
        </div>
      </section>
      <section className='w-full h-fit grid grid-cols-1 lg:grid-cols-3  mt-8 gap-4'>
          <div className='bg-white h-fit shadow-lg p-3'>
            <h1 className='font-bold text-xl text-center'>Ranking de Corredores Inmobiliarios</h1>
            <BarChartRealAgent
              dataPropiedades={dataProperties?.projects}
              dataUsuarios={dataUsers}
            />
          </div>
          <div className='bg-white shadow-lg p-3'>
            <h1 className='font-bold text-xl text-center'>Estado de las propiedades</h1>
            <PieChartProperties
                data={dataPropiedadesSeparada}
              />  
          </div>
          <div className='bg-white shadow-lg p-3'>
            <h1 className='font-bold text-xl text-center'>Estado de los Proyectos</h1>
            <PieChartProjects
              data={dataProyectosSeparados}
            />
          </div>
      </section>
    </div>
  )
}