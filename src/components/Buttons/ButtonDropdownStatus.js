import React from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

export default function ButtonDialogStatus({
    data=[],
    initialData="",
    handleChangeStatus
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
           {
            data?.map((item, idx)=>{
                if (idx <= 1) {
                    return <DropdownMenuCheckboxItem 
                    key={idx}
                    className="capitalize"
                    onCheckedChange={()=>{
                        const jsonSelected = data?.filter(elem=>elem.value.toUpperCase() === item.value.toUpperCase())[0]
                        console.log(jsonSelected);
                        
                        handleChangeStatus(jsonSelected?.value);
                    
                    }}
                    checked={item.value.toUpperCase() === initialData.toUpperCase()}
                    >
                        {item?.value}
                </DropdownMenuCheckboxItem>
                }
                return null;
            })
            
           }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
