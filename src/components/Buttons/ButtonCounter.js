'use client'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Aumentar o disminuir el numero de los elementos en un JSON
export default function ButtonCounter({
  handleChangeIncreaseElement,
  handleChangeDecreaseElement
}) {
    const [elements, setElements] = useState(0);

    const increaseElements = () => setElements(elements + 1);
    const decreaseElemts = () => setElements(elements > 0 ? elements - 1 : 1);
  return (
    <div className={`flex items-center border rounded-lg overflow-hidden ${elements > 0 ? 'w-32' : 'w-20'}`}>
        {
            elements > 0 &&
            <button
            onClick={()=>{
              decreaseElemts();
              handleChangeDecreaseElement()
            }}
            className="w-10 h-8 flex items-center justify-center text-gris text-xl border-r  hover:bg-gray-100"
          >
            <RemoveIcon/>
          </button>
        }
      <span className="flex-1 text-center text-lg font-semibold">{elements}</span>
      <button
        onClick={()=>{
          increaseElements()
          handleChangeIncreaseElement();
        }}
        className="w-10 h-8 flex items-center justify-center text-gris text-xl border-l  hover:bg-gray-100"
      >
        <AddIcon/>
      </button>

    </div>
  )
};