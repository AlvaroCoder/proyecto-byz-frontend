import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'

export default function InputError({
    nameInput,
    placeholderInput="",
    handleChangeInput,
    valueInput="",
    className
}) {
  return (
    <div>
        <Input
            name={nameInput}
            placeholder={placeholderInput}
            onChange={handleChangeInput}
            value={valueInput}
            className={cn("w-full bg-white text-gris p-4", className)}
        />
        
    </div>
  )
}
