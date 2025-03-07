'use client'
import { motion,AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from 'react'
import { Button } from '../ui/button';

export default function CarrouselImagesCard({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    
    const nextImage = () => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    
    return (
        <div className="relative w-full  mx-auto overflow-hidden rounded-lg">
        {/* Contenedor de imágenes */}
        <div className="relative w-full h-48">
          <AnimatePresence>
            <motion.img
              key={typeof(images[currentIndex]) === "string" ? images[currentIndex] : images[currentIndex]?.preview}
              src={typeof(images[currentIndex]) === "string" ? images[currentIndex] : images[currentIndex]?.preview}
              alt={`Slide ${currentIndex}`}
              className="absolute w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
  
        {/* Botón izquierdo */}
        <button
         
          onClick={prevImage}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
  
        {/* Botón derecho */}
        <button
           
          onClick={nextImage}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
  )
}
