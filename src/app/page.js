'use client'
import { ButtonNaranja } from "@/components/Buttons";
import ButtonNaranjaTwo from "@/components/Buttons/ButtonNaranjaTwo";
import { ProjectCard, ServicesCardDesplegable, ServiceSliderResume } from "@/components/Cards";
import { useState } from "react";

import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FormContactPage } from "@/components/Forms";
import { IMAGES_MAIN_SERVICES } from "@/assets/ImagesServices";
import Image from "next/image";
import { SearchPropertyBanner } from "@/components/Commons";

export default function Home() {
  const IMAGE_BUY_HOUSE = "https://res.cloudinary.com/dabyqnijl/image/upload/v1741813094/ImagesByZ/Icons/uvokqndyyfmtkjq1vpsh.png";
  const IMAGE_RENT_HOUSE= "https://res.cloudinary.com/dabyqnijl/image/upload/v1741813093/ImagesByZ/Icons/ljnnuoym8j8ij0dimgbt.png";
  const IMAGE_SELL_HOUSE="https://res.cloudinary.com/dabyqnijl/image/upload/v1741813432/ImagesByZ/Icons/iflgzxayqhbspwitkyal.png";
  const IMAGE_BANNER="https://res.cloudinary.com/dabyqnijl/image/upload/v1741805665/ImagesByZ/gljjm312uxdaiand8e8h.jpg";

  const listService = [
    {title : "Compra",description : "Encuentra los inmuebles más cerca de ti que están en venta", linkName : "/",  image : IMAGE_BUY_HOUSE},
    {title : "Alquiler", description : "Alquila tu próximo inmueble de una forma fácil y segura", linkName : "/",  image : IMAGE_RENT_HOUSE},
    {title : "Vende con ByZ", description : "Te daremos la mejor oferta del mercado", linkName : "/",  image : IMAGE_SELL_HOUSE},
  ]

  const projectSale = [
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en venta"},
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en venta"},
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en venta"},
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en venta"},
  ];
  const projectRent = [
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo ", department : "Santiago de Surco Lima", type :"Proyecto en renta"},
    {title : "", price : "3,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en renta"},
    {title : "", price : "4,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en renta"},
    {title : "", price : "6,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en renta"},
  ];  
  const projectPreSale = [
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en preventa"},
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en preventa"},
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en preventa"},
    {title : "", price : "3,516,000.00", location : "C. Qerecotillo concepcion 331", department : "Santiago de Surco Lima", type :"Proyecto en preventa"},
  ];
  const itemsProject=[
    {id : 1,nameItem : "En venta", isSelected : true},
    {id : 2,nameItem : "En alquiler", isSelected : false},
    {id : 3,nameItem : "En preventa", isSelected : false}
  ]
  const [itemProject, setItemProject] = useState(itemsProject);
  const [projectData, setProjectData] = useState(
    [{idProject : 1, data : projectSale, isSelected : true},
    {idProject : 2, data : projectRent, isSelected : false},
    {idProject : 3, data : projectPreSale, isSelected : false}]
  );
  const handleChangeItem=(idx)=>{    
    const newDataItems = itemProject.map(item=>{
      if (item.id == idx) {
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
    const newDataProjectData = projectData?.map(item=>{
      if (item?.idProject == idx) {
        return {
          ...item,
          isSelected : true
        }
      }
      return {
        ...item,
        isSelected : false
      }
    })
    setItemProject(newDataItems);
    setProjectData(newDataProjectData);
  }
  
  return (
    <section className="w-full min-h-screen">      
      <section className="w-full bg-gray-200 h-[500px] flex flex-col items-center justify-center relative">
        <div className="absolute w-full h-full inset-0 opacity-50">
          <Image
            src={IMAGE_BANNER}
            alt="Imagen de banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center z-10">
          <h1 className="font-bold text-4xl">Tu espacio, tu historia, nuestra especialidad</h1>
          <SearchPropertyBanner/>
        </div>
      </section>
      <section className="">
        <section className="flex justify-center items-center py-10 ">
          <section className="w-full xl:w-3/4 flex flex-row items-center justify-center  border-gris border-[1px] p-10 rounded-lg">
            <h1 className="font-bold text-4xl mx-4 w-64">Estas vendiendo ?</h1>
            <p className="text-gris mx-4 text-xl w-80">Encuentra la mejor propuesta para la venta de tu propiedad</p>
            <div className="w-60 flex  flex-col items-center justify-center">
              <h1 className="text-xl">Grupo ByZ</h1>
              
              <ButtonNaranja
                className={"text-lg rounded-3xl"}
                text={"Empezar ahora"}
              />
            </div>
          </section>
        </section>
        <section 
          className=" my-8 w-full flex items-center justify-center  py-12 bg-gray-50"
        >
          <section className="w-full xl:w-3/4">
            <h1 className="font-bold text-3xl">Estas listo para tu nuevo inmueble ?</h1>
            <p className="text-lg ">Encuentra tu mejor opción dentro de nuestro catálogo</p>
            <section className="w-full mt-4 flex flex-row items-center justify-between">
              {
                listService?.map((item, idx)=><ServiceSliderResume key={idx} data={item} />)
              }
            </section>
          </section>
        </section>
        <section className="w-full min-h-screen mt-14 flex items-center  justify-center py-4 flex-col ">
          <h1 className="font-bold text-3xl">Nuestros Servicios</h1>
          <p>Desde la concepción hasta la finalización</p>
          <section className="w-full mt-8 flex justify-center">
          <div className="w-full max-w-6xl">
            {
              IMAGES_MAIN_SERVICES?.map((item, idx)=><ServicesCardDesplegable key={idx} data={item}/>)
            }
          </div>
          </section>
        </section>
      </section>
      <section className="h-[600px] mt-8 bg-gris flex flex-row items-center justify-center px-12 overflow-hidden">
        <div className="text-white w-96">
          <h1 className="font-bold text-4xl">Conoces de nuestros proyectos ?</h1>
          <p>Conoce más de nuestros proyectos inmobiliarios que tenemos para ofrecerte</p>
          <ButtonNaranja
            className={"mt-4"}
            text={"Conoce nuestros proyectos"}
          />
        </div>
        <section className="relative flex-1"> 
          <section className="absolute flex-1  h-full ml-8 flex flex-col justify-center ">
              <div className="flex flex-row">
                {
                  itemProject?.map(
                    (item, idx)=>
                    <ButtonNaranjaTwo key={idx} idx={idx} data={item} handleChange={handleChangeItem}/>
                  )
                }
              </div>
              <div className=" flex flex-row items-center mt-4 ">
                <section className="flex flex-row items-center ">
                {
                  projectData?.filter(item=>item.isSelected)[0].data?.map((item, idx)=><ProjectCard key={idx} data={item} />)
                }
                </section>
              </div>
          </section>
        </section>
      </section>
      <section className="min-h-screen flex flex-col justify-center items-center py-12">
        <div className="w-3/4">
          <h1 className="font-bold text-3xl">Ubícanos</h1>
            <div className="w-full bg-slate-200 h-80">
              <iframe 
              className="w-full h-80 mt-4" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" 
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Las Esmeraldas Piura&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe>
            </div>
        </div>
        <section className="flex flex-row justify-evenly w-full  py-14 mt-10">
            <div className="text-gris">
                <div className="flex flex-row items-center  text-2xl">
                  <MapIcon/>
                  <h1 className="font-bold ">Atención en Oficina</h1>
                </div>
                <p>Celular : <span> +51  941 071 285</span></p>
                <p>Horario de atención : 9:00am - 6:00pm</p>
                <p>Email : <span> <a href="mailto:contactenos@grupobyz.com">contactenos@grupobyz.com</a></span></p>
            </div>
            <div className="text-gris">
                <div className="flex flex-row items-center  text-2xl">
                  <LocationOnIcon/>
                  <h1 className="font-bold ">Visitanos</h1>
                </div>
                <p className="w-80">
                Urb. Santa María del Pinar  
                </p>
                <p className="w-80">
                Av. Casuarinas Mz. B Lt. 54
                </p>
            </div>
        </section>
        <section className="border-t-[1px] border-t-gris w-full min-h-screen flex flex-col justify-center items-center" >
            <div className="w-full h-40 flex flex-col justify-center items-center">
              <h1 className="font-bold text-3xl">Contactanos</h1>
              <h2>Empecemos tu diseño juntos, contactanos para poder ponernos en contacto contigo</h2>
            </div>
            <FormContactPage
              
            />
        </section>
      </section>
    </section>
  );
}
