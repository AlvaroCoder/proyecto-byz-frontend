'use client'
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { ButtonDropdownProperties } from '../Buttons'
import { Button } from '../ui/button'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation'
import { useLoadScript } from '@react-google-maps/api'


const libraries = ['places'];

export default function SearchPropertyBanner() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Usa variables de entorno
        libraries,
    });

    const inputRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState({
        lat : -12.0464,
        lng : -77.0428
    });
    
    const handleInput =(evt)=>{
        const value = evt.target.value;
        if (!value || !isLoaded) return;   
        console.log(value);
             
        const services = new google.maps.places.AutocompleteService();
        services.getPlacePredictions((predictions, status)=>{
            if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                console.log(predictions);
                
                setSuggestions(predictions);
            }else{
                setSuggestions([])
            }
        })
    }

    const handleSelect=(placeId, description)=>{
        if(!isLoaded) return;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({placeId}, (results, status)=>{
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                const location = results[0].geometry.location;
                setSelectedPlace({lat : location?.lat(), lng: location?.lng()});
                if (inputRef.current) {
                    inputRef.current.value = description;
                }
                setSuggestions([]);
            }
        })
    }

    const handleBuscar =()=>{
        if (selectedPlace) {
            const { lat, lng } = selectedPlace;
            const url = `/corretaje?lat=${lat}&lng=${lng}`;
            window.open(url, '_blank');
        } else {
            alert("Selecciona una ubicación válida.");
        }
    }
    const typeSearch=[
        {value : "Alquilar", isSelected : true},
        {value : "Comprar", isSelected : false},
        {value : "Proyectos", isSelected : false}
    ]
    const variantProperties=[
        {value : "Todos", isSelected : true},
        {value : "Casas", isSelected : false},
        {value : "Departamentos", isSelected : false},
        {value : "Oficinas", isSelected : false},
        {value : "Terrenos", isSelected : false},
        {value : "Locales", isSelected : false},
        {value : "Edificios", isSelected : false}
    ]
    const [stateTypeSearch, setStateTypeSearch] = useState(typeSearch);
    const [stateVariantProperty, setStateVariantProperty] = useState(variantProperties);

    const handleChangeTypeSearch=(key)=>{
        const newStateTypeSearch = typeSearch.map((item, idx)=>{
            if (key === idx) {
                return {
                    ...item,
                    isSelected : true
                }
            }
            return {
                ...item,
                isSelected : false
            }
        });        
        setStateTypeSearch(newStateTypeSearch);
    }
    const handleChangePropertie=(idx)=>{
        const newDataPropertie = stateVariantProperty.map((item, key)=>{
            if (key===idx) {
                return {
                    ...item,
                    isSelected : true
                }
            }
            return {
                ...item,
                isSelected : false
            }
        });
        setStateVariantProperty(newDataPropertie);
    }
  return (
    <div className='relative mt-8  w-full h-24 rounded-lg flex flex-col justify-center items-center'>
        <div className='w-full'>
            <ul className='w-fit flex flex-row bg-white rounded-t-lg px-2 '>
                {
                    stateTypeSearch?.map((item,idx)=>
                        <li 
                            key={idx}
                            onClick={()=>handleChangeTypeSearch(idx)}
                            className={`p-4 cursor-pointer border-b-2 ${item?.isSelected ? 'border-b-naranja' : 'border-b-gray-100'}  hover:bg-gray-100 hover:underline`}    
                        >{item?.value}</li>)
                }
            </ul>
        </div>
        {
            !isLoaded ?
            <p>Cargando ...</p>:
            <div className='relative w-full flex flex-row bg-white p-4 rounded-b-lg rounded-r-lg'>
                <ButtonDropdownProperties
                    data={stateVariantProperty}
                    handleChangeStatus={handleChangePropertie}
                />
                <input
                    placeholder="Escribe una ciudad, ej: Piura"
                    className="outline-none w-full px-4 py-3 border border-gris rounded-lg text-lg ml-2"
                    ref={inputRef}
                    type='text'
                    onChange={handleInput}
                />  
                
                <Button 
                    variant="ghost"
                    onClick={handleBuscar}
                    className="bg-naranja border shadow-none text-lg font-bold rounded-xl w-32 h-14 text-white hover:bg-orange-400 hover:text-white  border-none p-5 ml-2">
                    <h1> Buscar </h1>
                </Button>
            </div>
        }
        {
            suggestions.length > 0 &&
            (
                <div className='absolute top-28 max-w-xl rounded-lg w-full bg-white p-2'>
                    <ul className=' rounded-lg mt-2 max-h-48 flex flex-col overflow-y-auto  shadow-md'>
                        {suggestions.map((suggestion) => (
                            <li
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion.place_id, suggestion.description)}
                            className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                            {suggestion.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    </div>
  )
}