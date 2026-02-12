'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useRef, useState } from 'react'
import BoardCarrouselImages from './BoardCarrouselImages';
import { SeparatorForms } from '@/components/Commons';
import AddIcon from '@mui/icons-material/Add';
import {  MapPickerCardv2 } from '@/components/Cards';
import TableSurroundings from '../TableSurroundings';

export default function FormularioEditProject({
    data,
    handleSaveNewData,
    handleChangeLocation,
    handleChangeImage,
    handleChangeInput,
    handleChangeInputGeographiCalDetails,
    handleChangeInputPrice,
    handleAddDataSurroundings,
    handleDeleteDataSurroundings
}) {    
    const refInputSurroundings = useRef(null);
    const handleAddSurrounding=()=>{
        handleAddDataSurroundings(refInputSurroundings.current.value);
        refInputSurroundings.current.value=null;
    }
    
  return (
    <div className='flex flex-col '>
        <h1 className='font-bold text-2xl'>Información del proyecto</h1>
        <div className='flex flex-row items-center'>
            <div className='flex-1'>
                <h1>Nombre del proyecto</h1>
                <Input
                    name="name"
                    value={data?.name}
                    onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
                    onChange={handleChangeInputGeographiCalDetails}
                />
            </div>
            <div className='flex-1 ml-2'>
                <h1>Fondo</h1>
                <Input
                    name="depth"
                    placeholder="00"
                    value={data?.geographicalDetails?.totalArea?.depth}
                    type="number"
                    onChange={handleChangeInputGeographiCalDetails}
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
                    onChange={handleChangeInputPrice}
                />
            </div>
            <div className='flex-1 ml-2'>
                <h1>Dólares ($)</h1>
                <Input
                    type="number"
                    name="dolar"
                    placeholder="0.0"
                    value={data?.price?.dolar}
                    onChange={handleChangeInputPrice}
                />
            </div>
        </div>
        <SeparatorForms/>
        <h1 className='font-bold text-xl'>Información de la ubicación</h1>
        <h1 className='mt-4'>Lugares de referencia</h1>
        <p className='text-sm'>Lugares de referencia ayudan a ubicarse mejor al cliente final</p>
        <div className='mt-4 flex flex-row items-center'>
            <Input
                placeholder="Indicar a que lugares esta cerca ..."
                ref={refInputSurroundings}
            />
            <Button
                className="flex flex-row items-center ml-2 border border-gray-200 shadow-sm"
                variant="ghost"
                onClick={handleAddSurrounding}
            >
                <AddIcon/>
                <span>Agregar</span>
            </Button>
        </div>
        {
            data?.location?.surroundings?.length > 0 &&
            <TableSurroundings
                data={data?.location?.surroundings}
                handleClickDeleteSurrounding={handleDeleteDataSurroundings}
            />
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