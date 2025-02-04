import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function buttonLink({
    hrefLink="/",
    children,
    className
}) {
  return (
    <Button className={cn("p-4 rounded-lg bg-naranja text-white w-full hover:bg-naranja", className)}>
      <Link href={hrefLink} className=''>
        {children}
      </Link>
    </Button>
  )
}
