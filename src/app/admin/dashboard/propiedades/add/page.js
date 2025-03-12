'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { LoadingWindowProject } from '@/components/Loading';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormAddPropertie } from '@/components/Forms';

export default function Page() {
  const router = useRouter();
  const URL_STATUS=process.env.NEXT_PUBLIC_GET_STATUS_PROPERTIES;
  const [loadingDataSave, setLoadingDataSave] = useState(false);

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

  const {data : dataStatusProperties, loading : loadingStatusProperties, error : errorDataStatusProperties} = useFetch(URL_STATUS);
  const [stateSavePropertie, setStateSavePropertie] = useState([
    {value : "Propietario", isSelected : true},
    {value : "Acerca de la propiedad", isSelected : false},
    {value : "Previsualización", isSelected : false}
  ]);
  const handleClickChangeStateSave=(idx)=>{
    const newDataStateSave = stateSavePropertie?.map((item, i)=>{
      if (idx === i) {
        return{
          ...item,
          isSelected : true
        }
      }
      return {
        ...item,
        isSelected : false
      }
    });
    setStateSavePropertie(newDataStateSave);
  }
  const handleChange=(evt)=>{
    const target = evt.target;
    setDataNewProperties({
      ...dataNewProperties,
      [target.name] : target.value
    })
  }
  const handleChangeStatusPropertie=()=>{

  }
  const handleChangeGeographicalDetail=()=>{

  }
  const handleChangeLocation=(data)=>{
    setDataNewProperties(prev=>({
      ...prev,
      location : {
        ...prev.location,
        detailedLocation : data
      }
    }))
  };
  return (
    <section className='w-full min-h-24 overflow-y-auto p-8'>
      <LoadingWindowProject
        loading={loadingDataSave}
      />
      <section className='w-full h-12 bg-gris rounded-lg mb-4'>
        <ul className='w-ful h-full flex flex-row justify-evenly items-center'>
          {
            stateSavePropertie?.map((item, idx)=><li 
              key={idx}
              onClick={()=>handleClickChangeStateSave(idx)}
              className={`${item.isSelected ? 'underline ' :''} cursor-pointer text-white flex flex-row items-center`}
              ><span className='mr-2'>{item?.isSelected ? <CheckCircleIcon className='text-naranja'/> : <CheckCircleOutlineIcon/>}</span>{item?.value}</li>)
          }
        </ul>
      </section>
      <FormAddPropertie
        initialData={dataNewProperties}
        dataStatusPropertie={dataStatusProperties}
        handleChange={handleChange}
        loadingDataStatusPropertie={loadingStatusProperties}
        handleChangeStatusPropertie={handleChangeStatusPropertie}
        setDataNewPropertie={setDataNewProperties}
        handleChangeLocation={handleChangeLocation}
      />
    </section>
  )
}