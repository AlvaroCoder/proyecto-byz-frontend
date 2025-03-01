import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export default function ButtonNaranja({className,text, onClick, loading=false}) {
  return (
    <Button
        onClick={onClick}
        variant="ghost"
        disabled={loading}
        className={cn("bg-naranja text-white hover:bg-orange-300 hover:text-white p-6", className)}
    >
        {loading ? <Loader2 className='animate-spin'/> : <p>{text}</p>}
    </Button>
  )
}
