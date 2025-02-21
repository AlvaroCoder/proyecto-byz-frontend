import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function ButtonNaranja({className,text, onClick}) {
  return (
    <Button
        onClick={onClick}
        variant="ghost"
        className={cn("bg-naranja text-white hover:bg-orange-300 hover:text-white p-6", className)}
    >
        <p>{text}</p>
    </Button>
  )
}
