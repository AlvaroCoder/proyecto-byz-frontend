import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react'
import BoardCarrouselImages from './BoardCarrouselImages';
import { SeparatorForms } from '@/components/Commons';
import AddIcon from '@mui/icons-material/Add';
import {  MapPickerCardv2 } from '@/components/Cards';


export default function FormularioEditProject({
    data,
    handleSaveNewData,
    handleChangeLocation,
    handleChangeImage
}) {    
  return (
    <div className='flex flex-col '>
        <h1 className='font-bold text-2xl'>Información del proyecto</h1>
        <div className='flex flex-row items-center'>
            <div className='flex-1'>
                <h1>Nombre del proyecto</h1>
                <Input
                    name="name"
                    value={data?.name}
                />
            </div>
            <div className='w-40 ml-2'>
                <h1>Estado</h1>
                <Button
                    className="shadow-sm border border-gray-200"
                    variant="ghost"
                >
                    {data?.status}
                </Button>
            </div>
        </div>
        <h1 className='mt-4'>Descripción de proyecto</h1>
        <Textarea
            name="description"
            value={data?.description}
        />
        <div className='mt-4'>
            <h1>Imagenes del proyecto</h1>
            <BoardCarrouselImages
                dataImages={data || []}
                handleChangeImages={handleChangeImage}
                version='v2'
            />
        </div>
        <SeparatorForms/>
        <h1 className='font-bold text-2xl'>Información de área</h1>
        <div className='flex flex-row mt-4'>
            <div className='flex-1'>
                <h1>Frente</h1>
                <Input
                    name='frontage'
                    value={data?.geographicalDetails?.totalArea?.frontage}
                    type="number"
                    placeholder="00"
                />
            </div>
            <div className='flex-1 ml-2'>
                <h1>Fondo</h1>
                <Input
                    name="depth"
                    placeholder="00"
                    value={data?.geographicalDetails?.totalArea?.depth}
                    type="number"
                />
            </div>
            <div className='min-w-40 ml-4'>
                <h1>Area Total</h1>
                <p className='mt-2'>{Number(data?.geographicalDetails?.totalArea?.frontage)*Number(data?.geographicalDetails?.totalArea?.depth)} <span>Mt2</span></p>
            </div>
        </div>
        <SeparatorForms/>
        <h1 className='font-bold text-xl'>Información del Precio</h1>
        <div className='flex flex-row mt-4'>
            <div className='flex-1'>
                <h1>Soles (S/.) </h1>
                <Input
                    name="soles"
                    type="number"
                    placeholder="0.0"
                    value={data?.price?.soles}
                />
            </div>
            <div className='flex-1 ml-2'>
                <h1>Dólares ($)</h1>
                <Input
                    type="number"
                    name="dolar"
                    placeholder="0.0"
                    value={data?.price?.dolar}
                />
            </div>
        </div>
        <SeparatorForms/>
        <h1 className='font-bold text-xl'>Inforación de la ubicación</h1>
        <h1 className='mt-4'>Lugares de referencia</h1>
        <p className='text-sm'>Lugares de referencia ayudan a ubicarse mejor al cliente final</p>
        <div className='mt-4 flex flex-row items-center'>
            <Input
                placeholder="Indicar a que lugares esta cerca ..."

            />
            <Button
                className="flex flex-row items-center ml-2 border border-gray-200 shadow-sm"
                variant="ghost"
            >
                <AddIcon/>
                <span>Agregar</span>
            </Button>
        </div>
        {
            data?.location?.surroundings?.length > 0 &&
            <div className='mt-4 p-2 bg-gray-100 rounded-md text-sm'>
                <h1 className='font-bold text-lg'>Alrededores</h1>
                <ul className='list-disc pl-4'>
                    {
                        data?.location?.surroundings?.map((item, idx)=><li key={idx}>{item}</li>)
                    }
                </ul>
            </div>
        }
        <MapPickerCardv2
            handleChangeLocation={handleChangeLocation}
            lat={data?.location?.detailedLocation?.coordinates?.lat}
            lng={data?.location?.detailedLocation?.coordinates?.lng}
        />
        <SeparatorForms/>
        <Button
            variant="ghost"
            onClick={()=>handleSaveNewData(data)}
            className="bg-orange-400 hover:bg-orange-300 py-4 text-white hover:text-gris w-full"
        >
            <p>Guardar Cambios</p>
        </Button>
    </div>
  )
}