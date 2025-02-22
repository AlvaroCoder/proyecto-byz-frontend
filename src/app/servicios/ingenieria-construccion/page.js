import { IMAGE_INGENIERIA } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import React from 'react'

export default function Page() {
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_INGENIERIA}
        alt='Imagen de Ingenieria y construccion'
        title='Ingeniería y Construcción'
      />
    </section>
  )
}
