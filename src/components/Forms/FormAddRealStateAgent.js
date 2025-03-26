'use client'

import React, { useMemo, useState } from 'react'
import { Input } from '../ui/input'
import { useFetch } from '@/app/hooks/useHooks';
import { Button } from '../ui/button';
import { SeparatorForms } from '../Commons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Loader2 } from 'lucide-react';
import { fetchDataSunatByDNI } from '@/lib/privateConnections';
import { useRouter } from 'next/navigation';
import { SAVE_REAL_AGENT_INFORMATION, UPLOAD_IMAGE } from '@/lib/apiConnections';
import { Camera } from "lucide-react";

/**
 * Tareas
 *  Funcionalidad de Crear
 * 
 */
function FormAddUser({
  handleClickSaveAddRealAgent,
  handleClickChangeShowForm
}) {
  const [jsonUser, setJsonUser] = useState({
    user_name : "",
    first_name : "",
    last_name : "",
    phone : "",
    dni : "",
    password : "",
    role : {
      id : 5,
      value :"Corredor inmobiliario"
    },
    company_email : "",
    personal_email :"",
    refresh_token : "",
    photo : "" || null,
    filePhoto : null,
    disabled : false
  });

  const [loadingFetchDataSunat, setLoadingFetchDataSunat] = useState(false);
  const [loadingSaveData, setLoadingSaveData] = useState(false);
  const handleChange=(evt)=>{
    const target = evt.target;
    setJsonUser({
      ...jsonUser,
      [target.name] : target.value
    });
  }
  const fetchDataSunat=async(evt)=>{
    evt.preventDefault();
    if (jsonUser.dni === "") {
      alert("Complete el campo de dni");
      return
    }
    if (jsonUser.dni.length > 8) {
      alert("Numero de DNI no disponible");
      return;
    }
    setLoadingFetchDataSunat(true);
    const dataUser = await fetchDataSunatByDNI(jsonUser.dni);
    
    setLoadingFetchDataSunat(false);
    if (dataUser.error) {
      alert(dataUser?.value);
      setJsonUser({...jsonUser, first_name : "", last_name :""})
      return
    }
    else {
      setJsonUser({...jsonUser, first_name : dataUser.value.nombre, last_name : dataUser.value.apellido})
    }
    console.log(dataUser);
    
  }
  const handleChangeImage=(evt)=>{
    const file = evt.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setJsonUser({
          ...jsonUser,
          photo : reader.result,
          filePhoto : file
        });
      };
      reader.readAsDataURL(file);
    }
  }
  return(
    <div className='w-full h-fit col-span-1 lg:col-span-2 bg-white rounded-lg p-4'>
      <h1 className='font-bold text-xl'>Nuevo Agente inmobiliario</h1>
      <div className='w-full'>
        <div className="relative w-32 h-32 my-2">
          <label className="cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              {jsonUser.photo ? (
                <img
                  src={jsonUser.photo}
                  alt="Foto Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Imagen
                </div>
              )}
            </div>

            <div className="absolute bottom-0  left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 w-full rounded-b-full py-2 flex justify-center">
              <Camera className="text-white w-6 h-6" />
            </div>

            <input type="file" accept="image/*" className="hidden" onChange={handleChangeImage} />
          </label>
        </div>
        <SeparatorForms/>
        <Accordion type='single' collapsible defaultValue='item-2' className='w-full'>
          <AccordionItem value="item-1">
            <AccordionTrigger><h1 className='font-bold'>Información de usuario</h1></AccordionTrigger>
            <AccordionContent>
              <section className='w-full p-2'>
                <div className='my-2'>
                  <h1>Nombre de usuario <span className='text-red-500'>*</span></h1>
                  <Input
                    name="user_name"
                    type="text"
                    value={jsonUser?.user_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h1>Contraseña de usuario <span className='text-red-500'>*</span></h1>
                  <Input
                    name="password"
                    type="password"
                    value={jsonUser?.password}
                    onChange={handleChange}
                  />
                </div>
              </section>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-2">
            <AccordionTrigger><h1 className='font-bold'>Información personal</h1></AccordionTrigger>
            <AccordionContent>
              <section className='w-full p-2'>
                <div>
                  <h1>DNI <span className='text-red-500'>*</span></h1>
                  <div className='flex flex-row items-center gap-4'>
                    <Input
                      name="dni"
                      value={jsonUser?.dni}
                      type="number"
                      onChange={handleChange}
                      required
                    />
                    <Button
                      disabled={loadingFetchDataSunat}
                      onClick={fetchDataSunat}
                      className="bg-naranja hover:bg-naranja text-white "
                    >
                      {loadingFetchDataSunat ? <Loader2 className='animate-spin'/> : <p>Extraer de SUNAT</p>}
                    </Button>
                  </div>
                </div>
                <div className=' flex gap-4 flex-row my-2'>
                  <div className='flex-1'>
                    <h1>Nombre <span className='text-red-500'>*</span></h1>
                    <Input
                      name="first_name"
                      value={jsonUser?.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='flex-1'>
                    <h1>Apellido <span className='text-red-500'>*</span></h1>
                    <Input
                      name="last_name"
                      onChange={handleChange}
                      value={jsonUser?.last_name}
                    />
                  </div>
                </div>
                <div className='flex flex-row gap-4'>
                  <div className='flex-1 my-2 '>
                    <h1>Telefono <span className='text-red-500'>*</span></h1>
                    <Input
                      type="number"
                      name="phone"
                      onChange={handleChange}
                    />
                  </div>
                  <div className='flex-1'></div>
                </div>
                <div className='flex flex-row gap-4'>
                  <div className='flex-1'>
                    <h1>Correo Profesional <span className='text-red-500'>*</span></h1>
                    <Input
                      name="company_email"
                      onChange={handleChange}
                      value={jsonUser?.company_email}
                      type="email"
                    />
                  </div>
                  <div className='flex-1'>
                    <h1>Correo Personal <span className='text-red-500'>*</span></h1>
                    <Input
                      name="personal_email"
                      value={jsonUser?.personal_email}
                      onChange={handleChange}
                      type="email"
                    />
                  </div>
                </div>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='my-2 flex flex-row gap-2'>
          <Button
            onClick={async()=>{
              setLoadingSaveData(true);
              await handleClickSaveAddRealAgent(jsonUser)
              setLoadingSaveData(false)
            }}
            className="bg-naranja hover:bg-naranja"
            disabled={loadingSaveData}
          >
            {loadingSaveData ? <Loader2 className='animate-spin' /> : <h1>Guardar Agente</h1>}
          </Button>
          <Button
            onClick={handleClickChangeShowForm}
            variant="ghost"
          >
            <p>Cancelar</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

function BoardRealStateAgent({
  dataUsers=[],
  loadingDataUsers=false,
  handleChangeShowFormUser
}) {
  const [queryInput, setQueryInput] = useState("");
  const currentDataUserFilter = useMemo(()=>{
    return dataUsers?.filter((item)=>item?.role?.id === 5)?.map((item)=> item?.user_name?.toUpperCase().includes(queryInput.toUpperCase()))
  },[queryInput, dataUsers]);
  const handleChangeQuery=(evt)=>{
    setQueryInput(evt.target.value)
  }
  return(
    <section className='w-full p-4 bg-white rounded-lg col-span-2 h-fit'>
          <h1 className='text-lg font-bold'>Selecciona un agente</h1>
          <div className='w-full flex flex-row gap-4'>
            <Input
              className="flex-1 "
              placeholder="Busca en el nombre de usuario ...."
              value={queryInput}
              onChange={handleChangeQuery}
            />
            <Button className="bg-naranja hover:bg-naranja text-white">
              <p>Buscar</p>
            </Button>
          </div>
          <SeparatorForms/>
          <div className='w-full flex flex-col justify-center items-center'>
            {
              loadingDataUsers ? 
              <p>Cargando ...</p> : 
              <div className='w-full'>
                {
                  currentDataUserFilter?.length > 0 ?
                  <div></div> : 
                  <div className='min-h-24 flex flex-col justify-center gap-4 rounded-lg py-4  items-center bg-gris '>
                    <h1 className='text-white'>No hay agentes Inmobiliarios</h1>
                    <Button
                      className="bg-naranja hover:bg-naranja text-white"
                      onClick={handleChangeShowFormUser}
                    >
                      <p>Agregar nuevo agente</p>
                    </Button>
                  </div>
                }
              </div>
            }
          </div>
        </section>
  )
}

export default function FormAddRealStateAgent() {
  const router = useRouter();
  const URL_USERS = process.env.NEXT_PUBLIC_GET_USERS;
  const {data : dataUsers, loading : loadingDataUsers, error : ErrorDataUsers} = useFetch(URL_USERS);

  const [jsonUserSelected, setJsonUserSelected] = useState(null)
  const [showFormUser, setShowFormUser] = useState(false);
  const handleChangeShowFormUser=()=>{
    setShowFormUser(!showFormUser);
  }
  const handleClickSaveRealAgent=async(data)=>{
    console.log(data);
    const formData = new FormData();
    formData.append("image", data?.filePhoto);
    
    const url_IMAGES = await UPLOAD_IMAGE(formData);
    if (!url_IMAGES.ok) {
      console.log(await url_IMAGES.json());
      
      alert("Surgio un error");
      return
    }
    const urlImage = (await url_IMAGES.json())?.url;
    const newDataToSave = {
      ...data,
      photo : urlImage
    }
    const response = await SAVE_REAL_AGENT_INFORMATION(newDataToSave);
    if (!response.ok) {
      console.log(await response.json());
      
      alert("Surgio un error");
      return;
    }
    console.log(await response.json());
    setShowFormUser(false)
    router.push("/admin/dashboard/propiedades/add");
  }
  return (
    <div className='w-full min-h-screen'>
      <h1 className='text-2xl font-bold mb-2'>Información del Agente Inmobiliario</h1>
      <section className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {
          showFormUser ? 
          <FormAddUser
            handleClickSaveAddRealAgent={handleClickSaveRealAgent}
            handleClickChangeShowForm={handleChangeShowFormUser}
          /> :
          <BoardRealStateAgent
            dataUsers={dataUsers}
            loadingDataUsers={loadingDataUsers}
            handleChangeShowFormUser={handleChangeShowFormUser}
          />
        }
        <section className='bg-white rounded-lg min-h-96'>
            {
              jsonUserSelected ?
              <div></div> :
              <div className='h-full flex flex-col justify-center items-center'>
                <p>No se ha seleccionado a un Agente</p>
              </div>
            }
        </section>
      </section>
    </div>
  )
}