'use client'
import React, { useState } from 'react'

import PersonIcon from '@mui/icons-material/Person';

import { PasswordInput } from '../Inputs';
import { ButtonNaranja } from '../Buttons';
import { login } from '@/authentication/lib';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function FormLogin() {
    
    const [dataForm, setDataForm] = useState({
        username : "",
        password : ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange=(evt)=>{
        const target = evt.target;
        setDataForm({
            ...dataForm,
            [target.name] : target.value
        });
    }
    const handleClick=async(evt)=>{
        evt.preventDefault();
        if (dataForm.password === "" || dataForm.username === "") {
            setError({idError : 1,message : "Completar los campos"});
            return;
        }
        setLoading(true);
        const response = await login(dataForm);
        console.log(response.message);
        
        if (response.error) {
            
            toast.error("Error en el servidor");
            setLoading(false);
            return;
        }
        toast.success("Se inicio sesion correctamente");
        setLoading(false);
        setError(null);
        router.push("/admin/dashboard")
    }
  return (
    <div className='p-4 bg-white  rounded-xl flex flex-col items-center min-w-96 text-gris '>
        <h1 className='font-bold text-2xl text-gris' >Inicia sesión</h1>
        <div className='mt-6'>
            <label className=' text-sm text-gris'>Usuario</label>
            <div className={`flex flex-row items-center justify-center px-4 py-2 border-b border-b-gris w-96 ${error?.idError === 1 && 'bg-red-100 '}`}>
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
            {error?.idError === 1 && <p className='text-red-400 w-full text-center'>Complete el formulario</p>}
        </div>
        <div className='mt-6'>
            <label className='text-sm text-gris'>Contraseña</label>
            <PasswordInput
                error={error}
                value={dataForm.password}
                onChange={handleChange}
            />
            {error?.idError === 1 && <p className='text-red-400 w-full text-center'>Complete el formulario</p>}

        </div>
        <div className='w-full mt-6'>
            <ButtonNaranja
                loading={loading}
                className={"w-full text-lg"}
                text={"Iniciar Sesión"}
                onClick={handleClick}
            />
        </div>
    </div>
  )
}
