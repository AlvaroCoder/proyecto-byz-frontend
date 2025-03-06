import Image from 'next/image'
import React from 'react'

export default function ImageCardPrev({ image }) {
  return (
    <div>
        <Image
            src={image}
        />
    </div>
  )
}
