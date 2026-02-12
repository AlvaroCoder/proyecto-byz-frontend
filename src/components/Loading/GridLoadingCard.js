import React from 'react'
import LoadingCards from './elements/LoadingCards';

export default function GridLoadingCard({
    numRows=3,
    numCols=2
}) {
    const totalCards = numRows * numCols;
    
  return (
    <div 
        className={`w-full grid gap-6 grid-cols-${numCols}`}
    >
        {Array.from({ length: totalCards }).map((_, index) => (
            <LoadingCards key={index}/>
        ))}
    </div>
  )
}
