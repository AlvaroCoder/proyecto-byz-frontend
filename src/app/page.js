import { ButtonLink } from "@/components/Buttons";
import { ImageGrid, ServiceSlider } from "@/components/Cards";

export default function Home() {
  const IMAGE="https://res.cloudinary.com/dabyqnijl/image/upload/v1738772836/b5faz55hpmkhjxtnq1dh.png"
  const listService = [
    {title : "Venta", description : "Ofrecemos venta de : \n Venta de casas \n Venta de Terrenos", image : IMAGE},
    {title : "Alquileres", description : "Ofrecemos venta de : \n Venta de casas \n Venta de Terrenos", image : IMAGE},
    {title : "Saneamiento Fiscal", description : "Ofrecemos venta de : \n Venta de casas \n Venta de Terrenos", image : IMAGE},
    {title : "Diseño arquitectonico", description : "Ofrecemos venta de : \n Venta de casas \n Venta de Terrenos", image : IMAGE},
    {title : "Acondicionamiento y Remodelación", description : "Ofrecemos venta de : \n Venta de casas \n Venta de Terrenos", image : IMAGE},
    {title : "Branding y Página web", description : "Ofrecemos venta de : \n Venta de casas \n Venta de Terrenos", image : IMAGE},

  ]
  return (
    <section className="w-full min-h-screen">      
      <section className="w-full h-screen flex flex-row items-center justify-center gap-5">
        <div className="w-72 mx-4">
          <h1>Grupo ByZ</h1>
          <h1 className="font-bold text-3xl">Tu espacio, tu historia, nuestra especialidad</h1>
          <div className="">
          <ButtonLink className=" mt-4">
            <p>Contactanos</p>
          </ButtonLink>
          </div>
        </div>
        <ImageGrid/>
      </section>
      <section className="w-full h-screen px-8 flex justify-center">
        <section className="w-full max-w-6xl">
          <h1 className="font-bold mb-4 text-lg">Ofrecemos</h1>
          <ServiceSlider data={listService} />
        </section>
      </section>
    </section>
  );
}
