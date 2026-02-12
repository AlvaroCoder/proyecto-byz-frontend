import React from 'react'

export default function BoardEmptyProjects({
  texto="No existen proyectos"
}) {
  return (
    <div className='w-full rounded-lg p-4 flex justify-center items-center min-h-24 bg-white mt-4'>
        <p>{texto}</p>
    </div>
  )
}
