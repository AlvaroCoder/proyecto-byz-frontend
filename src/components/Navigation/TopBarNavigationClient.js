import Image from 'next/image';
import React from 'react'
import { ButtonDropdownNavigation, ButtonNavigation } from './elements';

export default function TopBarNavigationClient() {
    const URL_LOGO_BYZ="https://res.cloudinary.com/dabyqnijl/image/upload/v1738629648/p13jmnqe8xytp8fggkxa.png";

    const routes=[
        {routeName : "Inicio", routeLink : "/", subLinks : [], isSelected  : true},
        {routeName : "Nosotros", routeLink : "/nosotros", subLinks : [], isSelected : false},
        {routeName : "Servicios", routeLink : "/servicios", subLinks : [], isSelected : false},
        {routeName : "Proyectos", routeLink : "/proyectos", subLinks : [
            {subLinkName : "Venta", subLinkRoute : "/proyectos"}
        ], isSelected : false},
        {routeName : "Corretaje", routeLink : "/corretaje", subLinks : [
            {subLinkName : "Venta", subLinkRoute : "/corretaje"},
            {subLinkName : "Alquiler", subLinkRoute : "/corretaje"}
        ], isSelected : false},
    ]
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
    </div>
  )
}