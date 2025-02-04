import Link from 'next/link';
import React from 'react'

export default function buttonNavigation({
  data
}) {
  const {isSelected, routeName, routeLink} = data;
  return (
    <Link href={routeLink} className={`p-4 w-fit  mx-1 rounded-lg hover:bg-gray-100 ${isSelected && 'bg-naranja hover:bg-naranja text-white'}`}>
      <p>{routeName}</p>
    </Link>
  )
}
