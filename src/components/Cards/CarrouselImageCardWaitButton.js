'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarrouselImageCardWaitButton({
    listImages=[]
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevImage=()=>{
        setCurrentIndex((prev)=> (prev === 0 ? listImages?.length - 1 : prev - 1 ));
    }
    const nextImage=()=>{
        setCurrentIndex((prev)=> (prev === listImages.length - 1 ? 0 : prev + 1));
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentIndex((prev) => (prev + 1) % listImages.length)
        }, 9000);
        return ()=>clearInterval(interval);
    },[]);
  return (
    <div className='relative w-full h-full flex flex-row overflow-hidden'>
       <div className='relative w-full'>
            <AnimatePresence mode='wait'>
                <motion.img
                    key={currentIndex}
                    src={listImages[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="absolute w-full h-full object-cover "
                    initial={{opacity : 0, x : 50}}
                    animate={{opacity : 1, x : 0}}
                    exit={{ opacity : 0, x : -50}}
                    transition={{ duration : 0.5 }}
                />
            </AnimatePresence>
       </div>
       <button
        onClick={prevImage}
        className='absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition'
       >
            <ChevronLeft className='w-6 h-6'/>
       </button>

       <button
        onClick={nextImage}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition'
       >
            <ChevronRight className='w-6 h-6' />
       </button>
    </div>
  )
}
