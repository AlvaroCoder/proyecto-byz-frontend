'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useRef } from 'react'

const GOOGLE_MAPS_API = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function GoogleMapCard({
    lat=-12.0464,
    lng=-77.0428
}) {
    return (
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API}>
        <GoogleMap
          mapContainerStyle={{width : "100%", height : "300px"}}
          center={{lat, lng}}
          zoom={17}
        >
          <Marker position={{lat, lng}} />
        </GoogleMap>
      </LoadScript>
    )
};
