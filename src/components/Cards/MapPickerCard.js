'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import SearchIcon from '@mui/icons-material/Search';
//AIzaSyCxowAXa5xjT23Nm7nk1NjNs2hQ-zoSEqg

const GOOGLE_MAPS_API = "AIzaSyCxowAXa5xjT23Nm7nk1NjNs2hQ-zoSEqg";

export default function MapPickerCard({
    handleChange
}) {
    const [location, setLocation] = useState({
        lat: -12.0464, 
        lng: -77.0428,
    });
    const inputRef = useRef(null);
    const handleSearchLocation = () => {
        const address = inputRef.current.value;
        if (!address) return;
    
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const newLocation = results[0].geometry.location;
            setLocation({
              lat: newLocation.lat(),
              lng: newLocation.lng(),
            });
          } else {
            alert("Ubicación no encontrada");
          }
        });
      };
  return (
    <div className="w-full  mx-auto mt-2">
    <h1 className=''>Ubicación <span className='text-red-500'>*</span></h1>
    {/* Input de búsqueda */}
    <div className="flex items-center space-x-2 mb-4">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Buscar ubicación ... "
        required
      />
      <Button
        onClick={handleSearchLocation}
        variant=""
        className="text-white"
      >
       <p className='flex flex-row items-center'> <SearchIcon/><span className='ml-2'> Buscar</span></p>
      </Button>
    </div>

    {/* Mapa */}
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "300px" }}
        center={location}
        zoom={14}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>

    {/* Información de ubicación */}
    <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm">
      <p><strong>Latitud:</strong> {location.lat}</p>
      <p><strong>Longitud:</strong> {location.lng}</p>
    </div>
  </div>
  )
}
