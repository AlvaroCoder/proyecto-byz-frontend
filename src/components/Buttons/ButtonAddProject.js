'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddProject() {
    const router = useRouter();

  return (
    <Button
        onClick={()=>router.push("/admin/dashboard/projects/add")}
        className="bg-naranja hover:bg-naranja flex flex-row items-center"
    >
        <p className='flex flex-row items-center'>
            <AddIcon/>
            <span className='ml-2'>Agregar proyecto</span>
        </p>
    </Button>
  )
}
