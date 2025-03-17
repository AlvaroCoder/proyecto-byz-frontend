import React from 'react'
import CarrouselImageCardWaitButton from './CarrouselImageCardWaitButton';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { SeparatorForms } from '../Commons';

import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import Crop32Icon from '@mui/icons-material/Crop32';
import GoogleMapCard from './GoogleMapCard';

export default function MainBannerCardProject({
    data={}
}) {
    console.log(data);
    const totalArea = data?.geographicalDetails?.totalArea;
    const areaTotal= Number(totalArea?.depth) * Number(totalArea?.frontage);
    const latitud = data?.location?.detailedLocation?.coordinates?.lat;
    const longitud = data?.location?.detailedLocation?.coordinates?.lng;

  return (
    <section className='w-full'>
        <div className='w-full min-h-[500px] grid grid-cols-1 lg:grid-cols-3'>
            <div className='lg:col-span-2 relative'>
                {
                    data?.images?.length > 1 ?
                    <CarrouselImageCardWaitButton
                        listImages={data?.images}
                    /> : 
                    <div className='absolute w-full inset-0 h-full'>
                        <Image
                            src={data?.images[0]}
                            alt='Imagen de previsulización del proyecto'
                            className=''
                            objectFit='cover'
                            layout='fill'
                        />
                    </div>
                }
            </div>
            <div className='hidden lg:block p-8 bg-gris text-white'>
                <h1 className='p-2 rounded-full bg-naranja text-white font-bold w-fit'>{data?.status}</h1>
                <h1 className='font-bold text-4xl mt-2'>{data?.name}</h1>
                <p className='mt-4 bg-white p-2 text-gris rounded-lg'>
                    {data?.description}
                </p>
                <SeparatorForms/>
                <h1 className='font-bold mb-2 '>Area disonible</h1>
                <div className='w-full flex flex-row'>
                    <div
                        className='flex flex-row items-center'
                    >
                        <Crop32Icon
                            sx={{width : "40px", height:"40px"}}
                        />
                        <div className='min-w-32 ml-2'>
                            <h1>Fondo</h1>
                            <p className='font-bold text-xl'>{data?.geographicalDetails?.totalArea?.depth} mt2</p>
                        </div>
                    </div>
                    <div
                        className='flex flex-row items-center'
                    >
                        <CropPortraitIcon
                            sx={{width : "40px", height:"40px"}}
                        />
                        <div className='min-w-32 ml-2'>
                            <h1>Frente</h1>
                            <p className='font-bold text-xl '>{data?.geographicalDetails?.totalArea?.frontage} mt2</p>
                        </div>
                    </div>
                </div>
                <h1 className='font-bold mt-4 '>Alrededores</h1>
                <ul className='ml-8 list-disc'>
                        {
                            data?.location?.surroundings?.map((item)=><li key={item} className='text-lg'>{item}</li>)
                        }
                </ul>
            </div>
        </div>
        <section className='w-full grid grid-cols-1 lg:grid-cols-2 border-b border-b-gray-200 shadow-sm'>
            <div className='flex-1 min-h-24 p-4 flex flex-row items-center justify-center lg:flex-col bg-gray-100'>
                <h1 className='text-lg mr-4 lg:mr-0'>Desde </h1>
                <h1 className='text-naranja text-3xl font-bold'>S/. {data?.price?.dolar} - $ {data?.price?.soles}</h1>
            </div>
            <div className='w-full  min-h-32 grid grid-cols-2 '>
                <div className='flex flex-row items-center'>
                    <div className='w-16 h-full flex justify-center items-center text-3xl'>
                        <LocationOnIcon 
                            sx={{ width : "60%", height : "60%" }}
                            className='text-3xl w-32 h-32'/>
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <h1 className='text-lg font-bold'>Ubicación</h1>
                        <h1 className='text-xl'>{data?.location?.detailedLocation?.zone}</h1>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <div className='w-16 h-full flex justify-center items-center '>
                        <CropFreeIcon
                            sx={{ width : "60%", height : "60%" }}
                        />
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <h1 className='font-bold text-lg'>Area total</h1>
                        <h1 className='text-xl'>{areaTotal} mt2</h1>
                    </div>
                </div>
            </div>
        </section>
        <section className='block lg:hidden p-8 bg-gris text-white'>
            <h1 className='p-2 rounded-full bg-naranja text-white font-bold w-fit'>{data?.status}</h1>
            <h1 className='font-bold text-4xl mt-2'>{data?.name}</h1>
            <p className='mt-4 '>
                {data?.description}
            </p>
            <SeparatorForms/>
            <h1 className='font-bold mb-2 '>Area disonible</h1>
            <div className='w-full flex flex-row'>
                <div
                    className='flex flex-row items-center'
                >
                    <Crop32Icon
                        sx={{width : "40px", height:"40px"}}
                    />
                    <div className='min-w-32 ml-2'>
                        <h1>Fondo</h1>
                        <p className='font-bold text-xl'>{data?.geographicalDetails?.totalArea?.depth} mt2</p>
                    </div>
                </div>
                <div
                    className='flex flex-row items-center'
                >
                    <CropPortraitIcon
                        sx={{width : "40px", height:"40px"}}
                    />
                    <div className='min-w-32 ml-2'>
                        <h1>Frente</h1>
                        <p className='font-bold text-xl '>{data?.geographicalDetails?.totalArea?.frontage} mt2</p>
                    </div>
                </div>
            </div>
            <h1 className='font-bold mt-4 '>Alrededores</h1>
            <ul className='ml-8 list-disc'>
                    {
                        data?.location?.surroundings?.map((item)=><li className='text-lg'>{item}</li>)
                    }
            </ul>
        </section>
        <section>
            <h1>Ubicación</h1>
            <div className='w-full h-64'>
                <GoogleMapCard
                    lat={latitud}
                    lng={longitud}
                />
            </div>
        </section>
    </section>
  )
};