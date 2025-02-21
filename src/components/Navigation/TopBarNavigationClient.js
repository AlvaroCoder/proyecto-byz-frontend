'use client'
import Image from 'next/image';
import React from 'react'
import { ButtonDropdownNavigation, ButtonNavigation } from './elements';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function TopBarNavigationClient() {
    const pathname = usePathname();
    const URL_LOGO_BYZ="https://res.cloudinary.com/dabyqnijl/image/upload/v1738689199/myayetxnfikdfmvwhxev.png";
    //   const URL_LOGO_BYZ="https://res.cloudinary.com/dabyqnijl/image/upload/v1738689199/myayetxnfikdfmvwhxev.png";

    const routes=[
        {routeName : "Inicio", routeLink : "/", subLinks : [], isSelected  : true},
        {routeName : "Nosotros", routeLink : "/nosotros", subLinks : [], isSelected : false},
        {routeName : "Servicios", routeLink : "/servicios", subLinks : [], isSelected : false},
        {routeName : "Proyectos", routeLink : "/proyectos", subLinks : [
            {subLinkName : "PreVenta", subLinkRoute : "/proyectos"},
            {subLinkName : "Venta", subLinkRoute : "/proyectos"}
        ], isSelected : false},
        {routeName : "Inmmuebles", routeLink : "/corretaje", subLinks : [
            {subLinkName : "Venta", subLinkRoute : "/corretaje"},
            {subLinkName : "Alquiler", subLinkRoute : "/corretaje"}
        ], isSelected : false},
    ].map(item=>{
        if (item?.routeLink == pathname) {
            return {
                ...item,
                isSelected : true
            }
        }
        return {
            ...item,
            isSelected : false
        }
    });

  return (
    <div className='w-full h-20 shadow-sm px-4 flex flex-row items-center justify-between'>
        <section>
            <Image
                src={URL_LOGO_BYZ}
                alt='Logo de empresa ByZ'
                width={80}
                height={80}
            />
        </section>
        <ul className='flex flex-row items-center'>
            {
                routes.map((item,key)=>{
                    if (item?.subLinks.length > 0) {
                        return (<ButtonDropdownNavigation key={key} data={item}/>)
                    }
                    return <ButtonNavigation key={key} data={item}/>
                })
            }
        </ul>
        <section>
            <Button
                variant="ghost"
                className="p-4 text-naranja bg-white border-naranja border-2 hover:text-naranja rounded-lg"
            >
                <Link href={"/contacto"}>
                    <p>Contactanos</p>
                </Link>
            </Button>
        </section>
    </div>
  )
}