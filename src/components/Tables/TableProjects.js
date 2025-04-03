'use client'
import React, { useMemo, useState } from 'react'
import { BoardEmptyProjects, BoardProjects } from './elements';
import { LoadingWindowProject } from '../Loading';

export default function TableProjects({
    dataPojects=[],
    dataStatus=[]
}) {        
    console.log(dataPojects);
    
    const [loadingDataUpdate, setLoadingDataUpdate] = useState(false);
    const typeProject = [{id : 0,value : "Todos"},...dataStatus]?.map((item, idx)=>{
        if (idx === 0) {
            return{
                ...item,
                isSelected : true
            }
        }
        return{
            ...item,
            isSelected : false
        }
    });
    
    const [dataTypeProject, setDataTypeProject] = useState(typeProject);
    
    const [dataProjectsState, setDataProjectsState] = useState(dataPojects);
    const filterDataStatus = useMemo(()=>{
        if (dataTypeProject.filter(i=>i.isSelected)[0]?.value.toUpperCase() === "TODOS") {
            return dataProjectsState
        }        
        return dataProjectsState.filter(item=>dataTypeProject.filter(i=>i.isSelected)[0]?.value.toUpperCase().trim() === item?.status.toUpperCase().trim())
    },[dataProjectsState, dataTypeProject]);
    
    // Cambio del estado del proyecto
    const handleChangeTypeProject=(titleProject="")=>{
        const newDataTypeProject=dataTypeProject?.map((item)=>{
            if (item?.value.toUpperCase() === titleProject.toUpperCase()) {
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
        setDataTypeProject(newDataTypeProject);
    }
    const handleChangeLoading=()=>{
        setLoadingDataUpdate((prevLoading)=>!prevLoading);
    }
    const handleUpdateChange=(dataUpdated)=>{
        const newDataProjectState = dataProjectsState.map((item)=>{
            if (item?.id === dataUpdated?.id) {
                return dataUpdated
            }
            return item
        });
        setDataProjectsState(newDataProjectState)
    }
  return (
    <section>
        <LoadingWindowProject
            loading={loadingDataUpdate}
        />
        <div className='w-full border-b-gris border-b-[.5px] flex flex-row'>
            {
                dataTypeProject?.map((item, idx)=>
                <p 
                key={idx}
                onClick={()=>handleChangeTypeProject(item?.value)}
                className={` p-4 cursor-pointer ${item?.isSelected ? 'border-b-naranja border-b-2 ' : ''}`}
                >{item?.value}</p>)
            }
        </div>
        {
                filterDataStatus.length > 0 ?
                <BoardProjects
                    data={filterDataStatus}
                    handleChangeLoading={handleChangeLoading}
                    handleUpdateChange={handleUpdateChange}
                /> : 
                <BoardEmptyProjects/>
            }
    </section>
  )
}
