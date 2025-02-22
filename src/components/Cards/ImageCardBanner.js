import Image from 'next/image'
import React from 'react'

export default function ImageCardBanner({src, alt="Imagen de Fondo", title="Servicio"}) {
  return (
    <section className='w-full h-screen'>
        <div className='w-full min-h-screen relative'>
            <Image
                className='z-0 absolute inset-0 w-full h-full object-cover'
                src={src}
                alt={alt}
                width={200}
                height={100}
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50'>
                <h1 className='font-bold text-6xl text-white'>{title}</h1>
            </div>
        </div>
       
    </section>
  )
}
