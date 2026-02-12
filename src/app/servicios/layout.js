'use client'
import { FormContactPage } from '@/components/Forms'
import React from 'react'

export default function Layout({children}) {
  return (
    <div>
        <section className='w-full min-h-screen'>
            {children}
        </section>
        <section className=" pb-8 border-t-[1px] border-t-gris w-full min-h-screen flex flex-col justify-center items-center" >
            <div className="w-full h-40 flex flex-col justify-center items-center">
              <h1 className="font-bold text-3xl">Contactanos</h1>
              <h2>Empecemos tu diseño juntos, contactanos para poder ponernos en contacto contigo</h2>
            </div>
            <FormContactPage
            />
        </section>
    </div>
  )
}
