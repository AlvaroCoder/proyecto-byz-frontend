import { IMAGE_SFL } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import React from 'react'

export default function Page() {
  
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_SFL}
        alt='Imagen de Saneamiento Fisico Legal'
        title='Saneamiento Fisico Legal'
      />
    </section>
  )
}
