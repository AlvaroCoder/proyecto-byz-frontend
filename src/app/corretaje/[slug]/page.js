'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { CardUserHoriz, CarrouselImagesCard, GoogleMapCard } from '@/components/Cards';
import { SeparatorForms } from '@/components/Commons';
import { useParams } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShowerIcon from '@mui/icons-material/Shower';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GarageIcon from '@mui/icons-material/Garage';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ButtonDropdownStatus } from '@/components/Buttons';
import { SAVE_FORM_CLIENT } from '@/lib/apiConnections';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Page() {
    const {slug} = useParams();
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
    })
    const URL_GET_PROPERTY_BY_ID = process.env.NEXT_PUBLIC_GET_PROPERTIES+"/"+slug;
    const {data : dataProperty, loading : loadingDataProperty, error : errorDataProperty} = useFetch(URL_GET_PROPERTY_BY_ID);    
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
  if (loadingDataProperty) {
    return (<p>Cargando ...</p>)  
  }
  return (
    <div>
      <section className='w-full p-10 h-[600px]'>
        <CarrouselImagesCard
          images={dataProperty?.projects?.[0]?.images}
          className={"h-[600px]"}
        />
      </section> 
      <section className='w-full p-10 grid grid-cols-3 gap-4 mt-4 '>
        <div className='col-span-2 bg-white p-4 '>
          <h1 className='font-bold text-naranja text-4xl'>S/.{dataProperty?.projects?.[0]?.price?.soles} - ${dataProperty?.projects?.[0]?.price?.dolar}</h1>
          <h1 className='font-bold text-3xl'>{dataProperty?.projects?.[0]?.status}</h1>
          <p>{dataProperty?.projects?.[0]?.description}</p>
          <SeparatorForms/>
          <h1><LocationOnIcon/> <span className='font-bold'>{dataProperty?.projects?.[0]?.location?.detailedLocation?.zone}</span></h1>
          <section className='mt-4'>
          <GoogleMapCard
            lat={dataProperty?.projects?.[0]?.location?.detailedLocation?.coordinates?.lat}
            lng={dataProperty?.projects?.[0]?.location?.detailedLocation?.coordinates?.lng}
          />
          </section>
          <SeparatorForms/>
          <section className='w-full grid grid-cols-2 gap-4 my-2 text-lg '>
            <h1><span><RoomServiceIcon/></span> Cuartos : {dataProperty?.projects?.[0]?.features?.rooms}</h1>
            <h1><span><ApartmentIcon/></span> Pisos : {dataProperty?.projects?.[0]?.features?.floors}</h1>
          </section>
          <section className='w-full grid grid-cols-2 gap-4 my-2 text-lg '>
            <h1><span><ShowerIcon/></span> Baños : {dataProperty?.projects?.[0]?.features?.bathrooms}</h1>
            <h1><span><GarageIcon/></span> Garage : {dataProperty?.projects?.[0]?.features?.garage}</h1>
          </section>
          <SeparatorForms/>
          <h1 className='text-xl font-bold'>{dataProperty?.projects?.[0]?.name}</h1>
          <p>{dataProperty?.projects?.[0]?.description}</p>
          <SeparatorForms/>
          <h1 className='font-bold text-2xl'>Información del anunciante</h1>
          <CardUserHoriz
            data={dataProperty?.projects?.[0]}
          />
        </div>
        <div className='bg-white p-4 border border-gray-400 h-fit rounded-lg lg:block mt-6 hidden mx-4 relative md:mb-0 mb-8 before:w-full before:!h-1 lg:sticky top-10  '>
          <h1 className='font-bold text-lg'>Contáctanos</h1>
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
          </section>
          <Button
            
            onClick={handleClick}
            disabled={loadingSaveForm}
            className="flex justify-center items-center border p-6 border-naranja w-full mt-4 rounded-lg bg-naranja text-white hover:bg-orange-300 "
          >
           {loadingSaveForm ? <p><Loader2 className='animate-spin' /></p> :  <p>Solicitar información</p>}
          </Button>
        </div>
      </section>

    </div>
  )
}