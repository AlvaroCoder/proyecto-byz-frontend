import React from 'react'
import { Skeleton } from '../../ui/skeleton'

export default function LoadingCards() {
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-sm overflow-hidden'>
        <div className='w-full p-4'>
            <Skeleton
              className={'w-full h-48 rounded-lg'}
            />
        </div>
      <section className='p-4'>
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
      </section>
    </div>
  )
};
