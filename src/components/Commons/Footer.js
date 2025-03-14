'use client'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Footer() {
  const pathname = usePathname();
  const existeRutaAdmin = pathname.split("/").includes("admin");

  const IMAGEN_LOGO="https://res.cloudinary.com/dabyqnijl/image/upload/v1738629648/p13jmnqe8xytp8fggkxa.png";
  const IMAGEN_LIBRO_RECLAMACIONES="https://res.cloudinary.com/dabyqnijl/image/upload/v1738690309/pumozpk2jg2btsg3unr3.png";
  return (
    <footer className={`w-full bg-gray-100 h-fit flex flex-col py-8 ${existeRutaAdmin ? 'hidden' : 'block'}`}>
      <section className='w-full py-10 flex justify-between items-center px-10'>
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={IMAGEN_LOGO} // Cambia esto por la URL real de tu logo
          alt="Grupo B&Z"
          width={300}
          height={300}
        />
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
          </a>
        </div>
      </div>

      {/* Libro de Reclamaciones */}
      <div className="border border-gray-300 p-6 rounded-lg flex flex-col items-center">
        <Image
          src={IMAGEN_LIBRO_RECLAMACIONES}
          width={200}
          height={200}
          alt='Imagen Libro de Reclamaciones'
        />
      </div>

      {/* Información de contacto */}
      <div className="text-gray-700 text-sm">
        <div>
          <h3 className="font-bold">UBICACIÓN</h3>
          <p>Sede: Las Esmeraldas B8 II etapa Castilla – Piura</p>
          <p>Ref. Frente a plataforma deportiva Las Esmeraldas.</p>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">CONTACTO</h3>
          <p>Celular: +51 943 420 500</p>
          <p>Correo: <a href="mailto:contactenos@grupobyz.com" className="text-blue-500">contactenos@grupobyz.com</a></p>
        </div>
      </div>
      </section>
      <section className='w-full flex justify-center items-center text-sm'>
          <p className='text-gray-500'>@2025 Copyrigth by COSAI branding</p>
      </section>
    </footer>
  )
};