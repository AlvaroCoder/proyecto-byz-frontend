import React from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'

export default function ButtonDialogStatus({
    data=[],
    initialData="",
    handleChangeStatus,
    limitContent=1,
    className=""
}) {
   
    
  return (
    <DropdownMenu>
        <DropdownMenuTrigger
            asChild
        >
            <Button
                variant="ghost"
                className={cn('border border-slate-100 shadow-sm w-full', className)}
            >
                {initialData}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
           {
            data?.map((item, idx)=>{
                if (idx <= limitContent) {
                    return <DropdownMenuCheckboxItem 
                    key={idx}
                    className="capitalize"
                    onCheckedChange={()=>{
                        const jsonSelected = data?.filter(elem=>elem.value.toUpperCase() === item.value.toUpperCase())[0];                        
                        handleChangeStatus(jsonSelected?.value, jsonSelected?.id);
                    
                    }}
                    checked={item.value.toUpperCase() === initialData.toUpperCase()}
                    >
                        <p className='w-full max-w-full'>{item?.value}</p>
                </DropdownMenuCheckboxItem>
                }
                return null;
            })
            
           }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
