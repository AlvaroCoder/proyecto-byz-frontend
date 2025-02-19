'use client'
import { ButtonLink, ButtonNaranja } from "@/components/Buttons";
import ButtonNaranjaTwo from "@/components/Buttons/ButtonNaranjaTwo";
import { ImageGrid, ProjectCard, ServicesCardDesplegable, ServiceSlider, ServiceSliderResume } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

export default function Home() {
  const IMAGE="https://res.cloudinary.com/dabyqnijl/image/upload/v1738772836/b5faz55hpmkhjxtnq1dh.png";
  const listService = [
    {title : "Compra un inmueble", linkName : "/",  image : IMAGE},
    {title : "Alquileres", linkName : "/",  image : IMAGE},
    {title : "Saneamiento Fiscal", linkName : "/",  image : IMAGE},
  ]
  const services = [
    {title : "Saneamiento Fisico Legal"},
    {title : "Diseño arquitectonico"},
    {title : "Ingeniería y Construcción"},
    {title : "Diseño de Interiores"},
    {title : "Acondicionamiento y Remodelación"},
    {title : "Branding y Página Web"}
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
      <section className="w-full bg-gray-200 h-96 flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl">Tu espacio, tu historia, nuestra especialidad</h1>
        <div className="relative w-1/2 mt-4">
          <Input
            placeholder="Encuentra tu próximo inmueble"
            className="py-5 rounded-3xl bg-white relative text-gris"
          />
         <Button
          variant="ghost"
          className="absolute top-0.5 right-0 h-10 bg-gris rounded-full text-white"
         >
          <SearchIcon/>
         </Button>
        </div>
      </section>
      <section className="px-10">
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
          className=" my-8 w-full flex items-center justify-center  py-4"
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
          <div className="w-full mt-8">
            {
              services?.map((item, idx)=><ServicesCardDesplegable key={idx} data={item}/>)
            }
          </div>
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
      
    </section>
  );
}
