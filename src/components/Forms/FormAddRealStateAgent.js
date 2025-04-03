'use client'

import React, {  useState } from 'react'
import { useFetch } from '@/app/hooks/useHooks';
import { useRouter } from 'next/navigation';
import { SAVE_REAL_AGENT_INFORMATION, UPLOAD_IMAGE } from '@/lib/apiConnections';
import FormAddUserRealAgent from './Elements/FormAddUserRealAgent';
import BoardRealStateAgent from './Elements/BoardRealStateAgent';
import { CardShowRealAgent } from '../Cards';
import { Button } from '../ui/button';

export default function FormAddRealStateAgent({
  handleChangeLoading,
  handleChangeContinueState,
  handleAddRealAgent
}) {
  const router = useRouter();
  const URL_USERS = process.env.NEXT_PUBLIC_GET_USERS;
  const {data : dataUsers, loading : loadingDataUsers, error : ErrorDataUsers} = useFetch(URL_USERS);

  const [jsonUserSelected, setJsonUserSelected] = useState(null)
  const [showFormUser, setShowFormUser] = useState(false);
  const handleChangeShowFormUser=()=>{
    setShowFormUser(!showFormUser);
  }
  const handleClickSaveRealAgent=async(data)=>{
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
    setShowFormUser(false);
    router.push("/admin/dashboard/propiedades/add");
  }
  return (
    <div className='w-full min-h-screen'>
      <h1 className='text-2xl font-bold mb-2'>Información del Agente Inmobiliario</h1>
      <section className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {
          showFormUser ? 
          <FormAddUserRealAgent
            handleClickSaveAddRealAgent={handleClickSaveRealAgent}
            handleClickChangeShowForm={handleChangeShowFormUser}
            handleChangeLoading={handleChangeLoading}
          /> :
          <BoardRealStateAgent
            dataUsers={dataUsers}
            loadingDataUsers={loadingDataUsers}
            handleChangeShowFormUser={handleChangeShowFormUser}
            handleChangeSelectAgent={(realAgent)=>setJsonUserSelected(realAgent)}
          />
        }
        <section className='bg-white rounded-lg h-fit p-4'>
            {
              jsonUserSelected ?
              <div>
                <CardShowRealAgent
                  data={jsonUserSelected}
                />
                <Button
                  onClick={()=>{
                    handleChangeContinueState(1);
                    handleAddRealAgent(jsonUserSelected);
                  }}
                  className="bg-naranja text-white hover:bg-orange-400 w-full mt-8 rounded-lg"
                >
                  Continuar
                </Button>
              </div>:
              <div className='h-full flex flex-col justify-center items-center'>
                <p>No se ha seleccionado a un Agente</p>
              </div>
            }
        </section>
      </section>
    </div>
  )
}