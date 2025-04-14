'use client';
import React from 'react'
import CarrouselImagesCard from './CarrouselImagesCard'
import Image from 'next/image'
import LocationOnIcon from '@mui/icons-material/LocationOn';

import ShowerIcon from '@mui/icons-material/Shower';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GarageIcon from '@mui/icons-material/Garage';
import Crop54Icon from '@mui/icons-material/Crop54';
import { useFetch } from '@/app/hooks/useHooks';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

export default function CardPropertyHoriz({
    id,
    name,
    description,
    location, 
    coordinates,
    surroundings,
    geographicalDetails,
    features,
    images,
    status,
    price,
    id_user,
    reservedTime,
    creationTime
}) {
    const URL_GET_USER_PHOTO_PROFILE = process.env.NEXT_PUBLIC_GET_USERS+"/"+id_user;

    const {data : dataResponseUser, loading : loadingDataUser, error : errorDataUser} = useFetch(URL_GET_USER_PHOTO_PROFILE);
    
  return (
    <div className='shadow-md p-4 min-h-64 w-full grid grid-cols-3'>
        <section className='relative w-[400px] h-full rounded-lg' >
            {
                images?.length > 0 &&
                (images?.length > 1 ?
                    <CarrouselImagesCard
                        images={images}
                        className={"h-60"}
                    /> : 
                    <div className='absolute inset-0 w-full h-full rounded-lg'>
                        <Image
                            src={images[0]}
                            alt='Imagen de previsualizacion'
                            className='rounded-lg'
                            objectFit='cover'
                            layout='fill'  
                        />
                    </div>
                )
            }
        </section>
        <section className='col-span-2 flex flex-row gap-2 relative'>
            <div className='flex-1'>
                <h1 className='text-naranja text-2xl'>S/.{price?.soles} - ${price?.dolar}</h1>
                <Link
                    href={{
                        pathname : `/corretaje/${id}`
                    }}
                >
                    <h1 className='font-bold text-xl cursor-pointer hover:underline'>{name}</h1>
                </Link>
                <p className='p-1 bg-naranja text-sm text-white w-fit my-2 rounded-lg'>{status}</p>
                <p>{description}</p>
                <p className='text-gray-500 text-sm flex flex-row items-center'><LocationOnIcon/><span className='ml-2 capitalize'> {location?.detailedLocation?.zone}</span></p>

            </div>
            <div className='flex-1'>
                <section className='w-full grid grid-cols-2 gap-4 my-2'>
                    <h1><b><RoomServiceIcon/> Cuartos :</b>  {features?.rooms}</h1>
                    <h1><b><ApartmentIcon/> Pisos :</b>  {features?.floors}</h1>
                </section>
                <section className='w-full grid grid-cols-2 gap-4 my-2'>
                    <h1><b><ShowerIcon/> Baños :</b> {features?.bathrooms}</h1>
                    <h1><b><GarageIcon/> Garage :</b>  {features?.garage}</h1>
                </section>
                <section className='w-full grid grid-cols-2 gap-4 my-2'>
                    <h1 className=''><b><Crop54Icon/> Area Total : </b> {Number(geographicalDetails?.totalArea?.frontage) * Number(geographicalDetails?.totalArea?.depth)} mt2</h1>
                    <h1 className=''><b><Crop54Icon/> Area Cubierta : </b> {Number(geographicalDetails?.coveredArea?.frontage) * Number(geographicalDetails?.coveredArea?.depth)} mt2</h1>
                </section>
                <section>
                    <h1>Servicio de agua : </h1>
                </section>
            </div>
            <div className='absolute right-0 w-16 h-1w-16 bottom-0 rounded-full'>
                {
                    loadingDataUser ?
                    <Skeleton className={"w-20 h-20 rounded-full"}/> :
                    <Image
                        src={dataResponseUser?.photo}
                        
                        alt='Foto perfil'
                        className=' inset-0'
                        width={60}
                        height={60}
                        objectFit='cover'
                        />
                }
            </div>
        </section>
    </div>
  )
}