import { cn } from '@/lib/utils'
import React from 'react'

export default function Tittle({className, children}) {
  return (
    <h1 className={cn('font-bold text-3xl', className)}>{children}</h1>
  )
}
