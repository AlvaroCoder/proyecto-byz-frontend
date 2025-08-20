import { IMAGE_ACONDICIONAMIENTO } from '@/assets/ImagesServices'
import { ImageCardBanner } from '@/components/Cards'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function Page() {
  const listImages = [
    [
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663376/WhatsApp_Image_2025-08-19_at_16.01.28_3_dvl8kh.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663375/WhatsApp_Image_2025-08-19_at_16.01.29_2_gopiyk.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663372/WhatsApp_Image_2025-08-19_at_16.01.28_4_mumgx4.jpg",
    ],
    [
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663371/WhatsApp_Image_2025-08-19_at_16.01.29_1_woaqpw.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663370/WhatsApp_Image_2025-08-19_at_16.01.29_5_xjaebs.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663370/WhatsApp_Image_2025-08-19_at_16.01.29_4_az6yhm.jpg",
    ],
    [
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663370/WhatsApp_Image_2025-08-19_at_16.01.29_tjvkuk.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663368/WhatsApp_Image_2025-08-19_at_16.01.30_2_zfgs6m.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663368/WhatsApp_Image_2025-08-19_at_16.01.29_3_n6uwfp.jpg",
    ], 
    [
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663367/WhatsApp_Image_2025-08-19_at_16.01.30_5_oj6lwp.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663367/WhatsApp_Image_2025-08-19_at_16.01.30_1_oxg8xw.jpg",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1755663367/WhatsApp_Image_2025-08-19_at_16.01.30_3_bqlqup.jpg",
    ]
  ];

  return (
    <div className='w-full min-h-screen'>
      <ImageCardBanner
        title='Acondicionamiento y Remodelación'
        src={IMAGE_ACONDICIONAMIENTO}
        alt='Imagen de Acondicionamiento y remodelación' 
      />
    <section className="w-full min-h-screen flex flex-col py-8 gap-8 items-center">
      <div className="w-full max-w-5xl px-6">
        <h1 className="font-bold text-2xl border-b text-center border-b-gray-300 pb-2">
          Alguno de nuestros proyectos
        </h1>
      </div>

      <div className="w-full  max-w-5xl grid gap-8 px-4">
        {listImages?.map((img, idx) => (
          <section
            key={idx}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 "
          >
            {/* Imagen principal más grande */}
            <div
              className={cn(
                idx % 2 === 0 ? "col-span-2 row-span-2" : "col-span-2 md:col-span-1 row-span-2",
                "relative h-64 md:h-96 rounded-xl overflow-hidden shadow-md"
              )}
            >
              <Image
                src={img[0]}
                alt="Imagen de remodelación"
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>

            {/* Otras imágenes más pequeñas */}
            <div className="relative h-40 md:h-48 rounded-xl overflow-hidden shadow-md">
              <Image
                src={img[1]}
                alt="Imagen de remodelación"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>

            <div className="relative h-40 md:h-48 rounded-xl overflow-hidden shadow-md">
              <Image
                src={img[2]}
                alt="Imagen de remodelación"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </section>
        ))}
      </div>
      
      <div className='mt-4 max-w-5xl w-full h-52 shadow rounded-sm flex flex-row items-center justify-center gap-40 bg-slate-100'>
        <div>
          <h1 className='font-bold text-xl'>Puedes ver nuestro Brochure</h1>
          <p>Revisalo para mas información</p>
        </div>
        <div>
          <a 
            className='bg-orange-400 rounded-sm text-white p-6 '
            target='_blank'
            href='https://www.canva.com/design/DAGfYvx8Bss/FdMYhMHMC5C2kyN3-zprhQ/view?utm_content=DAGfYvx8Bss&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd941598f98'
          >Brochure Aquí</a>
        </div>
      </div>
    </section>
      
    </div>
  )
}
