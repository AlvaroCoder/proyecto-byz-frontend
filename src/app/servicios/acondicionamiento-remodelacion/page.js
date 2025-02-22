import { IMAGE_ACONDICIONAMIENTO } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import React from 'react'

export default function Page() {
  return (
    <div className='w-full min-h-screen'>
      <ImageCardBanner
        title='Acondicionamiento y Remodelación'
        src={IMAGE_ACONDICIONAMIENTO}
        alt='Imagen de Acondicionamiento y remodelación' 
      />
    </div>
  )
}
