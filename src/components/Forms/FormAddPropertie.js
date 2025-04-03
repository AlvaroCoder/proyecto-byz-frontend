'use client'
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ButtonCounter, ButtonDropdownStatus } from '../Buttons'
import { Loader2 } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { BoardCarrouselImages } from '../Tables/elements'
import { CardPropertySimple, CardShowRealAgent, CarrouselImagesCard, MapPickerCard } from '../Cards';
import Image from 'next/image'

import AddIcon from '@mui/icons-material/Add';
import ShowerIcon from '@mui/icons-material/Shower';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GarageIcon from '@mui/icons-material/Garage';
import { Switch } from '../ui/switch'
import { SeparatorForms } from '../Commons'
import { useFetch } from '@/app/hooks/useHooks'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CREATE_PROPERTY, UPLOAD_IMAGE } from '@/lib/apiConnections'
import { useRouter } from 'next/navigation'

export default function FormAddPropertie({
    dataJSON,
    handleChangeLoading
}) {
    const router = useRouter();
    const refInputNearPlaces = useRef(null);
    const URL_STATUS=process.env.NEXT_PUBLIC_GET_STATUS_PROJECTS;
    const {data : dataStatusProject, error, loading : loadingDataStatusProject} = useFetch(URL_STATUS);

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
            unit : "mt2"
          },
          coveredArea :  {
            frontage : "",
            depth : "",
            unit : "mt2"
          }
        },
        features : {
          antiquity : {
            quantity : "",
            unit : "Meses"
          },
          floors : 0,
          rooms : 0,
          bathrooms : 0,
          garage : 0,
          waterService : false,
          lightService : false
        },
        images : [],
        status : 'Venta disponible',
        price : {
          soles : "",
          dolar : ""
        },
        reservedTime : (new Date()).toISOString(),
        creationTime : (new Date()).toISOString()
    });
    

    const [dataGeographicalDetail, setDataGeographicalDetail] = useState({
        frontage : "",
        depth : '',
        unit : 'm2'
    });

    const totalArea = Number(dataGeographicalDetail?.depth)*Number(dataGeographicalDetail.frontage);
    const [dataGeographicalCoveredDetail, setDataGeographicalCoveredDetail] = useState({
        frontage : "",
        depth : "",
        unit: "mt2"
    });

    const totalAreaCovered = Number(dataGeographicalCoveredDetail?.depth)*Number(dataGeographicalCoveredDetail?.frontage);
    
    const [dataAntiquityTimes, setDataAntiquityTimes] = useState([
        {value : "Meses"},
        {value : "Años"}
    ]);

    // Funcion de cambiar el valor del input de GeographicalDetail
    const handleChangeGeographicalDetail=(evt)=>{
        const target = evt.target;
        setDataGeographicalDetail({
            ...dataGeographicalDetail,
            [target.name] : Number(target.value)
        });
    }

    // Funcion de cambiar el valor del input de DetailCovered
    const handleChangeGrographicalDetailCovered=(evt)=>{
        const target = evt.target;
        setDataGeographicalCoveredDetail({
            ...dataGeographicalCoveredDetail,
            [target.name] : Number(target.value)
        });
    }

    // Funcion de cambiar el valor del input
    const handleChangeInput=(evt)=>{
        const target = evt.target;
        setDataNewProperties({
            ...dataNewProperties,
            [target.name] : target.value
        })
    }

    // Funcion de cambiar el valor del input de precio
    const handleChangePrice=(evt)=>{
        const target = evt.target;
        setDataNewProperties(prev=>({
            ...prev,
            price : {
                ...prev.price,
                [target.name] : target.value
            }
        }))
    }
    
    // Funcion para cambiar los valores del MAPA insertado
    const handleChangeMapLocation=(data)=>{
        setDataNewProperties(prev=>({
            ...prev,
            location : {
                ...prev.location,
                detailedLocation : data
            }
        }))
    }

    // Funcion de cambiar la antiguedad de la propiedad
    const handleChangeAntiquity=(data)=>{   
        setDataNewProperties((prev)=>({
            ...dataNewProperties,
            features : {
                ...prev.features,
                antiquity: {
                    ...prev.features.antiquity,
                    unit : data
                }
            }
        }))
    }   
    // Funcion de cambiar el estados de la propiedad
    const handleChangeStatusPropertie=(data)=>{
        setDataNewProperties({
            ...dataNewProperties,
            status : data
        })
    }
    
    // Funcion de agregar los alrededores a la lista de alrededores
    const handleClickAddSurrounding=()=>{
        setDataNewProperties(prev=>({
            ...dataNewProperties,
            location : {
                ...prev.location,
                surroundings : [...prev.location.surroundings, refInputNearPlaces?.current?.value]
            }
        }))
    }

    // Funcion de guardar los datos de la nueva propiedad
    const handleChangeSaveNewProperty=async(evt)=>{

        if (dataNewProperties?.images?.length <= 0) {
            alert("Debes subir una imagen");
            return;
        }    
        try {
            handleChangeLoading(true);
           
            const urlsImagesProperties = await Promise.all(
                dataNewProperties?.images?.map(async(item)=>{
                    try {
                        const formData = new FormData();
                        formData.append("image", item?.file);

                        const url_images = await UPLOAD_IMAGE(formData);
                        if (!url_images.ok) {
                            console.log(await url_images.json());
                            
                            alert("Surgio un problema al subir una imagen");
                            return
                        }
                        return (await url_images.json())?.url;
                    } catch (error) {
                        console.error(error);
                        
                    }
                })
            )

            const newDataToSave ={
                ...dataNewProperties,
                id_user : dataJSON?.id,
                images : urlsImagesProperties,
                geographicalDetails : {
                    totalArea : dataGeographicalDetail,
                    coveredArea : dataGeographicalCoveredDetail
                }
            }
            console.log(newDataToSave);
            
            const responseCreateProperty = await CREATE_PROPERTY(newDataToSave);
            if (!responseCreateProperty.ok) {
                alert("Hubo un problema al guardar los datos");
                console.log(await responseCreateProperty.json());
                
                handleChangeLoading(false);
                return;
            }
            console.log(await responseCreateProperty.json());
            
            router.push("/admin/dashboard/propiedades");

        } catch (error) {
            
        } finally {
            handleChangeLoading(false)
        }
    }
  return (
    <section className='w-full grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <section className='lg:col-span-2 p-4 rounded-lg'>
            <h1 className='font-bold text-2xl'>Nueva Propiedad</h1>
            <section className='w-full bg-white min-h-24 mt-4 rounded-lg p-4'>
                <h1 className='font-bold text-xl mb-4'>Información del Proyecto</h1>
                <div className='flex flex-row items-center'>
                    <div className='flex-1'>
                        <h1>Nombre del proyecto <span className='text-red-500'>*</span></h1>
                        <Input
                            name="name"
                            value={dataNewProperties?.name}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                    <div className='w-40 ml-2'>
                        <h1>Estado</h1>
                        <div>
                            {
                                loadingDataStatusProject ?
                                <Button
                                    variant="ghost"
                                    className="w-full shadow-sm border border-slate-100"
                                >
                                  <Loader2 className='animate-spin' />  
                                </Button>:
                                <ButtonDropdownStatus
                                    initialData={dataNewProperties?.status}
                                    data={dataStatusProject?.projects}
                                    handleChangeStatus={handleChangeStatusPropertie}
                                />
                            }   
                        </div>
                    </div>
                </div>
                <h1 className='mt-4'>Descripción de la propiedad <span className='text-red-500'>*</span></h1>
                <Textarea
                    name="description"
                    value={dataNewProperties?.description}
                    onChange={handleChangeInput}
                    required
                />

                <div className='mt-4'>
                    <h1>Imagenes de la Propiedad <span className='text-red-500'>*</span></h1>
                    <BoardCarrouselImages
                        dataImages={dataNewProperties}
                        handleChangeImages={setDataNewProperties}
                    />
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl '>Información de área</h1>
                <h1 className='mt-4 font-bold'>Area Total</h1>
                <div className='flex flex-row'>
                    <div className='flex-1'>
                        <h1>Frente <span className='text-red-500'>*</span></h1>
                        <Input
                            name="frontage"
                            value={dataGeographicalDetail?.frontage}
                            onChange={handleChangeGeographicalDetail}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Fondo <span className='text-red-500'>*</span></h1>
                        <Input
                            name="depth"
                            value={dataGeographicalDetail?.depth}
                            onChange={handleChangeGeographicalDetail}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                </div>
                <h1 className='mt-4 font-bold'>Área cubierta</h1>
                <div className='flex flex-row'>
                    <div className='flex-1'>
                        <h1>Frente <span className='text-red-500'>*</span></h1>
                        <Input
                            name="frontage"
                            value={dataGeographicalCoveredDetail?.frontage}
                            onChange={handleChangeGrographicalDetailCovered}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Fondo <span className='text-red-500'>*</span></h1>
                        <Input
                            name="depth"
                            value={dataGeographicalCoveredDetail?.depth}
                            onChange={handleChangeGrographicalDetailCovered}
                            placeholder="00"
                            type="number"
                            required
                        />
                    </div>
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl'>Características generales</h1>
                <section className='w-full grid grid-cols-2 gap-4'>
                    <div className=''>
                        <div className='flex flex-1 items-center justify-between'>
                            <h1><RoomServiceIcon/> Cuartos</h1>
                            <ButtonCounter
                                handleChangeIncreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features : {
                                            ...prev.features,
                                            rooms : prev.features.rooms + 1
                                        }
                                    }))
                                }}
                                handleChangeDecreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features : {
                                            ...prev.features,
                                            rooms : prev.features.rooms - 1
                                        }
                                    }))
                                }}
                            />
                        </div>   
                        <div className='flex flex-1 items-center justify-between mt-4'>
                            <h1><ApartmentIcon/> Pisos</h1>
                            <ButtonCounter
                                handleChangeIncreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features : {
                                            ...prev.features,
                                            floors : prev.features.floors + 1
                                        }
                                    }))
                                }}
                                handleChangeDecreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features : {
                                            ...prev.features,
                                            floors : prev.features.floors - 1
                                        }
                                    }));
                                }}
                            />
                        </div> 
                        <section className='mt-4'>
                        <h1>Antiguedad</h1>
                        <div className='flex flex-row'>
                            <Input
                                type="number"
                                placeholder="Ingresa la cantidad"
                                value={dataNewProperties?.features?.antiquity.quantity}
                                onChange={(evt)=>setDataNewProperties((prev)=>({
                                    ...dataNewProperties,
                                    features : {
                                        ...prev.features,
                                        antiquity : {
                                            ...prev.features.antiquity,
                                            quantity : evt.target.value 
                                        }
                                    }
                                }))}
                            />
                            <ButtonDropdownStatus
                                initialData={dataNewProperties?.features?.antiquity.unit}
                                data={dataAntiquityTimes}
                                className='w-32 ml-2'
                                handleChangeStatus={handleChangeAntiquity}
                            />
                        </div>
                        </section>
                    </div>
                    <div>
                        <div className='flex flex-1 items-center justify-between'>
                            <h1><ShowerIcon/> Baños</h1>
                            <ButtonCounter
                                handleChangeIncreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features  : {
                                            ...prev.features,
                                            bathrooms : prev.features.bathrooms + 1
                                        }
                                    }))
                                }}
                                handleChangeDecreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features : {
                                            ...prev.features,
                                            bathrooms : prev.features.bathrooms - 1
                                        }
                                    }))
                                }}
                            />
                        </div>
                        <div className='flex flex-1 items-center justify-between mt-4'>
                            <h1><GarageIcon/> Garage</h1>
                            <ButtonCounter
                                handleChangeIncreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features : {
                                            ...prev.features,
                                            garage : prev.features.garage + 1
                                        }
                                    }))
                                }}
                                handleChangeDecreaseElement={()=>{
                                    setDataNewProperties((prev)=>({
                                        ...dataNewProperties,
                                        features : {
                                            ...prev.features,
                                            garage : prev.features.garage - 1
                                        }
                                    }))
                                }}
                            />
                        </div>
                    </div>
                </section>
                <SeparatorForms/>
                <h1 className='font-bold text-lg'>Características adicionales</h1>
                <div className='w-full grid grid-cols-2 gap-4 mt-4'>
                    <div className='flex flex-row justify-between'>
                        <h1>Servicio de agua</h1>
                        <Switch
                            checked={dataNewProperties.features.waterService}
                            onCheckedChange={(checked)=>setDataNewProperties((prev)=>({...dataNewProperties, features : {...prev.features, waterService : checked}}))}
                        />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <h1>Servicio de luz</h1>
                        <Switch
                            checked={dataNewProperties.features.lightService}
                            onCheckedChange={(checked)=>setDataNewProperties((prev)=>({...dataNewProperties, features : {...prev.features, lightService : checked}}))}
                        />
                    </div>
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl mt-4'>Información del Precio</h1>
                <div className='flex flex-row mt-4 '>
                    <div className='flex-1'>
                        <h1>Soles (S/.) <span className='text-red-500'>*</span></h1>
                        <Input
                            type="number"
                            name="soles"
                            placeholder="0.0"
                            value={dataNewProperties?.price?.soles}
                            onChange={handleChangePrice}
                        />
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Dólares ($) <span className='text-red-500'>*</span></h1>
                        <Input
                            type="number"
                            name="dolar"
                            placeholder="0.0"
                            value={dataNewProperties?.price?.dolar}
                            onChange={handleChangePrice}
                        />
                    </div>
                </div>
                <SeparatorForms/>
                <h1 className='font-bold text-xl'>Información de la ubicación</h1>
                <h1 className='mt-4 font-bold'>Lugares de referencias <span className='text-red-500'>*</span></h1>
                <p>La información de la ubicación es referencial. No debe ser específico con la dirección</p>
                <div className='mt-4 flex flex-row items-center'>
                    <Input
                        placeholder="Indica a que lugares esta cerca ... "
                        ref={refInputNearPlaces}

                    />
                    <Button
                        className="flex flex-row items-center ml-2"
                        variant="ghost"
                        onClick={handleClickAddSurrounding}
                    >
                        <AddIcon/>
                        <span className=''>Agregar</span>
                    </Button>
                </div>
                {
                    dataNewProperties?.location?.surroundings?.length > 0 &&
                    <div className='mt-4 p-2 bg-gray-100 rounded-sm text-sm'>
                        <h1 className='font-bold text-lg'>Alrededores</h1>
                        <ul className='list-disc pl-4'>
                            {
                                dataNewProperties.location.surroundings.map((item, idx)=><li key={idx}>{item}</li>)
                            }
                        </ul>
                    </div>
                }
                <MapPickerCard
                    circle={true}
                    handleChangeLocation={handleChangeMapLocation}
                />
                <SeparatorForms/>
                <Button
                    variant="ghost"
                    onClick={handleChangeSaveNewProperty}
                    className="bg-orange-400 hover:bg-orange-300 py-4 text-white hover:text-gris w-full"
                >
                    <p>Guardar Propiedad</p>
                </Button>
            </section>
        </section>
        <section className='p-4 rounded-lg'>
            <h1 className='font-bold text-2xl'>Previsualización</h1>
            <CardPropertySimple
                data={dataNewProperties}
            />
            <section className='w-full mt-4 rounded-lg bg-white p-2'>
                <CardShowRealAgent
                    data={dataJSON}
                />
            </section>
        </section>
    </section>
  )
}
