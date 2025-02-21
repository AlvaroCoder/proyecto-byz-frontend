import { ServicesCardDesplegable } from '@/components/Cards';
import React from 'react'

export default function Page() {
  const IMAGE_SFL = "https://res.cloudinary.com/dabyqnijl/image/upload/v1740151967/ImagesByZ/djkx3kyeqegsvtollfr1.png";
  const IMAGE_DISEÑO = "https://res.cloudinary.com/dabyqnijl/image/upload/v1740158270/ImagesByZ/cekxf7sxy3o4twjuafic.png";
  const IMAGE_INGENIERIA = "https://res.cloudinary.com/dabyqnijl/image/upload/v1740158491/ImagesByZ/oh4chfekpcpjzqchpjsu.png";
  const IMAGE_INTERIORES = "https://res.cloudinary.com/dabyqnijl/image/upload/v1740173073/ImagesByZ/folxzzhy3o3mwmagono7.png";
  const IMAGE_ACONDICIONAMIENTO = "https://res.cloudinary.com/dabyqnijl/image/upload/v1740173060/ImagesByZ/zrkyw9zor5pctbyfhywc.png";
  const IMAGE_LOGOCOSAI = "https://res.cloudinary.com/dabyqnijl/image/upload/v1740167017/ImagesByZ/epwb6g3qibmzpckughwy.png"

  const services = [
    {title : "Saneamiento Fisico Legal", img : IMAGE_SFL},
    {title : "Diseño arquitectonico", img : IMAGE_DISEÑO},
    {title : "Ingeniería y Construcción", img: IMAGE_INGENIERIA},
    {title : "Diseño de Interiores", img : IMAGE_INTERIORES},
    {title : "Acondicionamiento y Remodelación", img : IMAGE_ACONDICIONAMIENTO},
    {title : "Branding y Página Web", img : IMAGE_LOGOCOSAI}
  ]
  return (
    <section className='w-full min-h-screen'>
      <div className='w-full h-96 bg-gris flex items-center justify-center'>
        <h1 className='text-xl font-bold text-white'>Nuestros Servicios</h1>
      </div>
      <section className='px-8 py-4'>
        {
          services?.map((item,idx)=><ServicesCardDesplegable key={idx} data={item} />)
        }
      </section>
      <section className='w-full min-h-screen'>
        
      </section>
    </section>
  )
}
