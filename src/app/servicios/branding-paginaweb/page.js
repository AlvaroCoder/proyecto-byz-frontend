import { IMAGE_LOGOCOSAI } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import React from 'react'

export default function Page() {
  return (
    <section className='w-full min-h-screen'>
      <ImageCardBanner
        src={IMAGE_LOGOCOSAI}
        alt='Imagen de Logo COSAI'
        title='Branding y Página Web'
      />
    </section>
  )
}
