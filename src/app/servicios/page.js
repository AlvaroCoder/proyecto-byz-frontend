import { IMAGES_MAIN_SERVICES } from '@/assets/ImagesServices';
import { ServicesCardDesplegable } from '@/components/Cards';
import Image from 'next/image';
import React from 'react'

const URL_FONDO_SERVICIOS = "https://res.cloudinary.com/dabyqnijl/image/upload/v1741805665/ImagesByZ/gljjm312uxdaiand8e8h.jpg";

export default function Page() {
  
  return (
    <section className='w-full min-h-screen'>
      <div className='relative w-full h-96 bg-gris flex flex-col items-center justify-center'>
        <h1 className='z-30 text-4xl font-bold text-white'>Nuestros Servicios</h1>
        <p className='z-30 text-white'>Nuestros servicios abarcan desde saneamiento físico legal, hasta branding y diseño web</p>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-20" />
        <div className='absolute z-10 w-full top-0 h-full'>
          <Image
            src={URL_FONDO_SERVICIOS}
            alt='Imagen de fondo de servicios'
            objectFit='cover'
            layout='fill'
          />
        </div>
      </div>
      <section className='px-8 py-4'>
        {
          IMAGES_MAIN_SERVICES?.map((item,idx)=><ServicesCardDesplegable key={idx} data={item} />)
        }
      </section>
    </section>
  )
}
