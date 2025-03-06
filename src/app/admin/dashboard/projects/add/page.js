'use client'
import { CarrouselImagesCard, MapPickerCard } from '@/components/Cards';
import { BoardCarrouselImages } from '@/components/Tables/elements';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { LoadingWindowProject } from '@/components/Loading';
export default function Page() {
  const [loadingDataSave, setLoadingDataSave] = useState(false);

  const [dataNewProject, setDataNewProject] = useState({
    name : "",
    description : "",
    location : {
      detailedLocation : null,
      surroundings : []
    },
    geographicalDetails : null,
    images : [],
    status : "available for sale",
    price : {
      soles : "",
      dolar : ""
    },
    reservedTime : (new Date()).toISOString(),
    creationTime : (new Date()).toISOString()
  });
  const [errorInput, setErrorInput] = useState(null);

  const [dataGeographicalDetail, setDataGeographicalDetail] = useState({
    frontage : "",
    depth : '',
    unit : 'm2'
  });
  const [dataPriceInformation, setDataPriceInformation] = useState({
    soles : "",
    dolar : ""
  });
  const inputSurroundingsRef = useRef(null);
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
    setDataNewProject(prev=>({
      ...prev,
      price : {
        ...prev.price,
        [target.name] : target.value
      }
    }))
  };
  const handleChangeLocation=(data)=>{
    setDataNewProject(prev=>({
      ...prev,
      location : {
        ...prev.location,
        detailedLocation : data
      }
    }))
  };
  const handleClickAddSurrounding=()=>{
    setDataNewProject(prev=>({
      ...prev,
      location : {
        ...prev.location,
        surroundings : [...prev.location?.surroundings, inputSurroundingsRef?.current?.value]
      }
    }));
  
  }
  const handleClickSaveNewProject=(evt)=>{
    console.log(dataNewProject);
    
    
    
  }
  return (
    <section className='w-full min-h-24 overflow-y-auto p-8'>
      <LoadingWindowProject
        loading={loadingDataSave}
      />
      <section className='w-full grid grid-cols-1 lg:grid-cols-3 gap-8 '>
        <section className='lg:col-span-2 p-4 rounded-lg '>
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
                  value={dataNewProject?.price?.soles}
                  onChange={handleChangePrice}
                />
              </div>
              <div className='flex-1 ml-2'>
                <h1>Dólares ($)<span className='text-red-500'>*</span></h1>
                <Input
                  type="number"
                  name="dolar"
                  placeholder="0.0"
                  value={dataNewProject?.price.dolar}
                  onChange={handleChangePrice}
                />
              </div>
            </div>
            <section className='border-t-[1px] border-t-gray-200 my-4'></section>
            <h1 className='font-bold text-xl'>Información de la ubicación</h1>
            <h1 className='mt-4'>
              Lugares de referencias <span className='text-red-500'>*</span>
            </h1>
            <p className='text-sm'>Es importante brindar esta información al cliente, para que pueda ubicarse mejor.</p>
            <div className='mt-4 flex flex-row items-center'>
              <Input
                placeholder="Indica a que lugares esta cerca ... "
                ref={inputSurroundingsRef}
              />
              <Button
                className="flex flex-row items-center ml-2"
                variant="ghost"
                onClick={handleClickAddSurrounding}
              >
                <AddIcon/>
                <span className=''>Agregar</span>
              </Button>
            </div>
            {
              dataNewProject?.location?.surroundings?.length > 0 && 
              <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm">
                <h1 className='font-bold text-lg'>Alrededores</h1>
                <ul className='list-disc pl-4'>
                  {
                    dataNewProject?.location?.surroundings.map((item, idx)=><li key={idx}>{item}</li>)
                  }
                </ul>
              </div>
            }
            <MapPickerCard
              handleChangeLocation={handleChangeLocation}
            />

            <section className='border-t-[1px] border-t-gray-200 my-4'></section>
            <Button
              onClick={handleClickSaveNewProject}
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
            <div className='relative w-full h-48 rounded-lg'>
              {
                dataNewProject?.images.length > 0?
                (dataNewProject?.images.length > 1 ? 
                  <CarrouselImagesCard
                    images={dataNewProject?.images}
                  />:
                 <div className='absolute inset-0 w-full h-full rounded-lg'>
                  <Image
                    src={dataNewProject?.images[0]?.preview}
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
              <h1 className='font-bold text-naranja text-2xl'>$ {dataNewProject?.price.dolar|| "0.0"}</h1>
              <h1 className='font-bold text-lg'>{dataNewProject?.name || "Titulo del proyecto"}</h1>
              <p className='text-sm'>{dataNewProject?.description || "Esta descripción indica aspectos generales del proyecto, de acuerdo al precio, ubicación y área. Es importante que sea precisa."}</p>
              <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className=' ml-2'>{dataNewProject?.location?.detailedLocation?.zone || "Ubicacion del proyecto"}</span></p>
              <section className='border-t-[1px] border-t-gray-200 my-4 '></section>
              <h1>Area Total : <span className='font-bold'>{totalArea} mt2</span></h1>
            </div>

          </section>
        </section>
      </section>
    </section>
  )
}
