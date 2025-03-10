'use client'
import { useFetch } from '@/app/hooks/useHooks';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {
  const router = useRouter();
  const URL_STATUS=process.env.NEXT_PUBLIC_GET_STATUS_PROPERTIES;
  const [loadingDataSave, setLoadingDataSave] = useState(false);

  const [dataNewProperties, setDataNewProperties] = useState({
    name : "",
    description : "",
    location : {
      detailedLocation : null,
      surroundings : []
    },
    geographicalDetails : {
      totalArea : {
        frontage : "",
        depth : "",
        units : "mt2"
      },
      coveredArea :  {
        frontage : "",
        depth : "",
        units : "mt2"
      }
    },
    features : {
      antiquity : null,
      floors : 0,
      rooms : 0,
      bathrooms : 0,
      garage : 0,
      waterService : false,
      lightService : false
    },
    images : [],
    status : '',
    price : {
      soles : "",
      dolar : ""
    },
    reservedTime : (new Date()).toISOString(),
    creationTime : (new Date()).toISOString()
  });

  const {data : dataStatusProperties, loading : loadingStatusProperties, error : errorDataStatusProperties} = useFetch(URL_STATUS);
  return (
    <div>Page</div>
  )
}