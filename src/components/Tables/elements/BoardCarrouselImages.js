'use client'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import UploadIcon from '@mui/icons-material/Upload';

export default function BoardCarrouselImages({
    dataImages,
    handleChangeImages
}) {
    
    const onDrop = useCallback((acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));

        handleChangeImages((prevData) => ({
            ...prevData,
            images : [...prevData?.images, ...newImages]
        }));
      }, []);

      const removeImage = (index) => {
        handleChangeImages((prevData)=>({
            ...prevData,
            images : prevData?.images.filter((_,i)=>i!==index)
        }))
      };

      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true,
      });
  return (
    <section
        className='w-full '
    >
        <div className="flex gap-3 flex-wrap">
        {dataImages?.images?.map((img, index) => (
          <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
            <img src={img.preview} alt="preview" className="w-full h-full object-cover rounded-lg" />
            <button 
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow"
              onClick={() => removeImage(index)}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Área de Drop */}
        <div
          {...getRootProps()}
          className={`${dataImages?.images?.length > 0 ? 'w-28' : 'w-full'}  h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer`}
        >
          <input {...getInputProps()} />
          <span className="text-gray-500 text-sm"><UploadIcon/> Sube una foto o arrastra una aquí</span>
        </div>
      </div>
    </section>
  )
}
