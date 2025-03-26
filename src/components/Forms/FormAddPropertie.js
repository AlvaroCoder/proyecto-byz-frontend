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
import { useFetch } from '@/app/hooks/useHooks'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function FormAddPropertie({
    handleChangeStatusPropertie,
}) {
    const URL_STATUS=process.env.NEXT_PUBLIC_GET_STATUS_PROJECTS;
    const {data : dataStatusProject, error, loading : loadingDataStatusProject} = useFetch(URL_STATUS);

    const [dataNewProperties, setDataNewProperties] = useState({
        name : "",
        description : "",
        location : {
          detailedLocation : null,
          surroundings : []
        },
        geographicalDetails : {
          totalArea : {
            frontage : "",
            depth : "",
            units : "mt2"
          },
          coveredArea :  {
            frontage : "",
            depth : "",
            units : "mt2"
          }
        },
        features : {
          antiquity : null,
          floors : 0,
          rooms : 0,
          bathrooms : 0,
          garage : 0,
          waterService : false,
          lightService : false
        },
        images : [],
        status : 'Venta disponible',
        price : {
          soles : "",
          dolar : ""
        },
        reservedTime : (new Date()).toISOString(),
        creationTime : (new Date()).toISOString()
    });

    const handleChangeSaveNewProperty=(evt)=>{

    }
    const [dataGeographicalDetail, setDataGeographicalDetail] = useState({
        frontage : "",
        depth : '',
        units : 'm2'
    });

    const totalArea = Number(dataGeographicalDetail?.depth)*Number(dataGeographicalDetail.frontage);

    const [dataGeographicalCoveredDetail, setDataGeographicalCoveredDetail] = useState({
        frontage : "",
        depth : "",
        units : "mt2"
    });

    const totalAreaCovered = Number(dataGeographicalCoveredDetail?.depth)*Number(dataGeographicalCoveredDetail?.frontage);
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
    const handleChangeInput=(evt)=>{
        const target = evt.target;
        setDataNewProperties({
            ...dataNewProperties,
            [target.name] : target.value
        })
    }
    const handleChangePrice=(evt)=>{
        const target = evt.target;
        setDataNewProperties(prev=>({
            ...prev,
            price : {
                ...prev.price,
                [target.name] : target.value
            }
        }))
    }
    const hanldeChangeUploadImage=()=>{

    }
    const handleChangeMapLocation=(data)=>{
        setDataNewProperties(prev=>({
            ...prev,
            location : {
                ...prev.location,
                detailedLocation : data
            }
        }))
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
                            value={dataNewProperties?.name}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                    <div className='w-40 ml-2'>
                        <h1>Estado</h1>
                        <div>
                            {
                                loadingDataStatusProject ?
                                <Button
                                    variant="ghost"
                                    className="w-full shadow-sm border border-slate-100"
                                >
                                  <Loader2 className='animate-spin' />  
                                </Button>:
                                <ButtonDropdownStatus
                                    initialData={dataNewProperties?.status}
                                    data={dataStatusProject?.projects}
                                    handleChangeStatus={handleChangeStatusPropertie}
                                />
                            }   
                        </div>
                    </div>
                </div>
                <h1 className='mt-4'>Descripción de la propiedad <span className='text-red-500'>*</span></h1>
                <Textarea
                    name="description"
                    value={dataNewProperties?.description}
                    onChange={handleChangeInput}
                    required
                />

                <div className='mt-4'>
                    <h1>Imagenes de la Propiedad <span className='text-red-500'>*</span></h1>
                    <BoardCarrouselImages
                        dataImages={dataNewProperties}
                        handleChangeImages={hanldeChangeUploadImage}
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
                            value={dataNewProperties?.price?.soles}
                            onChange={handleChangePrice}
                        />
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Dólares ($) <span className='text-red-500'>*</span></h1>
                        <Input
                            type="number"
                            name="dolar"
                            placeholder="0.0"
                            value={dataNewProperties?.price?.dolar}
                            onChange={handleChangePrice}
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
                    handleChangeLocation={handleChangeMapLocation}
                />
                <SeparatorForms/>
                <Button
                    variant="ghost"
                    onClick={handleChangeSaveNewProperty}
                    className="bg-orange-400 hover:bg-orange-300 py-4 text-white hover:text-gris w-full"
                >
                    <p>Guardar Propiedad</p>
                </Button>
            </section>
        </section>
        <section className='p-4 rounded-lg'>
            <h1 className='font-bold text-2xl'>Previsualización</h1>
            <section className='w-full mt-4 rounded-lg bg-white p-2'>
                <div className='relative w-full h-48 rounded-lg'>
                    {
                        dataNewProperties?.images?.length > 0?
                        (
                            dataNewProperties?.images?.length > 1 ?
                            <CarrouselImagesCard
                                images={dataNewProperties?.images}
                                
                            />:
                            <div className='absolute inset-0 w-full h-full rounded-lg'>
                                <Image
                                    src={dataNewProperties?.images[0]?.preview}
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
                <div className='p-4'>
                    <h1 className='font-bold text-naranja text-4xl'>$ {dataNewProperties.price.dolar || "0.0"}</h1>
                    <h1 className='font-bold text-lg'>{dataNewProperties?.name || "Titulo del proyecto"}</h1>
                    <p className='p-1 rounded-lg bg-naranja text-white font-bold w-fit my-1 text-sm'>{dataNewProperties?.status}</p>
                    <p className='text-sm'>{dataNewProperties?.description || "La descripción debe indicar aspectos generales del proyecto. Información del precio, ubicación y área. Todo ello debe ser preciso."}</p>
                    <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className='ml-2'>{dataNewProperties?.location?.detailedLocation?.zone || "Ubicación de la propiedad"}</span></p>
                    <h1>Area Total : <span>{}</span></h1>
                </div>
            </section>
        </section>
    </section>
  )
}
