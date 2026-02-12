'use client'
import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Input } from '../ui/input';
import { SeparatorForms } from '../Commons';
import { ButtonDropdownStatus } from '../Buttons';
import { Button } from '../ui/button';
import { Camera, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function FormAddUser({
    handleClickAddMember,
    dataRoles=[],
}) {
    const router = useRouter();
    const [loadingData, setLoadingData] = useState(false);
    const [visibilityPassword, setVisibilityPassword] = useState(false);
    const [dataUsers, setDataUsers] = useState({
        user_name :"",
        first_name : "",
        last_name : "",
        phone : "",
        company_email : "",
        personal_email : "",
        photo : "",
        dni : "",
        password : "",
        refresh_token : "",
        role : {
            id : 1,
            value : "Administrador general"
        },
        disabled : false,
        filePhoto : null
    });

    // Funcion de atrapar los cambios en el input
    const handleChangeInput=(evt)=>{
        const target = evt.target;
        setDataUsers({
            ...dataUsers,
            [target.name] : target.value
        })
    }

    // Funcion de cambio de la visibilidad de la contraseña
    const handleChangeVisibilityPassword=()=>{
        setVisibilityPassword(!visibilityPassword);
    }

    // Funcion de guardar los cambios
    const handleClickSave=async()=>{
        try {
            setLoadingData(true);
            await handleClickAddMember(dataUsers);
            router.push("/admin/dashboard/users")
        } catch (error) {
            console.log(error);
            
        }finally{
            
            setLoadingData(false);
        }
    }
    // Funcion de cambiar el rol del usuario
    const handleChangeStatusUser=(newDataRol, id)=>{
        setDataUsers({
            ...dataUsers,
            role : {
                id,
                value : newDataRol
            }
        })
    }

    // Funcion de atrapar los cambios de la imagen
    const handleChangeImage=(evt)=>{
        const file = evt.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload=()=>{
                setDataUsers({
                    ...dataUsers,
                    photo : reader.result,
                    filePhoto : file
                })
            }
            reader.readAsDataURL(file);
        }
    }
  return (
    <section>
        <h1 className='font-bold'>Información de usuario</h1>
        <h1>Foto de perfil <span className='text-red-500'>*</span></h1>
        <div className='w-full flex justify-center'>
            <div className='relative w-32 h-32 my-4'>
                <label className='cursor-pointer'>
                    <div className='w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300'>
                        {
                            dataUsers.photo ? 
                            (<img
                                src={dataUsers.photo}
                                alt='Foto de Perfil usuario'
                                className='w-full h-full object-cover'
                            />) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                <p>No Imagen</p>
                            </div>        
                            )
                        }
                    </div>
                    <div className="absolute bottom-0  left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 w-full rounded-b-full py-2 flex justify-center">
                        <Camera className="text-white w-6 h-6" />
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleChangeImage} />
                </label>
            </div>
        </div>
        <section className='flex flex-col gap-4'>
            <div className=''>
                <h1 className=''>Nombre de usuario <span className='text-red-500'>*</span></h1>
                <div className='flex flex-row items-center gap-2'>
                    <PersonIcon className='text-naranja'/>
                    <Input
                        name="user_name"
                        value={dataUsers.user_name}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
            </div>
            <div className=''>
                <h1 className=''>Contraseña<span className='text-red-500'>*</span></h1>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <LockIcon
                        className='text-naranja'
                    />
                    <div className='flex-1 relative'>
                        <Input
                            name="password"
                            value={dataUsers.password}
                            onChange={handleChangeInput}
                            type={visibilityPassword ? "text" : "password"}
                        />
                        {
                            visibilityPassword?
                            <p>
                            <VisibilityOffIcon
                                    onClick={handleChangeVisibilityPassword}
                                    className='text-naranja absolute top-2 right-4 cursor-pointer'
                                    />
                            </p> :
                            <p>
                                <RemoveRedEyeIcon
                                    onClick={handleChangeVisibilityPassword}
                                    className='text-guinda absolute top-2 right-4 cursor-pointer'
                                />
                            </p>
                        }
                    </div>
                </div>

            </div>
        </section>
        <SeparatorForms/>
        <h1 className='font-bold'>Información Personal</h1>
            <div className='flex-1 mb-2'>
                <h1>DNI <span className='text-red-500'>*</span></h1>
                <Input
                    name="dni"
                    value={dataUsers.dni}
                    type="number"
                    onChange={handleChangeInput}
                />
            </div>
        <section className='flex flex-col gap-4'> 
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <h1>Nombre <span className='text-red-500'>*</span></h1>
                    <Input
                        name="first_name"
                        value={dataUsers.first_name}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <div>
                    <h1>Apellido <span className='text-red-500'>*</span></h1>
                    <Input
                        name="last_name"
                        value={dataUsers.last_name}
                        onChange={handleChangeInput}
                        required
                    />
                </div>

            </div>
            <div className='flex flex-row items-center'>
                <div className='flex-1'>
                    <h1>Telefono</h1>
                    <Input
                        name="phone"
                        value={dataUsers.phone}
                        onChange={handleChangeInput}
                        type="number"
                    />
                </div>
                <div className='w-40 ml-2'>
                    <h1>Rol</h1>
                    <ButtonDropdownStatus
                        data={dataRoles}
                        initialData={dataUsers.role.value}
                        handleChangeStatus={handleChangeStatusUser}
                        limitContent={7}
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <h1>Email Personal <span className='text-red-500'>*</span></h1>
                    <Input
                        name="personal_email"
                        value={dataUsers.personal_email}
                        onChange={handleChangeInput}
                        type="email"
                        required
                    />
                </div>
                <div>
                    <h1>Email Corporativo <span className='text-red-500'>*</span></h1>
                    <Input
                        name="company_email"
                        value={dataUsers.company_email}
                        onChange={handleChangeInput}
                        type="email"
                        required
                    />
                </div>
            </div>

        </section>
        <Button
            disabled={loadingData}
            onClick={handleClickSave}
            className="bg-naranja hover:bg-naranja mt-4 w-full rounded-full"
        >
           {
            loadingData ? <Loader2 className='animate-spin' /> : <p> Guardar usuario</p>
           }
        </Button>
    </section>
  )
}
