import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function ButtonProfile({nombrePerfil=""}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger
            asChild
        >
            <Button
                variant="ghost"
                className="flex flex-row items-center font-bold py-6 rounded-xl text-gris  border border-gris "
            >
                <AccountCircleIcon/>
                <p className='ml-4 hidden text-lg lg:block'> {nombrePerfil}</p>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Mi cuenta
            </DropdownMenuLabel>
            <DropdownMenuItem
                
            >
                <Button 
                    variant="ghost"
                    className="flex-1"
                >
                    <p className=''>
                        <PersonIcon/>
                        <span className='ml-2'>Ver perfil</span>
                    </p>
                </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Button
                    variant="ghost"
                >
                    <p>
                        <PowerSettingsNewIcon/>
                        <span className='ml-2'>Cerrar Sesión</span>
                    </p>
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
