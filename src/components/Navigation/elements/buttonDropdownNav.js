'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import React, { useState } from 'react'

export default function buttonDropdownNav({data}) {
  const {isSelected, routeName, routeLink, subLinks} = data;
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} >
      <DropdownMenuTrigger  asChild>
          <Link href={routeLink} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}  className={`p-4 w-fit  mx-1 rounded-lg hover:bg-gray-100 ${isSelected && 'bg-naranja hover:bg-naranja  text-white'}`}>
            <p>{routeName}</p>
          </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0"   onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} >
        <section className='flex flex-col w-full py-4 '>
          {
            subLinks?.map(((item, key)=>(
              <Link href={item?.subLinkRoute} key={key} className='p-2 hover:border-l-naranja hover:border-l-4 hover:bg-gray-100 w-full'>
              <p >{item?.subLinkName}</p>
              </Link>
            )))
          }
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
