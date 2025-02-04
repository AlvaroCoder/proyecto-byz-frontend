import { ButtonLink } from "@/components/Buttons";
import { ImageGrid } from "@/components/Cards";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
      
    </section>
  );
}
