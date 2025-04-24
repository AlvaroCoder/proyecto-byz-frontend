'use client'
import { SAVE_COMPLAINENT_BOOK } from '@/lib/apiConnections';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Page() {
        const [formData, setFormData] = useState({
        first_name:"",
        last_name:"",
        dni:"",
        email:"",
        department:"",
        province:"",
        district:"",
        domicile:"",
        minor:false,
        type_of_good:"",
        type_of_claim:"",
        detail_of_claim:""
      })
      const [submitted, setSubmitted] = useState(false);
      const [loading, setLoading] = useState(false)
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        })
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(formData);
        setLoading(true);
        const response = await SAVE_COMPLAINENT_BOOK(formData);
        console.log(await response.json());
        toast.success("Se envio correctamente el formulario")
        setLoading(false)
      }
    
      return (
        <section

        >
            <section className='w-full min-h-[200px] bg-naranja flex justify-center items-center'>
                <h1 className='text-white font-bold text-4xl'>Libro de Reclamaciones</h1>
            </section>
            <section className='w-full py-10'>
                <div className="max-w-xl mx-auto p-6 bg-white  rounded-xl mt-8 ">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='my-2'>
                            <label className="block font-bold text-gray-700 mb-2">Nombre completo <span className='text-red-500'>*</span></label>
                            <div className='flex flex-row items-center gap-4'>
                                <div className='flex-1'>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    <h1 className='text-gray-500 text-sm'>Nombre</h1>
                                </div>
                                <div className='flex-1'>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    <h1 className='text-gray-500 text-sm'>Apellido</h1>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className='block font-bold text-gray-700 mb-2'>DNI <span className='text-red-500'>*</span></label>
                            <div>
                                <input
                                    type='number'
                                    name='dni'
                                    value={formData?.dni}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <h1 className='text-gray-500 text-sm'>0 of 8 max characters.</h1>
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">Correo electrónico <span className='text-red-500'>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Provincia <span className='text-red-500'>*</span></label>
                            <input
                                name='province'
                                value={formData.province}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Distrito <span className='text-red-500'>*</span></label>
                            <input
                                name='district'
                                value={formData.district}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Domicilio <span className='text-red-500'>*</span></label>
                            <input
                                name='domicile'
                                value={formData.domicile}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Departamento <span className='text-red-500'>*</span></label>
                            <input
                                name='department'
                                value={formData.department}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">¿ Menor de edad ? <span className='text-red-500'>*</span></label>
                            <select
                                name="minor"
                                value={formData.minor}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                            >
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="">
                            <label className="block text-gray-700 font-bold mb-2">Tipo de Bien <span className='text-red-500'>*</span></label>
                            <div className="flex flex-col space-y-3">
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="type_of_good" value={formData.type_of_good} onChange={handleChange} className="text-naranja focus:ring-black" />
                                    <span>Producto</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="type_of_good" value={formData.type_of_good} onChange={handleChange} className="text-naranja focus:ring-black" />
                                    <span>Servicio</span>
                                </label>
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-gray-700 font-bold mb-2">Detalle del reclamación <span className='text-red-500'>*</span></label>
                            <div className="flex flex-col space-y-3">
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="type_of_claim" value={formData.type_of_claim} onChange={handleChange} className="text-naranja focus:ring-black" />
                                    <span>Reclamo (1)</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="type_of_claim" value={formData.type_of_claim} onChange={handleChange} className="text-naranja focus:ring-black" />
                                    <span>Queja (2)</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Descripción <span className='text-red-500'>*</span></label>
                            <textarea
                                name="detail_of_claim"
                                value={formData.detail_of_claim}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full border border-gray-300 p-2 rounded-lg resize-none focus:ring-black"
                            />
                        </div>
                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-naranja text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-300 transition flex justify-center items-center"
                        >
                            {loading ?<span className='text-center'> <Loader2 className='animate-spin' /> </span>: <span> Enviar Reclamo</span>}
                        </button>
                        {submitted && (
                        <div className="text-green-600 text-center font-medium mt-2">
                            Reclamo enviado correctamente.
                        </div>
                        )}
                    </form>
                </div>
            </section>
        </section>
      )
}
