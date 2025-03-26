'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { LoadingWindowProject } from '@/components/Loading';
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormAddPropertie, FormAddRealStateAgent, FormPreview } from '@/components/Forms';

export default function Page() {
  const [loadingDataSave, setLoadingDataSave] = useState(false);


  const [stateSavePropertie, setStateSavePropertie] = useState([
    {value : "Propietario", isSelected : true, Component : FormAddRealStateAgent},
    {value : "Acerca de la propiedad", isSelected : false, Component : FormAddPropertie},
    {value : "Previsualización", isSelected : false, Component: FormPreview}
  ]);

  const [userSelected, setUserSelected] = useState(null);
  
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
  const ComponentSelected = useMemo(()=>{
    return stateSavePropertie?.filter((data)=>data.isSelected)[0].Component
  })

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
      <ComponentSelected/>
    </section>
  )
}