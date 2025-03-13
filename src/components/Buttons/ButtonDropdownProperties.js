'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

export default function ButtonDropdownProperties({
    data=[],
    handleChangeStatus
}) {
  return (
   <DropdownMenu>
        <DropdownMenuTrigger
            asChild
        >
            <Button
                variant="ghost"
                className="border max-w-36 border-gris w-full p-5 text-lg "
            >
                {data.filter(item=>item.isSelected)[0]?.value }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                data?.map((item, idx)=>
                <DropdownMenuCheckboxItem 
                    key={idx}
                    
                    className="capitalize hover:bg-naranja"
                    onCheckedChange={()=>handleChangeStatus(idx)}
                    checked={item?.isSelected}
                >
                    {item?.value}
                </DropdownMenuCheckboxItem>)
            }
        </DropdownMenuContent>
   </DropdownMenu>
  )
}