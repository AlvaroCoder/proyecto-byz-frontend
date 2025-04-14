'use client'
import { useFetch } from '@/app/hooks/useHooks';
import Image from 'next/image';
import React from 'react'

export default function CardUserHoriz({
    data
}) {
    console.log(data);
    
    const URL_GET_USER_DATA = process.env.NEXT_PUBLIC_GET_USERS+"/"+data?.id_user;
    const {data : dataResponseUser, loading : loadingDataUser, error : errorDataUser} = useFetch(URL_GET_USER_DATA)
    console.log(dataResponseUser);
    
  return (
    <div className='w-full p-2 '>
        <div className='flex flex-row items-center'>
            <Image
                src={dataResponseUser?.photo}
                alt='Imagen de perfil anunciante'
                width={60}
                height={60}
            />
           <div className='ml-2'>
            <h1 className='font-bold text-xl'>{dataResponseUser?.user_name}</h1>
            <p>{dataResponseUser?.personal_email}</p>
           </div>
        </div>
    </div>
  )
}
