'use client'
import React, { useState } from 'react'
import { BoardEmptyProjects, BoardProjects } from './elements';

export default function TableProjects({
    data=[]
}) {    
    const typeProject = [
        {title : "Todos", isSelected : true},
        {title : "Preventa", isSelected : false},
        {title : "Venta", isSelected : false}
    ];
    const [dataTypeProject, setDataTypeProject] = useState(typeProject);
    const handleChangeTypeProject=(titleProject="")=>{
        const newDataTypeProject=dataTypeProject?.map((item)=>{
            if (item?.title.toUpperCase() === titleProject.toUpperCase()) {
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
                dataTypeProject?.map((item, idx)=><p 
                key={idx}
                onClick={()=>handleChangeTypeProject(item?.title)}
                className={` p-4 cursor-pointer ${item?.isSelected ? 'border-b-naranja border-b-2 ' : ''}`}
                >{item?.title}</p>)
            }
        </div>
        {
            data.length > 0 ?
            <BoardProjects
                data={data}
            /> : 
            <BoardEmptyProjects/>
        }
    </section>
  )
}
