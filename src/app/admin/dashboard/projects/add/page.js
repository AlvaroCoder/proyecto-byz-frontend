'use client'
import { MapPickerCard } from '@/components/Cards';
import { BoardCarrouselImages } from '@/components/Tables/elements';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@/components/ui/button';
export default function Page() {
 
  const [dataNewProject, setDataNewProject] = useState({
    name : "",
    description : "",
    location : null,
    geographicalDetails : null,
    images : [],
    status : "",
    price : null,
    reservedTime : "",
    creationTime : ""
  });
  const [dataGeographicalDetail, setDataGeographicalDetail] = useState({
    frontage : "",
    depth : '',
    unit : 'm2'
  });
  const [dataPriceInformation, setDataPriceInformation] = useState({
    soles : "",
    dolar : ""
  })
  const totalArea = Number(dataGeographicalDetail?.depth)*Number(dataGeographicalDetail.frontage);
  const handleChange=(evt)=>{
    const target = evt.target;
    setDataNewProject({
      ...dataNewProject,
      [target.name] : target.value
    });
  };
  const handleChangeGeographicalDetail = (evt)=>{
    const target = evt.target;
    setDataGeographicalDetail({
      ...dataGeographicalDetail,
      [target.name] : target.value
    })
  };
  const handleChangePrice=(evt)=>{
    const target=evt.target;
    setDataPriceInformation({
      ...dataPriceInformation,
      [target.name] : target.value
    });
  };

  return (
    <section className='w-full min-h-24 overflow-y-auto p-8'>
      
      <section className='w-full grid grid-cols-3 gap-8 '>
        <section className='col-span-2 p-4 rounded-lg '>
          <h1 className='font-bold text-2xl'>Nuevo proyecto</h1>
          <section className='w-full bg-white min-h-24 mt-4 rounded-lg p-4'>
            <h1 className='font-bold text-xl mb-4'>Información del Proyecto</h1>
            <h1 className=''>Nombre del proyecto <span className='text-red-500'>*</span></h1>
            <Input
              name="name"
              value={dataNewProject?.name}
              onChange={handleChange}
              required
            />

            <h1 className='mt-4 '>Descripcion del Proyecto <span className='text-red-500'>*</span></h1>
            <Textarea
              name="description"
              value={dataNewProject?.description}
              onChange={handleChange}
              required
            />
            <div className='mt-4 '>
              <h1>Imagenes del proyecto <span className='text-red-500'>*</span></h1>
              <BoardCarrouselImages
                dataImages={dataNewProject}
                handleChangeImages={setDataNewProject}
              />
            </div>
            <section className='border-t-[1px] border-t-gray-200 my-4'></section>
            <h1 className='font-bold text-xl'>Información de área</h1>
            <div className='flex flex-row mt-4'>
              <div className='flex-1 '>
                <h1>Frente <span className='text-red-500'>*</span></h1>
                <Input
                  name="frontage"
                  onChange={handleChangeGeographicalDetail}
                  value={dataGeographicalDetail?.frontage}
                  placeholder="00"
                  type="number"
                  required
                />
              </div>
              <div className='flex-1 ml-2'>
                <h1>Fondo <span className='text-red-500'>*</span></h1>
                <Input
                  name="depth"
                  onChange={handleChangeGeographicalDetail}
                  placeholder="00"
                  value={dataGeographicalDetail?.depth}
                  type="number"
                  required
                />
              </div>
              <div className='min-w-40 ml-4'>
                <h1>Area Total</h1>
                <p className='mt-2'>{Number(dataGeographicalDetail?.depth)*Number(dataGeographicalDetail.frontage)} <span>Mt2</span></p>
              </div>              
            </div>
            <section className='border-t-[1px] border-t-gray-200 my-4'></section>
            <h1 className='font-bold text-xl'>Información de Precio</h1>
            <div className='flex flex-row mt-4'>
              <div className='flex-1'>
                <h1>Soles (S/.)<span className='text-red-500'>*</span></h1>
                <Input
                  type="number"
                  name="soles"
                  placeholder="0.0"
                  value={dataPriceInformation?.soles}
                  onChange={handleChangePrice}
                />
              </div>
              <div className='flex-1 ml-2'>
                <h1>Dólares ($)<span className='text-red-500'>*</span></h1>
                <Input
                  type="number"
                  name="dolar"
                  placeholder="0.0"
                  value={dataPriceInformation?.dolar}
                  onChange={handleChangePrice}
                />
              </div>
            </div>
            <section className='border-t-[1px] border-t-gray-200 my-4'></section>
            <h1 className='font-bold text-xl'>Información de la ubicación</h1>
            <MapPickerCard/>
            <section className='border-t-[1px] border-t-gray-200 my-4'></section>
            <Button
              variant="ghost"
              className="bg-orange-400 hover:bg-orange-300 text-white hover:text-gris w-full"
            >
              <p>Guardar Proyecto</p>
            </Button>
          </section>
          
        </section>
        <section className='p-4 rounded-lg '>
          <h1 className='font-bold text-2xl'>Previsualización</h1>
          <section className='w-full mt-4 rounded-lg bg-white p-2'>
            <div className=' w-full h-48 rounded-lg'>
              {
                dataNewProject?.images.length > 0?
                <div></div> : 
                <div className='bg-gray-200 w-full h-full flex justify-center items-center rounded-lg'>
                  <h1 className='text-gris'>Imagen de referencia</h1>
                </div>
              }
            </div>
            <div className='p-4'>
              <h1 className='font-bold text-naranja text-2xl'>$ {dataPriceInformation?.dolar || "0.0"}</h1>
              <h1 className='font-bold text-lg'>{dataNewProject?.name || "Titulo del proyecto"}</h1>
              <p className='text-sm'>{dataNewProject?.description || "Esta descripción indica aspectos generales del proyecto, de acuerdo al precio, ubicación y área. Es importante que sea precisa."}</p>
              <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className=' ml-2'>Ubicaion, asdas</span></p>
              <section className='border-t-[1px] border-t-gray-200 my-4 '></section>
              <h1>Area Total : <span className='font-bold'>{totalArea} mt2</span></h1>
            </div>

          </section>
        </section>
      </section>
    </section>
  )
}
