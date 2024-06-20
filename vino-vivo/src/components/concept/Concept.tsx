import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Title } from '../Title/Title'
import Link from 'next/link'

const imageCarrusel = {
 image: [
"/concepto-img-carrousel_1.png",
"/concepto-img-carrousel_2.png",
"/concepto-img-carrousel_3.png",
"/concepto-img-carrousel_4.png",
"/concepto-img-carrousel_5.png",
"/concepto-img-carrousel_6.png"
]

}

const Concept = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-40 gap-6  '>
      <section className='flex flex-col w-9/12 gap-4  '>
        <Title title='NUESTRA HISTORIA' color='beige'/>
        <div className='w-full '>
         <div className='flex flex-col justify-between items-center  md:flex-row w-full  gap-4 '>
            <Image src='/image 37.png' alt='imagen de cata' width={230} height={400} className='object-cover w-[300px] h-[300px] lg:w-[200px] lg:h-[350px] rounded-md '/>
          
            <div className=' text-justify md:min-w-[250px] max-w-[370px]'>
            <p className='text-secondary text-sm sm:py-10  md:py-0 '>Renato Pagliano, creador de VinoVivo, tiene 38 años.  Casado y con un hijo, vivió en Almagro toda su vida, dedicándose al rubro desde pequeño por por herencia familiar. 
            Pasó casi toda su vida entre cocina y barra, interactuando con las personas y sus distintos paladares. Hace 5 años decidió estudiar enología para ampliar sus conocimientos vitivinícolas, y descubrió que ésta era su pasión. 
            Hoy tiene su propio emprendimiento gastronómico Vino Vivo donde comercializa los mejores vinos y
            donde realiza catas y maridajes personalizados.
            </p>
            </div>
            <Image src='/image 54.png' alt='imagen de cata' width={230} height={260} className='hidden lg:block   lg:w-[200px] lg:h-[350px] object-cover  rounded-md  '/>
            <Image src='/image 68.png' alt='imagen de cata' width={260} height={260} className='hidden lg:block   lg:w-[200px]   lg:h-[350px] object-cover rounded-md '/>
          </div>
        </div>
      </section>
      <section className='w-9/12 mt-10 '>
      <Title title='Las Catas' color='beige'/>
     
      <Carousel className='lg:min-w-[900px] mt-10'>
  <CarouselContent>

    {imageCarrusel.image.map((image, index) => (
      <CarouselItem key={index} className="basis-1/1 md:basis-1/4 sm:basis-1/2">
        <Image src={image} alt='imagen de cata' width={300} height={260} className='object-cover rounded-md'/>
      </CarouselItem>
    ))}
 
  </CarouselContent>
  
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
      
        <div className='flex justify-between'>       
       
        </div>
      </section>
 
      <section className=' px-0 md:px-24 py-10 w-full '>
       
        <div className='flex flex-col-reverse items-center justify-evenly mt-10 m-auto  gap-10 md:flex-row'>
       
        <Image src='/cata-amigos 1.png' alt='imagen de cata' width={300} height={260} className='object-cover min-w-[300px] max-h-[380px] rounded-md '/>
        
        <div className='flex flex-col w-[300px]  '>
            <div className="border-b-4 border-b-violeta w-full " />
            <p className='text-secondary my-4 text-justify text-sm w-full'>'Vení a conocer nuestro espacio que con un estilo vanguardista no pierde la elegancia y 
            privacidad que vos y tus amigos necesitan para vivir esta experiencia única.'
            </p>
            <div className="border-b-4 border-b-violeta w-full" />
            <p className='text-violeta text-md font-bold my-10 text-center'>¿QUERÉS RESEVAR UNA CATA?</p>
            <Link href="/contact">
               <Button className='bg-violeta hover:bg-primary  self-center '>CONTACTANOS</Button>
            </Link>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Concept