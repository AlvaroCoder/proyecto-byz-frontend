import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function LoadingMainBannerCard() {
  return (
    <section className='w-full '>
        <div className='w-full min-h-[500px] grid grid-cols-3 '>
            <div className='col-span-2 p-4'>
                <Skeleton className={'w-full h-full animate-pulse'}/>
            </div>
            <div className='p-4'>
                <Skeleton className={'w-full h-full animate-pulse'}/>
            </div>
        </div>
        <div className='w-full h-32 flex flex-row items-center justify-center p-4'>
            <Skeleton className={'w-full h-full'}/>
        </div>
    </section>
  )
}
