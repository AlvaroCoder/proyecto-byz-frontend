import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

export default function ButtonDropdownAntiquity({
    initialData,
    data=[]
}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger
            asChild
        >   
            <Button
                variant="ghost"
                className="border border-slate-100 shadow-sm w-full"
            >   
                {initialData}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            
        </DropdownMenuContent>
    </DropdownMenu>
  )
}