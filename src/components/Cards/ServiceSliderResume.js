import Image from 'next/image';
import React from 'react'

export default function ServiceSliderResume({data}) {
    const {title, image, linkName} = data;

    return (
    <div className='flex flex-col justify-center items-center h-[420px] py-8 px-4  border border-gris rounded-lg '>
        <Image
            width={300}
            height={600}
            src={image}
            alt='Imagen de Fondo'
        />
        <a 
            target='_blank'
            href={linkName}
            className='underline mt-8'
        >
            <p>{title}</p>
        </a>
    </div>
    )
}
