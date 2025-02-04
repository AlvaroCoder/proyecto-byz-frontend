'use client'
import React from 'react'
import { motion } from "framer-motion";

export default function ImageGrid({
    listImages
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
        {/* Imagen Izquierda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gray-300 w-48 h-48 flex items-center justify-center"
        >
          <span className="text-gray-500">Imagen 1</span>
        </motion.div>

        {/* Contenedor de imágenes derecha */}
        <div className="flex flex-col gap-4">
        {/* Imagen superior derecha */}
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="bg-gray-300 w-48 h-48 flex items-center justify-center">
            <span className="text-gray-500">Imagen 2</span>
        </motion.div>

        {/* Imagen inferior derecha */}
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-gray-300 w-48 h-48 flex items-center justify-center">
            <span className="text-gray-500">Imagen 3</span>
        </motion.div>
        </div>
    </div>
  )
}
