'use client'
import React, { useEffect, useState } from 'react'
import { ButtonProfile } from '../Buttons'
import { useSession } from '@/app/hooks/useHooks'

export default function TopBarNavigationDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const {dataSession, loading, error} = useSession();
  
  useEffect(()=>{
    const updateDate=()=>{
      const now = new Date();
      const option = { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" };
      const formattedDate = now.toLocaleDateString('es-ES',option);
      setCurrentTime(formattedDate);
    }
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return ()=>clearInterval(interval);
  },[]);
  return (
    <div className='bg-white w-full shadow-sm h-24  flex flex-row justify-between px-8 items-center'>
      <div>
        <h1 className='font-bold text-xl '>Mi Dashboard</h1>
        <p>{currentTime}</p>
      </div>
      <div>
        {
          loading ?
          <p>Cargando ...</p> :
          <ButtonProfile
          nombrePerfil={dataSession?.sub}
        />
        }
      </div>
    </div>
  )
}
