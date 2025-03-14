'use client'
import React from 'react'
import CarrouselImagesCard from './CarrouselImagesCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image'

export default function GridCardProjects({
    data=[]
}) {
  return (
    <div className='w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 py-4'>
        {
            data?.map((item, idx)=>
            <div
                key={idx}
                className='w-full rounded-lg bg-white p-2 shadow-md'
            >
                <div className='relative h-48 w-full'>
                    {
                        item?.images?.length > 1 ?
                        <CarrouselImagesCard
                            images={item?.images}
                        /> :
                        <div className='absolute w-full inset-0 h-full rounded-lg'>
                            <Image
                                src={item?.images[0]}
                                alt='Imagen de previsualización'
                                className='rounded-lg'
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>
                    }
                </div>
                <div className='p-4'>
                    <h1 className='font-bold text-naranja text-3xl'>${item?.price?.dolar} - ${item?.price?.soles} </h1>
                    <h1 className='font-bold text-lg'>{item?.name}</h1>
                    <p className='p-1 rounded-lg bg-naranja text-white  w-fit my-1 text-sm '>{item?.status}</p>
                    <p className='text-sm'>{item?.description}</p>
                    <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className=' ml-2'>{item?.location?.detailedLocation?.zone}</span></p>
                    <section className='border-t-[1px] border-t-gray-200 my-4 '></section>
                    <h1>Area Total : <span className='font-bold'>{Number(item?.geographicalDetails?.totalArea?.depth)*Number(item?.geographicalDetails?.totalArea?.frontage)} mt2</span></h1>
                </div>
            </div>)
        }
    </div>
  )
}
