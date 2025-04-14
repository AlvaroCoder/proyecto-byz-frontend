import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ButtonDropdownStatus } from '../Buttons';
import { Loader2 } from 'lucide-react';
import { SAVE_FORM_CLIENT } from '@/lib/apiConnections';
import toast from 'react-hot-toast';

export default function FormContactPage() {
    const expectedTimeList=[
        {value : "Dentro de 1 mes", id : 1},
        {value : "De 2 a 3 meses", id :2},
        {value : "De 3 meses a mas", id : 3}
      ]
      const [loadingSaveFormClient, setLoadingSaveFormClient] = useState(false);
    const [dataFormClient, setDataFormClient] = useState({
        first_name : "",
        last_name :"",
        email : "",
        comment : "",
        phone : {
            code : "51",
            number : ""
        },
        expectedTimeToBuy : "Dentro de 1 mes"
    });
    const handleChangeInput=(evt)=>{
        const target = evt.target
        setDataFormClient({
          ...dataFormClient,
          [target.name] : target.value
        })
    }
    const handleClick=async()=>{
        setLoadingSaveFormClient(true);
        console.log(dataFormClient);
        const response = await SAVE_FORM_CLIENT(dataFormClient);
        setLoadingSaveFormClient(false);
        console.log(await response.json());
        if (response.ok) {
            toast.success("Se envio correctamente el formulario");
            return;
        }else{
            toast.error("Ocurrio un error");
            return
        }
    }
  return (
    <div className="bg-gris rounded-none xl:rounded-lg p-8 w-full xl:w-3/4 min-h-96">
        <div className='w-full text-white   '>
            <div>
                <h1 >Nombre <span className='text-red-500'>*</span></h1>
                <Input 
                    name="first_name"
                    value={dataFormClient?.first_name}
                    onChange={handleChangeInput}
                    className="w-full bg-white text-gris p-4"
                />
            </div>
            <div className='mt-4'>
                <h1 className=''>Apellido <span className='text-red-500'>*</span></h1>
                <Input
                    name="last_name"
                    value={dataFormClient?.last_name}
                    onChange={handleChangeInput} 
                    className="w-full bg-white text-gris p-4"
                />
            </div>
        </div>
        <div className='w-full flex flex-row items-center justify-center text-white mt-4'>
            <div className='flex-1'>
                <label className=''>Email <span className='text-red-500'>*</span></label>
                <Input
                    name="email"
                    onChange={handleChangeInput}
                    value={dataFormClient.email}
                    className="flex-1 bg-white text-gris "
                />
            </div>
            <div className='flex-1 ml-4'>
                <label className=''>Telefono</label>
                <Input
                    name="phone"
                    placeholder="Telefono"
                    value={dataFormClient?.phone?.number}
                    type="number"
                    onChange={(evt)=>setDataFormClient((prev)=>({...dataFormClient, phone : {...prev.phone, number : evt.target.value}}))}
                    className="flex-1 bg-white text-gris "
                />
            </div>
        </div>
        <div>
            <h1 className='text-white mt-4'>Tiempo esperado de compra <span className='text-red-500'>*</span></h1>
            <ButtonDropdownStatus
            className='bg-white'
            data={expectedTimeList}
            initialData={dataFormClient.expectedTimeToBuy}
            limitContent={3}
            handleChangeStatus={(value, _)=>setDataFormClient({
                ...dataFormClient,
                expectedTimeToBuy : value
              })}
            />  
        </div>
        <div className='mt-4'>
            <h1 className='text-white'>Escribe tu petición para poder contactarnos</h1>
            <Textarea
                className="w-full bg-white  h-40 resize-none"
                name="comment"
                value={dataFormClient.comment}
                onChange={handleChangeInput}
            />
        </div>
        <Button
            onClick={handleClick}
            variant="ghost"
            className="flex justify-center items-center  border border-naranja w-full mt-4 bg-naranja text-white hover:bg-orange-300 hover:text-gris py-5"
        >
           {loadingSaveFormClient ? <p><Loader2 className='animate-spin' /></p> :  <p>Enviar Petición</p>}
        </Button>
    </div>  
  )
}
