import { CardPropertySimple, CarrouselImagesCard } from '@/components/Cards';
import { DialogPropertyEdit } from '@/components/Dialogs';
import { UPDATE_DATA_PROPERTY, UPLOAD_IMAGE } from '@/lib/apiConnections';
import Image from 'next/image';
import React, { useState } from 'react'

export default function BoardProperties({
    data=[],
    handleChangeLoading,
    handleUpdateChange
}) {
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  // Funcion de abrir ventana de edicion de la propiedad
  const handleClickEdit=(item)=>{
    setDataEdit(item);
    setIsOpenFormEdit(true);
  }

  // Funcion de abrir la ventana de al costado
  const handleChangeOpen=()=>{
    setIsOpenFormEdit(false) 
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
  };

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

  // Funcion de cambiar la ubicacion en el mapa
  const handleChangeLocation=(data)=>{
    setDataEdit(prev=>({
      ...prev,
      location : {
        ...prev.location,
        detailedLocation : data
      }
    }))
  }

  // Funcion de actualizar proyecto
  const handleSaveUpdateProperty=async(dataEditProperty)=>{
    try {
      handleChangeLoading();

      let newDataToSave = dataEditProperty;
      if (dataEditProperty?.images !== data?.filter((item)=>item?.id === dataEditProperty)) {
        const urlImages = await Promise.all(
          dataEditProperty?.images?.map(async(item)=>{
            try {
              if (typeof(item) === 'object') {
                const formData = new FormData();
                formData.append("image", item?.file);
                const url_images = await UPLOAD_IMAGE(formData);
                if (!url_images.ok) {
                  alert("Surgio un error al subir las imágenes");
                  return;
                }
                return (await url_images.json())?.url;
              }
            } catch (error) {
              console.error(error);
            }
          })
        );

        // Funcion de eliminar
        const imagesWithoutFile = dataEditProperty?.images?.filter(item=>typeof(item) === 'string');

        // Filtramos valores nulos o undefined.
        const urlImagesWithoutUndefined = urlImages?.filter(Boolean);

        newDataToSave = {
          ...dataEditProperty,
          images : [...imagesWithoutFile, ...urlImagesWithoutUndefined]
        };
        const saveChanges = await UPDATE_DATA_PROPERTY(newDataToSave);
        handleUpdateChange(newDataToSave);
        setIsOpenFormEdit(false);
        setDataEdit(null)
      }
    } catch (error) {
      console.error(error);
      
    } finally{
      handleChangeLoading();
      await new Promise(resolve => setTimeout(resolve, 0))
    }
  }
  return (
    <section className='w-full min-h-screen'>
      <DialogPropertyEdit
        isOpen={isOpenFormEdit}
        data={dataEdit}
        handleChangeOpen={handleChangeOpen}
        handleChangeInput={handleChangeInput}
        handleChangeImage={setDataEdit}
        handleSaveNewData={handleSaveUpdateProperty}
        handleChangeLocation={handleChangeLocation}
        handleChangeInputPrice={handleChangeInputPrice}
        handleChangeInputGeographiCalDetails={handleChangeInputGeographiCalDetails}
        handleAddDataSurroundings={handleAddDataSurroundings}
        handleDeleteDataSurroundings={handleDeleteDataSurroundings}
      />
      <div className='w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 py-4'>
        {
          data?.map((item, idx)=>
          <div 
            key={idx}
          >
            <CardPropertySimple
              data={item}
              handleClickEdit={handleClickEdit}
            />
          </div>
          )
        }
      </div>
    </section>
  )
}
