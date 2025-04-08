'use client'
import React, { useMemo, useState } from 'react'
import { BoardEmptyProjects, BoardProperties } from './elements';
import { LoadingWindowProject } from '../Loading';

export default function TableProperties({
    dataProperties=[],
    dataStatus=[]
}) {
    console.log(dataProperties);
    const typeProperties = [{id : 0, value : "Todos"},...dataStatus]?.map((item, idx)=>{
        if (idx === 0) {
            return {
                ...item,
                isSelected : true
            }
        }
        return {
            ...item,
            isSelected : false
        }
    });
    const [loadingDataUpdate, setLoadingDataUpdate] = useState(false);
    const [dataTypeProperties, setDataTypeProperties] = useState(typeProperties);
    const [dataPropertiesState, setDataPropertiesState] = useState(dataProperties);
    const filterDataStatus = useMemo(()=>{
        if (dataTypeProperties?.filter(i=>i.isSelected)[0]?.value.toUpperCase() === "TODOS") {
            return dataProperties
        };
        return dataPropertiesState.filter(item=>dataTypeProperties?.filter(i=>i.isSelected)[0]?.value.toUpperCase().trim() === item?.status.toUpperCase().trim())
    },[]);

    // Cambio de estado del proyecto
    const handleChangeTypeProperties=(titlePropertie="")=>{
        const newDataTypeProperties = dataTypeProperties?.map((item)=>{
            if (item?.value?.toUpperCase() === titlePropertie.toUpperCase()) {
                return {
                    ...item,
                    isSelected : true
                }
            }
            return {
                ...item,
                isSelected : false
            }
        });
        setDataTypeProperties(newDataTypeProperties);
    }

    // Funcion de cambiar estado de el estado de carga de la aplicación
    const handleChangeLoading=()=>{
        setLoadingDataUpdate((prevLoading)=>!prevLoading);
    }

    const handleUpdateChange=(dataUpdated)=>{
        const newDataPropertyState = dataPropertiesState.map((item)=>{
            if (item?.id === dataUpdated?.id) {
                return dataUpdated;
            }
            return item;
        });
        setDataPropertiesState(newDataPropertyState);
    }
  return (
    <section>
        <LoadingWindowProject
            loading={loadingDataUpdate}
        />
        <div className='w-full border-b-gris border-b-[.5px] flex flex-row'>
            {
                dataTypeProperties?.map((item, idx)=>
                <p
                    key={idx}
                    onClick={()=>handleChangeTypeProperties(item?.value)}
                    className={`p-4 cursor-pointer ${item?.isSelected ? 'border-b-naranja border-b-2' : ''}`} 
                >
                    {item?.value}
                </p>)
            }
        </div>
        {
            filterDataStatus?.length > 0 ?
            <BoardProperties
                data={filterDataStatus}
                handleChangeLoading={handleChangeLoading}
                handleUpdateChange={handleUpdateChange}
            /> : 
            <BoardEmptyProjects/>
        }
    </section>
  )
}