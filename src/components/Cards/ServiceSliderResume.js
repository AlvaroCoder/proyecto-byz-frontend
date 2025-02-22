import Image from 'next/image';
import React from 'react'

export default function ServiceSliderResume({data}) {
    const {title, image, linkName, description} = data;

    return (
    <div className='flex flex-col justify-center items-center h-[420px] py-8 px-4  border border-gris  bg-white shadow-sm'>
        <Image
            width={300}
            height={600}
            src={image}
            alt='Imagen de Fondo'
        />
        <a 
            target='_blank'
            href={linkName}
            className='mt-8'
        >
            <p className='text-xl font-bold w-48 text-center'>{title}</p>
        </a>
        <p className='w-48 text-center text-sm'>{description}</p>
    </div>
    )
}
