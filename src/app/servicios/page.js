import { IMAGES_MAIN_SERVICES } from '@/assets/ImagesServices';
import { ServicesCardDesplegable } from '@/components/Cards';
import React from 'react'

export default function Page() {
  
  return (
    <section className='w-full min-h-screen'>
      <div className='w-full h-96 bg-gris flex items-center justify-center'>
        <h1 className='text-xl font-bold text-white'>Nuestros Servicios</h1>
      </div>
      <section className='px-8 py-4'>
        {
          IMAGES_MAIN_SERVICES?.map((item,idx)=><ServicesCardDesplegable key={idx} data={item} />)
        }
      </section>
      <section className='w-full min-h-screen'>

        
      </section>
    </section>
  )
}
