import {  IMAGE_INTERIORES } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import React from 'react'

export default function Page() {
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_INTERIORES}
        alt='Imagen de Diseño de interiores'
        title='Diseño de Interiores'
      />
    </section>
  )
}
