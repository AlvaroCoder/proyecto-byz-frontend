'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { ButtonDropdownProperties } from '../Buttons'
import { Button } from '../ui/button'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchPropertyBanner() {
    const typeSearch=[
        {value : "Alquilar", isSelected : true},
        {value : "Comprar", isSelected : false},
        {value : "Proyectos", isSelected : false}
    ]
    const variantProperties=[
        {value : "Todos", isSelected : true},
        {value : "Casas", isSelected : false},
        {value : "Departamentos", isSelected : false},
        {value : "Oficinas", isSelected : false},
        {value : "Terrenos", isSelected : false},
        {value : "Locales", isSelected : false},
        {value : "Edificios", isSelected : false}
    ]
    const [stateTypeSearch, setStateTypeSearch] = useState(typeSearch);
    const [stateVariantProperty, setStateVariantProperty] = useState(variantProperties);

    const handleChangeTypeSearch=(key)=>{
        const newStateTypeSearch = typeSearch.map((item, idx)=>{
            if (key === idx) {
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
        setStateTypeSearch(newStateTypeSearch);
    }
    const handleChangePropertie=(idx)=>{
        const newDataPropertie = stateVariantProperty.map((item, key)=>{
            if (key===idx) {
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
        setStateVariantProperty(newDataPropertie);
    }
  return (
    <div className='mt-8  w-full h-24 rounded-lg flex flex-col justify-center items-center'>
        <div className='w-full'>
            <ul className='w-fit flex flex-row bg-white rounded-t-lg px-2 '>
                {
                    stateTypeSearch?.map((item,idx)=>
                        <li 
                            key={idx}
                            onClick={()=>handleChangeTypeSearch(idx)}
                            className={`p-4 cursor-pointer border-b-2 ${item?.isSelected ? 'border-b-naranja' : 'border-b-gray-100'}  hover:bg-gray-100 hover:underline`}    
                        >{item?.value}</li>)
                }
            </ul>
        </div>
        <div className='w-full flex flex-row bg-white p-4 rounded-b-lg rounded-r-lg'>
            <ButtonDropdownProperties
                data={stateVariantProperty}
                handleChangeStatus={handleChangePropertie}
            />
            <input
                placeholder='Buscar segun la ubicación ...'
                className="outline-none w-full px-4 py-3 border border-gris rounded-lg text-lg ml-2"
            />  
            <Button 
                variant="ghost"
                className="bg-naranja border shadow-none text-lg font-bold rounded-xl w-32 h-14 text-white hover:bg-orange-400 hover:text-white  border-none p-5 ml-2">
                <h1> Buscar </h1>
            </Button>
        </div>
    </div>
  )
}