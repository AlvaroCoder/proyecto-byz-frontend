'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { ButtonAdd } from '@/components/Buttons'
import { TableUsers } from '@/components/Tables';
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Page() {
  const URL_GET_USERS = process.env.NEXT_PUBLIC_GET_USERS;
  const URL_GET_ROLES = process.env.NEXT_PUBLIC_GET_ROLES;
  const {data : dataUsers, loading : loadingDataUsers, error : errorDataUser} = useFetch(URL_GET_USERS);
  const {data : dataRoles, loading : loadingDataRoles, error : errorDataRoles} = useFetch(URL_GET_ROLES);
  
  return (
    <div className='w-fulll h-full overflow-y-auto p-8'>
      <section className='w-full flex flex-row justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Usuarios de Grupo ByZ</h1>
          <p className='text-sm'>Usuarios registrados para grupo ByZ</p>
        </div>
      </section>
      {
        (loadingDataUsers || loadingDataRoles) ? <p>Cargando ... </p> : 
        <TableUsers
          dataUsuarios={dataUsers}
          dataRoles={dataRoles?.projects}
        />
      }
    </div>
  )
}
