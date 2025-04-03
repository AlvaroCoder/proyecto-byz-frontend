import { CardPropertySimple, CarrouselImagesCard } from '@/components/Cards';
import Image from 'next/image';
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SeparatorForms } from '@/components/Commons';

export default function BoardProperties({
    data=[],
    handleChangeLoading
}) {
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const handleClickEdit=(item)=>{
    setDataEdit(item);
    setIsOpenFormEdit(true);
  }
  return (
    <section className='w-full min-h-screen'>
      <div className='w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 py-4'>
        {
          data?.map((item, idx)=>
          <div 
            key={idx}
            onClick={()=>handleClickEdit(item)}
          >
            <CardPropertySimple
              data={item}
            />
          </div>
          )
        }
      </div>
    </section>
  )
}
