import React from 'react'

export default function Page() {
  return (
    <div className='w-full p-4 min-h-screen bg-gray-100 overflow-hidden '>
      <h1 className='font-bold text-2xl mb-4'>Información General</h1>
      <section className='w-full grid grid-cols-4 h-32 gap-4'>
        <div className='bg-white shadow-sm rounded-lg'>

        </div>
        <div className='bg-white shadow-sm rounded-lg'>

        </div>
        <div className='bg-white shadow-sm rounded-lg'>

        </div>
        <div className='bg-white shadow-sm rounded-lg'>

        </div>
      </section>
      <section className='w-full grid grid-cols-3 min-h-[500px] mt-8 gap-4'>
          <div className='col-span-2 bg-white rounded-lg'>

          </div>
          <div className='bg-white rounded-lg'>

          </div>
      </section>
    </div>
  )
}