'use client'
import { X } from 'lucide-react'
import React from 'react'
import FormularioEditProject from '../Tables/elements/FormularioEditProject'

export default function DialogProjectEdit({
    data,
    isOpen=false,
    handleChangeOpen,
    handleSaveNewData,
    handleChangeImage,
    handleChangeInput,
    handleChangeInputGeographiCalDetails,
    handleChangeInputPrice,
    handleAddDataSurroundings,
    handleDeleteDataSurroundings
}) {
    
  return (
    <aside className='relative'>
        {
            isOpen && (
                <div
                    className="z-20 fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" 
                    onClick={handleChangeOpen}
                />
            )
        }

        <div
            className={`z-20 fixed top-0 right-0 max-h-screen overflow-y-auto w-[600px] lg:w-1/2  bg-white shadow-lg p-6 transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <button
                className="absolute top-4 right-4 text-gray-600"
                onClick={handleChangeOpen}
            >
                <X/>
            </button>
            <h2 className='text-3xl font-bold mb-4'>Editar Proyecto</h2>
            <FormularioEditProject
                handleSaveNewData={handleSaveNewData}
                handleChangeImage={handleChangeImage}
                handleChangeInput={handleChangeInput}
                handleChangeInputGeographiCalDetails={handleChangeInputGeographiCalDetails}
                data={data}
                handleChangeInputPrice={handleChangeInputPrice}
                handleAddDataSurroundings={handleAddDataSurroundings}
                handleDeleteDataSurroundings={handleDeleteDataSurroundings}
            />
        </div>
    </aside>
  )
}