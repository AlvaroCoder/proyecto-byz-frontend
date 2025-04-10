'use client'
import React from 'react'
import { TableCell, TableRow } from '../ui/table';
import Image from 'next/image';

export default function CardUsuario({
    dataUsuario=null
}) {
    const {
        user_name,
        first_name,
        last_name,
        phone,
        personal_email,
        company_email,
        photo,
        dni,
        refresh_token,
        role,
        disabled
    } = dataUsuario;

  return (

    <TableRow>
        <TableCell><Image
            src={photo}
            alt='foto de perfil del usuario'
            className='rounded-full'
            width={40}
            height={40}
            /></TableCell>
        <TableCell>
            {first_name}
        </TableCell>
        <TableCell>
            {last_name}
        </TableCell>
        <TableCell>
            <p className='bg-naranja p-1 text-sm text-white rounded-lg w-fit'>{role?.value}</p>
        </TableCell>
        <TableCell>
            {user_name}
        </TableCell>
        <TableCell>
            {phone}
        </TableCell>
        <TableCell>
            {personal_email}
        </TableCell>
        <TableCell>
            {company_email}
        </TableCell>
    </TableRow>
  )
}
