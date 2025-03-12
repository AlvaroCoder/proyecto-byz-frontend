'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ButtonCounter, ButtonDropdownStatus } from '../Buttons'
import { Loader2 } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { BoardCarrouselImages } from '../Tables/elements'
import { CarrouselImagesCard, MapPickerCard } from '../Cards';
import Image from 'next/image'

import AddIcon from '@mui/icons-material/Add';
import ShowerIcon from '@mui/icons-material/Shower';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GarageIcon from '@mui/icons-material/Garage';
import { Switch } from '../ui/switch'
import { SeparatorForms } from '../Commons'

export default function FormAddPropertie({
    initialData={},
    handleChange,
    setDataNewPropertie,
    loadingDataStatusPropertie=false,
    dataStatusPropertie,
    handleChangeStatusPropertie,
    handleChangePrice,
    handleChangeLocation
}) {
    const [dataGeographicalDetail, setDataGeographicalDetail] = useState({
        frontage : "",
        depth : '',
        units : 'm2'
    });
    const [dataGeographicalCoveredDetail, setDataGeographicalCoveredDetail] = useState({
        frontage : "",
        depth : "",
        units : "mt2"
    });
    const [dataAntiquityTimes, setDataAntiquityTimes] = useState([
        {value : "Meses"},
        {value : "Años"}
    ])
    const handleChangeGeographicalDetail=(evt)=>{
        const target = evt.target;
        setDataGeographicalDetail({
            ...dataGeographicalDetail,
            [target.name] : target.value
        });
    }
    const handleChangeGrographicalDetailCovered=(evt)=>{

    }

  return (
    <section className='w-full grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <section className='lg:col-span-2 p-4 rounded-lg'>
            <h1 className='font-bold text-2xl'>Nueva Propiedad</h1>
            <section className='w-full bg-white min-h-24 mt-4 rounded-lg p-4'>
                <h1 className='font-bold text-xl mb-4'>Información del Proyecto</h1>
                <div className='flex flex-row items-center'>
                    <div className='flex-1'>
                        <h1>Nombre del proyecto <span className='text-red-500'>*</span></h1>
                        <Input
                            name="name"
                            value={initialData?.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='w-40 ml-2'>
                        <h1>Estado</h1>
                        <div>
                            {
                                loadingDataStatusPropertie ?
                                <Button
                                    variant="ghost"
                                    className="w-full shadow-sm border border-slate-100"
                                >
                                  <Loader2 className='animate-spin' />  
                                </Button>:
                                <ButtonDropdownStatus
                                    initialData={initialData?.status}
                                    data={dataStatusPropertie?.projects}
                                    handleChangeStatus={handleChangeStatusPropertie}
                                />
                            }   
                        </div>
                    </div>
                </div>
                <h1 className='mt-4'>Descripción de la propiedad <span className='text-red-500'>*</span></h1>
                <Textarea
                    name="description"
                    value={dataStatusPropertie?.description}
                    onChange={handleChange}
                    required
                />

                <div className='mt-4'>
                    <h1>Imagenes de la Propiedad <span className='text-red-500'>*</span></h1>
                    <BoardCarrouselImages
                        dataImages={initialData}
                        handleChangeImages={setDataNewPropertie}
                    />
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl '>Información de área</h1>
                <h1 className='mt-4 font-bold'>Area Total</h1>
                <div className='flex flex-row'>
                    <div className='flex-1'>
                        <h1>Frente <span className='text-red-500'>*</span></h1>
                        <Input
                            name="frontage"
                            value={dataGeographicalDetail?.frontage}
                            onChange={handleChangeGeographicalDetail}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Fondo <span className='text-red-500'>*</span></h1>
                        <Input
                            name="depth"
                            value={dataGeographicalDetail?.depth}
                            onChange={handleChangeGeographicalDetail}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                </div>
                <h1 className='mt-4 font-bold'>Área cubierta</h1>
                <div className='flex flex-row'>
                    <div className='flex-1'>
                        <h1>Frente <span className='text-red-500'>*</span></h1>
                        <Input
                            name="frontage"
                            value={dataGeographicalCoveredDetail?.frontage}
                            onChange={handleChangeGrographicalDetailCovered}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Fondo <span className='text-red-500'>*</span></h1>
                        <Input
                            name="depth"
                            value={dataGeographicalCoveredDetail?.depth}
                            onChange={handleChangeGrographicalDetailCovered}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl'>Características generales</h1>
                <section className='w-full grid grid-cols-2 gap-4'>
                    <div className=''>
                        <div className='flex flex-1 items-center justify-between'>
                            <h1><RoomServiceIcon/> Cuartos</h1>
                            <ButtonCounter/>
                        </div>   
                        <div className='flex flex-1 items-center justify-between mt-4'>
                            <h1><ApartmentIcon/> Pisos</h1>
                            <ButtonCounter/>
                        </div> 
                        <section className='mt-4'>
                        <h1>Antiguedad</h1>
                        <div className='flex flex-row'>
                            <Input
                                type="number"
                                placeholder="Ingresa la cantidad"
                            />
                            <ButtonDropdownStatus
                                initialData='Meses'
                                data={dataAntiquityTimes}
                                className='w-32 ml-2'
                            />
                        </div>
                        </section>
                    </div>
                    <div>
                        <div className='flex flex-1 items-center justify-between'>
                            <h1><ShowerIcon/> Baños</h1>
                            <ButtonCounter/>
                        </div>
                        <div className='flex flex-1 items-center justify-between mt-4'>
                            <h1><GarageIcon/> Garage</h1>
                            <ButtonCounter/>
                        </div>
                    </div>
                </section>
                <SeparatorForms/>
                <h1 className='font-bold text-lg'>Características adicionales</h1>
                <div className='w-full grid grid-cols-2 gap-4 mt-4'>
                    <div className='flex flex-row justify-between'>
                        <h1>Servicio de agua</h1>
                        <Switch/>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <h1>Servicio de luz</h1>
                        <Switch/>
                    </div>
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl mt-4'>Información del Precio</h1>
                <div className='flex flex-row mt-4 '>
                    <div className='flex-1'>
                        <h1>Soles (S/.) <span className='text-red-500'>*</span></h1>
                        <Input
                            type="number"
                            name="soles"
                            placeholder="0.0"
                            value={initialData?.price?.soles}
                            onChange={handleChangePrice}
                        />
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Dólares ($) <span className='text-red-500'>*</span></h1>
                        <Input
                            type="number"
                            name="dolar"
                            placeholder="0.0"
                            value={initialData?.price?.dolar}
                        />
                    </div>
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl'>Información de la ubicación</h1>
                <h1 className='mt-4 font-bold'>Lugares de referencias <span className='text-red-500'>*</span></h1>
                <p>La información de la ubicación es referencial. No debe ser específico con la dirección</p>
                <div className='mt-4 flex flex-row items-center'>
                    <Input
                        placeholder="Indica a que lugares esta cerca ... "
                    />
                    <Button
                        className="flex flex-row items-center ml-2"
                        variant="ghost"
                    >
                        <AddIcon/>
                        <span className=''>Agregar</span>
                    </Button>
                </div>
                <MapPickerCard
                    handleChangeLocation={handleChangeLocation}
                />
            </section>
        </section>
        <section className='p-4 rounded-lg'>
            <h1 className='font-bold text-2xl'>Previsualización</h1>
            <section className='w-full mt-4 rounded-lg bg-white p-2'>
                <div className='relative w-full h-48 rounded-lg'>
                    {
                        initialData?.images?.length > 0?
                        (
                            initialData?.images?.length > 1 ?
                            <CarrouselImagesCard
                                images={initialData?.images}
                                
                            />:
                            <div className='absolute inset-0 w-full h-full rounded-lg'>
                                <Image
                                    src={initialData?.images[0]?.preview}
                                    alt='Imagen de previsualización'
                                    className='rounded-lg'
                                    objectFit='cover'
                                    layout='fill'
                                />
                            </div>
                        ):
                        <div className='bg-gray-200 w-full h-full flex justify-center items-center rounded-lg'>
                            <h1 className='text-gris'>Sube una imagen</h1>
                        </div>
                    }
                </div>
            </section>
        </section>
    </section>
  )
}
