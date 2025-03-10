'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAdd({
    routeName = "/admin/dashboard",
    titleButton = "Agregar Proyectos"
}) {
    const router = useRouter();
  return (
    <Button
        onClick={()=>router.push(routeName)}
        className="bg-naranja hover:bg-naranja flex flex-row items-center"
    >
        <p className='flex flex-row items-center'>
            <AddIcon/>
            <span>{titleButton}</span>
        </p>
    </Button>
  )
};