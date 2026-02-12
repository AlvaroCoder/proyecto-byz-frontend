import React from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function ButtonNaranjaTwo({data, handleChange, idx}) {
    const {id,nameItem, isSelected} = data;

  return (
    <div>
        <Button 
        onClick={()=>handleChange(id)}
        variant="ghost"
        className={`p-4 bg-gray-500 rounded-xl mx-2  border-naranja unde text-white ${isSelected && 'bg-naranja'}`}>
            {nameItem}
        </Button>
    </div>
  )
}
