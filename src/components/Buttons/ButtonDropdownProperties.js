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
                className="border max-w-40 border-gris h-14 rounded-lg w-full p-5 text-lg "
            >
                {data.filter(item=>item.isSelected)[0]?.value }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                data?.map((item, idx)=>
                <DropdownMenuCheckboxItem 
                    key={idx}
                    
                    className="capitalize hover:bg-orange-500 text-lg"
                    onCheckedChange={()=>handleChangeStatus(idx)}
                    checked={item?.isSelected}
                >
                    <h1>{item?.value}</h1>
                </DropdownMenuCheckboxItem>)
            }
        </DropdownMenuContent>
   </DropdownMenu>
  )
}