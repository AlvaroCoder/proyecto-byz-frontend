'use client'
import { SeparatorForms } from '@/components/Commons';
import { fetchDataSunatByDNI } from '@/lib/privateConnections';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Camera, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function FormAddUserRealAgent({
  handleClickSaveAddRealAgent,
  handleClickChangeShowForm,
  handleChangeLoading
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
    const handleClickSaveData=async()=>{
      setLoadingSaveData(true);
      handleChangeLoading(true);
      await handleClickSaveAddRealAgent(jsonUser)
      setLoadingSaveData(false)
      handleChangeLoading(false);
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
              onClick={handleClickSaveData}
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
