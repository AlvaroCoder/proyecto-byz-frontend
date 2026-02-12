import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Image from 'next/image'

export default function TableRealAgent({
    data=[],
    handleChangeSelectAgent
}) {
    const [currentData, setCurrentData] = useState(data?.map(item=>{
        return {
            ...item,
            isSelected : false
        }
    }));
    const handleChangeSelected =()=>{
        const newCurrentData=currentData?.filter((item)=>{

        })
    }
  return (
   <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Foto de Perfil</TableHead>
                <TableHead>Correo</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                data?.map((item,idx)=>
                    <TableRow key={idx}>
                        <TableCell onClick={()=>handleChangeSelectAgent(item)}  className="cursor-pointer hover:underline">{item?.first_name}</TableCell>
                        <TableCell className="cursor-pointer hover:underline">{item?.last_name}</TableCell>
                        <TableCell>
                            <Image
                                src={item?.photo}
                                alt='Imagen de Perfil'
                                width={30}
                                height={30}
                                className='rounded-full'
                            />
                        </TableCell>
                        <TableCell>{item?.personal_email}</TableCell>
                    </TableRow>
                )
            }
        </TableBody>
   </Table>
  )
}
