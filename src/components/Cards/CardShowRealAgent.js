import Image from 'next/image';
import React from 'react'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export default function CardShowRealAgent({
    data={}
}) {    
  return (
    <div className='w-full h-fit flex flex-col gap-2 items-center p-2'>
        <Image
            src={data?.photo}
            alt='Icono de perfil usuario'
            width={60}
            height={60}
        />
       <div className='flex flex-col items-center'>
        <h1 className='font-bold text-xl'>{data?.user_name}</h1>
        <h1 className='text-sm'>{data?.first_name}, {data?.last_name}</h1>
       </div>
       <h1 className='flex flex-row items-center text-sm bg-orange-300 p-2 rounded-full'>
        <span>
            <AssignmentIndIcon/>
        </span>  {data?.role?.value}
       </h1>
    </div>
  )
};