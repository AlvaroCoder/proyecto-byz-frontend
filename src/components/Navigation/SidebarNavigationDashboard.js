'use client'
import Image from 'next/image'
import React, { useState } from 'react'

import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import RoofingIcon from '@mui/icons-material/Roofing';
import PersonIcon from '@mui/icons-material/Person';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Link from 'next/link';

export default function SidebarNavigationDashboard() {
  const URL_LOGO_BYZ="https://res.cloudinary.com/dabyqnijl/image/upload/v1738689199/myayetxnfikdfmvwhxev.png";
  const [openSidebar, setOpenSidebar] = useState(true);
  const routes=[
    {
        routeName : "Inicio",
        routePath : "/admin/dashboard/",
        routeIcon : HomeIcon,
        selected : true
    },
    {
        routeName : "Proyectos",
        routePath : "/admin/dashboard/projects",
        routeIcon : ConstructionIcon,
        selected : false
    },
    {
      routeName : "Propiedades",
      routePath : "/admin/dashboard/propiedades",
      routeIcon : HolidayVillageIcon,
      selected : false
    },
    {
        routeName : "Servicios",
        routePath : "/admin/dashboard/services",
        routeIcon : RoofingIcon,
        selected : false
    },

];  


  const [routesDashboard, setRoutesDashboard] = useState(routes);
  const handleClickRoute=(idx)=>{
    const newDataLinks=routesDashboard?.map((item, index)=>{
      if (index === idx) {
        return {
          ...item,
          selected : true
        }
      }
      return {
        ...item,
        selected : false
      }
    });
    setRoutesDashboard(newDataLinks);
  }
  return (
    <section className={`${openSidebar ? 'w-48' : 'w-20'} min-h-screen flex flex-col items-center py-2 border-r-[1px] border-r-gris`}>
        <Image
          src={URL_LOGO_BYZ}
          width={200}
          alt='Logo de grupo ByZ'
          height={200}
        />
        <div className='w-full p-4'>
          <ul className='text-gris'>
            {
              routesDashboard.map((item, idx)=>{
                const Icon = item.routeIcon;
                return (
                <Link
                  key={idx}
                  href={item?.routePath}
                  onClick={()=>handleClickRoute(idx)}
                >
                  <li
                    className={`mt-2 ${item.selected ? 'bg-orange-300' : 'bg-white'} hover:bg-orange-300 p-4 rounded-lg cursor-pointer flex flex-row items-center`}
                  > 
                    <Icon/>
                    <p className='ml-2'>{item?.routeName}</p>
                  </li>
                </Link>)
              })
            }
          </ul>
        </div>
    </section>
  )
}
