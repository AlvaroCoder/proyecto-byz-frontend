'use client'
import { CarrouselImagesCard } from '@/components/Cards'
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import { UPDATE_DATA_PROJECT, UPLOAD_IMAGE } from '@/lib/apiConnections';
import { SeparatorForms } from '@/components/Commons';
import { DialogProjectEdit } from '@/components/Dialogs';


export default function BoardProjects({
  data=[],
  handleChangeLoading,
  handleUpdateChange
}) {
  
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  // Funcion de abrir venta de edicion del proyecto
  const handleClickEdit=(item)=>{
    setDataEdit(item)    
    setIsOpenFormEdit(true);
  }
  // Funcion de realizar cambios en los inputs
  const handleChangeInput=(evt)=>{
    const target = evt.target;
    setDataEdit({
      ...dataEdit,
      [target.name] : target.value
    })
  }
  // Funcion de realizar cambios en la propiedad de grographicalDetails
  const handleChangeInputGeographiCalDetails=(evt)=>{
    const target = evt.target;
    setDataEdit((prev)=>({
      ...dataEdit,
      geographicalDetails : {
       totalArea : {
        ...prev.geographicalDetails.totalArea,
        [target.name] : target.value
       }
      }
    }))
  }
  // Funcion de realizar cambios en la parte de informacion del precio
  const handleChangeInputPrice=(evt)=>{
    const target = evt.target;
    setDataEdit((prev)=>({
      ...dataEdit,
      price :{
        ...prev.price,
        [target.name] : target.value
      }
    }));
  }
  // Funcion de agregar lugares de alrededor
  const handleAddDataSurroundings=(data)=>{
    setDataEdit((prev)=>({
      ...dataEdit,
      location : {
        ...prev.location,
        surroundings : [
          ...prev.location.surroundings,
          data
        ]
      }
    }))
  }
  // Funcion de quitar lugares de alrededor
  const handleDeleteDataSurroundings=(idx)=>{
    
    const surroundingFilter = dataEdit?.location?.surroundings?.filter((_, key)=>idx !== key);
    setDataEdit((prev)=>({
      ...dataEdit,
      location :{
        ...prev.location,
        surroundings : surroundingFilter
      }
    }))
  }
  // Funcion de actualizar proyecto
  const handleSaveUpdateProject=async(dataEditProject)=>{
    console.log(dataEditProject);
    try {
      handleChangeLoading();
      let newDataToSave =dataEditProject;
      if (dataEditProject?.images !== data?.filter((item)=>item?.id === dataEditProject)) {
        // Subimos las imagenes
        const urlImages = await Promise.all(
          dataEditProject?.images?.map(async(item)=>{
            try {
              if (typeof(item)==='object') {
                const formData = new FormData();
                formData.append("image", item?.file);
                const url_images = await UPLOAD_IMAGE(formData);
                if (!url_images.ok) {
                  alert("Surgio un error al subir las imagenes");
                  return;
                }
                return (await url_images.json())?.url
              }
            } catch (error) {
              console.error(error);
            }
          })
        );
        // Funcion de eliminar aquellos que son del tipo objeto
        const imagesWithoutFile = dataEditProject.images?.filter(item=>typeof(item)==='string');
        // Filtramos valores nulos o undefined
        const urlImagesWithoutUndefined = urlImages.filter(Boolean);

        newDataToSave = {
          ...dataEditProject,
          images : [...imagesWithoutFile ,...urlImagesWithoutUndefined]
        }
      }
      const saveChanges=await UPDATE_DATA_PROJECT(newDataToSave);
      handleUpdateChange(newDataToSave)
      setIsOpenFormEdit(false);
      setDataEdit(null);
      console.log(await saveChanges.json());
      
    } catch (error) {
      console.error(error);
      
    } finally{
      handleChangeLoading();
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  return (
    <section className='w-full min-h-screen'>
    <DialogProjectEdit
      isOpen={isOpenFormEdit}
      data={dataEdit}
      handleChangeOpen={()=>setIsOpenFormEdit(false)}
      handleChangeImage={setDataEdit}
      handleSaveNewData={handleSaveUpdateProject}
      handleChangeInput={handleChangeInput}
      handleChangeInputPrice={handleChangeInputPrice}
      handleChangeInputGeographiCalDetails={handleChangeInputGeographiCalDetails}
      handleAddDataSurroundings={handleAddDataSurroundings}
      handleDeleteDataSurroundings={handleDeleteDataSurroundings}
    />
    <div className='w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 py-4'>
     
      {
        data?.map((item, idx)=>
        <div 
          key={idx} 
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
            <h1 className='font-bold text-lg hover:underline cursor-pointer' onClick={()=>handleClickEdit(item)}>{item?.name}</h1>
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
