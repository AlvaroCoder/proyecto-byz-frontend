import React from 'react'
import CarrouselImagesCard from './CarrouselImagesCard'
import Image from 'next/image'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShowerIcon from '@mui/icons-material/Shower';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GarageIcon from '@mui/icons-material/Garage';
import { SeparatorForms } from '../Commons';

export default function CardPropertySimple({
    data={},
    handleClickEdit
}) {
    console.log(data);
    
  return (
    <div
        className='w-full rounded-lg bg-white p-2'
    >
        <div className='relative h-48 w-full'>
            {
                data?.images?.length > 0 ?
                (
                    data?.images?.length > 1 ?
                <CarrouselImagesCard
                    images={data?.images}
                /> :
                <div className='absolute h-full inset-0 w-full rounded-lg'>
                    <Image
                        src={data?.images[0]}
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
            <h1 className='font-bold text-naranja text-3xl'>${data?.price?.dolar || "0.0"} - S/.{data?.price?.soles || "0.0"}</h1>
            <h1 className='font-bold text-lg hover:underline cursor-pointer' onClick={()=>handleClickEdit(data)}>{data?.name || "Titulo del proyecto"}</h1>
            <p className='p-1 rounded-lg bg-naranja text-white w-fit my-1 text-sm'>{data?.status}</p>
            <p className='text-sm'>{data?.description || "La descripción debe indicar aspectos generales del proyecto. Información del precio, ubicación y área. Todo ello debe ser preciso."}</p>
            <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className='ml-2'>{data?.location?.detailedLocation?.zone || "Ubicacion de la propiedad"}</span></p>
            <SeparatorForms/>
            <section className='w-full grid grid-cols-2 gap-4'>
                <h1><span><RoomServiceIcon/></span> Cuartos : {data?.features?.rooms}</h1>
                <h1><span><ApartmentIcon/></span> Pisos : {data?.features?.floors}</h1>
            </section>
            <section className='w-full grid grid-cols-2 gap-4'>
                <h1><span><ShowerIcon/></span> Baños : {data?.features?.bathrooms}</h1>
                <h1><span><GarageIcon/></span> Garage : {data?.features?.garage}</h1>
            </section>
            <SeparatorForms/>
            <h1>Area Total : <span className='font-bold'>{Number(data?.geographicalDetails?.totalArea?.depth) * Number(data?.geographicalDetails?.totalArea?.frontage)} mt2</span></h1>
            <h1>Area cubierta : <span className='font-bold'>{Number(data?.geographicalDetails?.coveredArea?.depth) * Number(data?.geographicalDetails?.coveredArea?.frontage)} mt2</span></h1>
        </div>
    </div>
  )
};