'use client'
import React, { useState } from 'react'

import PersonIcon from '@mui/icons-material/Person';

import { PasswordInput } from '../Inputs';
import { ButtonNaranja } from '../Buttons';

export default function FormLogin() {
    const [dataForm, setDataForm] = useState({
        username : "",
        password : ""
    });
    const handleChange=(evt)=>{
        const target = evt.target;
        setDataForm({
            ...dataForm,
            [target.name] : target.value
        });
    }
  return (
    <div className='p-4 bg-white  rounded-xl flex flex-col items-center min-w-96 text-gris '>
        <h1 className='font-bold text-2xl text-gris' >Inicia sesión</h1>
        <div className='mt-6'>
            <label className=' text-sm text-gris'>Usuario</label>
            <div className='flex flex-row items-center justify-center px-4 py-2 border-b border-b-gris w-96'>
                <PersonIcon
                    className='text-gris'
                />
                <input
                    className="h-9 ml-2 w-full px-3 py-1 bg-transparent outline-none shadow-none text-gris border-none rounded-none border-b-2 "
                    name="username"
                    value={dataForm.username}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className='mt-6'>
            <label className='text-sm text-gris'>Contraseña</label>
            <div className='flex flex-row items-center'>
                <PasswordInput
                    value={dataForm.password}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className='w-full mt-6'>
            <ButtonNaranja
                className={"w-full text-lg"}
                text={"Iniciar Sesión"}

            />
        </div>
    </div>
  )
}
