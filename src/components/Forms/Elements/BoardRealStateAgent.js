'use client'
import { SeparatorForms } from '@/components/Commons';
import { TableRealAgent } from '@/components/Tables';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useMemo, useState } from 'react'

export default function BoardRealStateAgent({
  dataUsers=[],
  loadingDataUsers=false,
  handleChangeShowFormUser,
  handleChangeSelectAgent
}) {

  const [queryInput, setQueryInput] = useState("");

  const currentDataUserFilter = useMemo(()=>{
    return dataUsers?.filter((item)=>item?.role?.id === 5)?.filter((item)=> item?.user_name?.toUpperCase().includes(queryInput.toUpperCase()))
  },[queryInput, dataUsers]);
  
  const handleChangeQuery=(evt)=>{
    setQueryInput(evt.target.value);
  }
  return (
    <section className='w-full p-4 bg-white rounded-lg col-span-2 h-fit'>
          <h1 className='text-lg font-bold'>Selecciona un agente</h1>
          <div className='w-full flex flex-row gap-4'>
            <Input
              className="flex-1 "
              placeholder="Busca en el nombre de usuario ...."
              value={queryInput}
              onChange={handleChangeQuery}
            />
            <Button className="bg-naranja hover:bg-naranja text-white">
              <p>Buscar</p>
            </Button>
          </div>
          <SeparatorForms/>
          <div className='w-full flex flex-col justify-center items-center'>
            {
              loadingDataUsers ? 
              <p>Cargando ...</p> : 
              <div className='w-full'>
                {
                  currentDataUserFilter?.length > 0 ?
                  <TableRealAgent 
                    data={currentDataUserFilter} 
                    handleChangeSelectAgent={handleChangeSelectAgent}  
                  /> : 
                  <div className='min-h-24 flex flex-col justify-center gap-4 rounded-lg py-4  items-center bg-gris '>
                    <h1 className='text-white'>No hay agentes Inmobiliarios</h1>
                    <Button
                      className="bg-naranja hover:bg-naranja text-white"
                      onClick={handleChangeShowFormUser}
                    >
                      <p>Agregar nuevo agente</p>
                    </Button>
                  </div>
                }
              </div>
            }
          </div>
        </section>
  )
}
