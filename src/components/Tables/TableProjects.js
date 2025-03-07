'use client'
import React, { useMemo, useState } from 'react'
import { BoardEmptyProjects, BoardProjects } from './elements';

export default function TableProjects({
    dataPojects=[],
    dataStatus=[]
}) {        
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
            return dataPojects
        }        
        return dataProjectsState.filter(item=>dataTypeProject.filter(i=>i.isSelected)[0]?.value.toUpperCase().includes(item?.status.toUpperCase()))
    },[dataProjectsState, dataTypeProject]);

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
  return (
    <section>
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
                /> : 
                <BoardEmptyProjects/>
            }
    </section>
  )
}
