'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ButtonDropdownNavigation, ButtonNavigation } from './elements';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function TopBarNavigationClient() {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(()=>{
        const handleScroll =()=>{
            if (window.scrollY > 100) {
                setIsFixed(true);
              } else {
                setIsFixed(false);
              }
        };
        window.addEventListener('scroll', handleScroll);
        return ()=> window.removeEventListener("scroll", handleScroll);
    },[]);

    const pathname = usePathname();
    const encuentraPaginaAdmin = pathname.split("/").includes("admin");
    const URL_LOGO_BYZ="https://res.cloudinary.com/dabyqnijl/image/upload/v1738689199/myayetxnfikdfmvwhxev.png";
    const routes=[
        {routeName : "Inicio", routeLink : "/", subLinks : [], isSelected  : true},
        {routeName : "Nosotros", routeLink : "/nosotros", subLinks : [], isSelected : false},
        {routeName : "Servicios", routeLink : "/servicios", subLinks : [], isSelected : false},
        {routeName : "Proyectos", routeLink : "/proyectos", subLinks : [
            {subLinkName : "PreVenta", subLinkRoute : "/proyectos"},
            {subLinkName : "Venta", subLinkRoute : "/proyectos"}
        ], isSelected : false},
        {routeName : "Buscar inmuebles", routeLink : "/corretaje", subLinks : [], isSelected : false},
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
    <div
        className={isFixed ? 'h-20' : ''}
    >
        <nav className={` 
            ${isFixed ? 
                'fixed top-0 left-0 w-full shadow-md z-50 ': 'relative'
            }bg-white w-full h-20  px-4 flex flex-row items-center justify-between ${encuentraPaginaAdmin ? 'hidden' : 'block'}`}>
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
        </nav>
    </div>
  )
}