import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function LoadingWindowProject({loading=false}) {
    const URL_LOGO_BYZ="https://res.cloudinary.com/dabyqnijl/image/upload/v1738629648/p13jmnqe8xytp8fggkxa.png";

    return (
   <Dialog
    open={loading}
   >
    <DialogContent
        showClose={false}
        
    >
        <DialogTitle></DialogTitle>
        <div className='w-full flex flex-col justify-center items-center'>
            <Image
                src={URL_LOGO_BYZ}
                alt='Logo de grupo ByZ'
                width={200}
                height={300}
            />
            <Loader2
                className='animate-spin h-24 text-xl'
            />
            <h1 className='mt-4'>Subiendo la información</h1>
        </div>
    </DialogContent>
   </Dialog> 
  )
}
