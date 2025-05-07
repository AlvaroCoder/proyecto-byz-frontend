'use client'
import React from 'react'
import { TableCell, TableRow } from '../ui/table';
import Image from 'next/image';
import { Button } from '../ui/button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dialog } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
            {phone}
        </TableCell>
        <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                    >
                        <MoreVertIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className={cn(
                        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                        "flex flex-col"
                    )}
                >
                    <Button variant="ghost" >
                        <p className='flex flex-row justify-center items-center'> <EditIcon/> <span>Editar</span></p>
                    </Button>
                    <Button variant="ghost">
                        <p className='flex flex-row justify-center items-center'> <DeleteIcon/> <span>Eliminar</span></p>
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
  )
}
