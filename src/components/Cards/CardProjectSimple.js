import React from 'react'
import CarrouselImagesCard from './CarrouselImagesCard'
import Image from 'next/image'
import { SeparatorForms } from '../Commons'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function CardProjectSimple({
    data={}
}) {
  return (
    <section className='w-full mt-4 rounded-lg bg-white p-2'>
        <div className='relative w-full h-48 rounded-lg'>
            {
                data?.images?.length > 0 ?
                (
                    data?.images?.length > 1 ?
                    <CarrouselImagesCard
                        images={data?.images}
                    /> :
                    <div className='absolute inset-0 w-full h-full rounded-lg'>
                        <Image
                            src={data?.images[0]?.preview}
                            alt='Imagen de previsualizacion'
                            className='rounded-lg'
                            objectFit='cover'
                            layout='fill'  
                        />                        
                    </div>
                ) : 
                (
                    <div className='bg-gray-200 w-full h-full flex justify-center items-center rounded-lg'>
                        <h1 className='text-gris'>Sube una imagen</h1>
                    </div>
                )
            }
        </div>
        <div className='p-4'>
            <h1 className='font-bold text-naranja text-4xl'>$ {data?.price.dolar|| "0.0"}</h1>
            <h1 className='font-bold text-lg'>{data?.name || "Titulo del proyecto"}</h1>
            <p className='p-1 rounded-lg bg-naranja text-white font-bold w-fit my-1 text-sm'>{data?.status}</p>

            <p className='text-sm'>{data?.description || "Esta descripción indica aspectos generales del proyecto, de acuerdo al precio, ubicación y área. Es importante que sea precisa."}</p>
            <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className=' ml-2'>{data?.location?.detailedLocation?.zone || "Ubicacion del proyecto"}</span></p>
            <SeparatorForms/>
            <h1>Area Total : <span className='font-bold'>{Number(data?.geographicalDetails?.totalArea?.frontage)*Number(data?.geographicalDetails?.totalArea?.depth)} mt2</span></h1>
        </div>
    </section>
  )
}