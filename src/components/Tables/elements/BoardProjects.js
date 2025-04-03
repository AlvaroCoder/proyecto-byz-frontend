'use client'
import { CarrouselImagesCard } from '@/components/Cards'
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import FormularioEditProject from './FormularioEditProject';
import { X } from 'lucide-react';
import { UPDATE_DATA_PROJECT, UPLOAD_IMAGE } from '@/lib/apiConnections';
import { SeparatorForms } from '@/components/Commons';

function DialogProjectEdit({
  data,
  isOpen=false,
  handleChangeOpen,
  handleSaveNewData,
  handleChangeImage
}) {
  
  return(
    <aside className="relative">
      {/* Fondo opaco */}
      {isOpen && (
        <div
          className="z-20 fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleChangeOpen}
        />
      )}

      {/* Ventana lateral */}
      <div
        className={`z-20 fixed top-0 right-0 max-h-screen overflow-y-auto w-[600px] lg:w-1/2  bg-white shadow-lg p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Botón para cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={handleChangeOpen}
        >
          <X/>
        </button>

        <h2 className="text-3xl font-bold mb-4">Editar Proyecto</h2>
        <FormularioEditProject
          handleSaveNewData={handleSaveNewData}
          handleChangeImage={handleChangeImage}
          data={data}
        />
      </div>
    </aside>
  )
}

export default function BoardProjects({
  data=[],
  handleChangeLoading,
  
}) {
  
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const handleClickEdit=(item)=>{
    setDataEdit(item)    
    setIsOpenFormEdit(true);
  }
  const handleSaveNewData=async(dataEditProject)=>{
    // Validar si existe un cambio en el atributo de imagenes
    handleChangeLoading();
    let newDataToSave = dataEditProject;
    
    if (dataEditProject?.images !== data?.filter((item)=>item?.id === dataEditProject?.id)[0]?.images) {
      
      const urlImages = await Promise.all(
        dataEditProject?.images?.map(async(item)=>{
          try {
            if (typeof(item) === 'object') {
              const formData = new FormData();
              formData.append("image", item?.file);
  
              const url_images = await UPLOAD_IMAGE(formData);
              if (!url_images.ok) {
                console.log(await url_images.json());
                alert("Surgio un error al subir las imágenes");
                handleChangeLoading();
                return;
              }
              return (await url_images.json())?.url;
            }
          } catch (error) {
            console.error(error);
          }
        })

      );
      newDataToSave = {
        ...dataEditProject,
        images : urlImages
      }
      
    }    
    
    try {
      
      console.log(newDataToSave);
      const saveChanges = await UPDATE_DATA_PROJECT(newDataToSave);
      setIsOpenFormEdit(false);
      setDataEdit(null);
   
      console.log(await saveChanges.json());
    } catch (error) {
      console.log(error);
      
    } finally{
      handleChangeLoading();
    }
    // Validar si existe algún cambio

  }
  return (
    <section className='w-full min-h-screen'>
    <DialogProjectEdit
      isOpen={isOpenFormEdit}
      data={dataEdit}
      handleChangeOpen={()=>setIsOpenFormEdit(false)}
      handleChangeImage={setDataEdit}
      handleSaveNewData={handleSaveNewData}
    />
    <div className='w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 py-4'>
     
      {
        data?.map((item, idx)=>
        <div 
          key={idx} 
          onClick={()=>handleClickEdit(item)}
          className='w-full rounded-lg bg-white p-2'>
          <div className=' relative h-48 w-full '>
            {
              item?.images?.length > 1 ?
              <CarrouselImagesCard
              images={item?.images}
            /> :
            <div className='absolute  h-full inset-0 w-full  rounded-lg'>
              <Image
                src={item?.images[0]}
                alt='Imagen de previsualizacion'
                className='rounded-lg'
                objectFit='cover'
                layout='fill'
              />
            </div>
            }
          </div>

          <div className='p-4'>
            <h1 className='font-bold text-naranja text-3xl'>${item?.price.dolar} - S/.{item?.price?.soles}</h1>
            <h1 className='font-bold text-lg hover:underline cursor-pointer'>{item?.name}</h1>
            <p className='p-1 rounded-lg bg-naranja text-white  w-fit my-1 text-sm '>{item?.status}</p>
            <p className='text-sm'>{item?.description}</p>
            <p className='flex flex-row items-center mt-4 text-gray-500 text-sm'><LocationOnIcon/> <span className=' ml-2'>{item?.location?.detailedLocation?.zone}</span></p>
            <SeparatorForms/>
            <h1>Area Total : <span className='font-bold'>{Number(item?.geographicalDetails?.totalArea?.depth)*Number(item?.geographicalDetails?.totalArea?.frontage)} mt2</span></h1>
          </div>
        </div>)
      }
    </div>
    </section>
  )
}
