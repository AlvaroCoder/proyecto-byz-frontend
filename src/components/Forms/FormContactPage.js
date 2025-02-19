import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

export default function FormContactPage() {
  return (
    <div className="bg-gris rounded-none xl:rounded-lg p-8 w-full xl:w-3/4 min-h-96">
        <div className='w-full text-white   '>
            <label className=''>Nombre</label>
            <Input 
                className="w-full bg-white text-gris rounded-none p-4"
            />
        </div>
        <div className='w-full flex flex-row items-center justify-center text-white mt-4'>
            <div className='flex-1'>
                <label className=''>Email</label>
                <Input
                    className="flex-1 bg-white text-gris rounded-none"
                />
            </div>
            <div className='flex-1 ml-4'>
                <label className=''>Numero de Telefono</label>
                <Input
                    className="flex-1 bg-white text-gris rounded-none"
                />
            </div>
        </div>
        <div className='mt-4'>
            <h1 className='text-white'>Escribe tu petición para poder contactarnos</h1>
            <Textarea
                className="w-full bg-white rounded-none h-40 resize-none"
            />
        </div>
        <Button
            variant="ghost"
            className="flex justify-center items-center rounded-none border border-naranja w-full mt-4 bg-naranja text-white hover:bg-orange-300 hover:text-gris py-5"
        >
            <p>Enviar Petición</p>
        </Button>
    </div>  
  )
}
