'use client'
import { ButtonDropdownStatus } from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SAVE_FORM_CLIENT } from "@/lib/apiConnections";
import {AnimatePresence, motion} from "framer-motion"
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";

export default function Page() {
    const [indexImage, setIndexImage] = useState(0);
    const IMAGES = [
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1740173073/ImagesByZ/folxzzhy3o3mwmagono7.png",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1740173060/ImagesByZ/zrkyw9zor5pctbyfhywc.png",
      "https://res.cloudinary.com/dabyqnijl/image/upload/v1740158491/ImagesByZ/oh4chfekpcpjzqchpjsu.png"
    ]
    const expectedTimeList=[
      {value : "Dentro de 1 mes", id : 1},
      {value : "De 2 a 3 meses", id :2},
      {value : "De 3 meses a mas", id : 3}
    ]
    const [loadingSaveForm, setLoadingSaveForm] = useState(false);
    const [dataFormClient, setDataFormClient] = useState({
      first_name : "",
      last_name : "",
      email : "",
      comment : "",
      phone : {
        code : "51",
        number : ""
      },
      expectedTimeToBuy : "Dentro de 1 mes"
    });
    const handleClick=async()=>{
      console.log(dataFormClient);
      setLoadingSaveForm(true)
      const response = await SAVE_FORM_CLIENT(dataFormClient);
      setLoadingSaveForm(false)
      console.log(await response.json());
      
      if (response.ok) {
        toast.success("Se envio correctamente el formulario");
        setDataFormClient({
          first_name : "",
          last_name : "",
          email : "",
          comment : "",
          phone : {
            code : "51",
            number : ""
          },
          expectedTimeToBuy : "Dentro de 1 mes"
        })
        return;
      }else{
        toast.error("Ocurrio un error");
        setDataFormClient({
          first_name : "",
          last_name : "",
          email : "",
          comment : "",
          phone : {
            code : "51",
            number : ""
          },
          expectedTimeToBuy : "Dentro de 1 mes"
        })
        return
      }
    }
    const handleChangeInput=(evt)=>{
      const target = evt.target
      setDataFormClient({
        ...dataFormClient,
        [target.name] : target.value
      })
    }
    useEffect(()=>{
      const interval =setInterval(()=>{
        setIndexImage((prev) => (prev + 1) % IMAGES.length)
      }, 9000);
  
      return () => clearInterval(interval);
    },[]);
  return (
    <div className='w-full min-h-screen flex flex-row'>
      <section className='flex-1 relative overflow-hidden'>
      <AnimatePresence mode='wait'>
            <motion.div
              key={indexImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
                <Image
                  src={IMAGES[indexImage]}
                  alt='Imagen de Fondo'
                  layout='fill'
                  objectFit="cover"
                  
                />
            </motion.div>
          </AnimatePresence>
      </section>
      <section className="flex-1 flex flex-col items-center justify-center">
        <h1 className="font-bold text-lg max-w-72 text-center mb-4">Deja tus datos para ponernos en contacto</h1>
          <section className='flex flex-col gap-2 mt-4'>
            <div className='flex flex-row gap-2'>
              <div className='flex-1'>
                <h1>Nombres <span className='text-red-500'>*</span></h1>
                <Input 
                  
                  placeholder="Nombre"  
                  name="first_name"
                  value={dataFormClient?.first_name}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <h1>Apellidos <span className='text-red-500'>*</span></h1>
                <Input 
                  className="flex-1"
                  placeholder="Apellido"
                  value={dataFormClient?.last_name}
                  onChange={handleChangeInput}
                  name="last_name"
                />
              </div>
            </div>
            <div>
              <h1>Email <span className='text-red-500'>*</span></h1>
              <Input
                placeholder="Email"
                name="email"
                value={dataFormClient?.email}
                type="email"
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <h1>Telefono <span className='text-red-500'>*</span></h1>
              <Input
              placeholder="Telefono"
              name="phone"
              value={dataFormClient?.phone?.number}
              type="number"
              onChange={(evt)=>setDataFormClient((prev)=>({...dataFormClient, phone : {...prev.phone, number : evt.target.value}}))}
            />
            </div>
            <div>
              <h1>Tiempo estimado de compra </h1>
            <ButtonDropdownStatus
              handleChangeStatus={(value, _)=>setDataFormClient({
                ...dataFormClient,
                expectedTimeToBuy : value
              })}
              data={expectedTimeList}
              initialData={dataFormClient?.expectedTimeToBuy}
              limitContent={3}
            />
            </div>

            <div>
              <h1>Alguna consulta <span className='text-red-500'>*</span></h1>
              <Textarea
                placeholder="Escribe alguna petición..."
                value={dataFormClient?.comment}
                name="comment"
                onChange={handleChangeInput}
              />
            </div>
            <Button
            
              onClick={handleClick}
              disabled={loadingSaveForm}
              className="flex justify-center items-center border p-6 border-naranja w-full mt-4 rounded-lg bg-naranja text-white hover:bg-orange-300 "
            >
            {loadingSaveForm ? <p><Loader2 className='animate-spin' /></p> :  <p>Solicitar información</p>}
            </Button>
          </section>

      </section>
    </div>
  )
}
