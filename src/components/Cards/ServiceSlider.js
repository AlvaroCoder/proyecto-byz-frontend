'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import "swiper/css";
import "swiper/css/pagination";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from "swiper/modules";
export default function ServiceSlider({data=[]}) {
  return (
    <section className='w-full mx-auto relative z-0 py-4 px-2'>
        <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            pagination={{
                clickable : true,
                el : ".custom-pagination"
            }}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },

            }}
            className=''
        >
            {
                data?.map((item, key)=>(
                    <SwiperSlide 
                        key={key}>
                        <div className='bg-white rounded-lg shadow-md overflow-hidden '>
                            <div className='h-72 bg-gray-300 flex justify-center items-center'>
                                <Image 
                                src={item?.image} 
                                width={100}
                                height={100}
                                alt='Imagen de tarjeta'
                                className="h-full w-full object-cover"
                                 />
                            </div>
                            <div className='p-4'>
                                <h3 className='text-lg font-bold'>{item?.title}</h3>
                                <p className='text-gray-600 text-sm'>{item?.description}</p>
                                <Link href={"/"} className='text-naranja font-semibold mt-2 inline-block border-b border-b-naranja'>
                                    Mas información
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        {/** Seccion de las bolitas */}
        <div className="custom-pagination mt-6 w-full"></div>

    </section>
  )
}
