import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'



const Concept = () => {
  return (
    <div className='flex-col space-between  w-full px-5 sm:px-2'>
      <section className=' md:px-16  w-11/12 mt-60 sm:px-1 mx-auto '>
        <div className='flex w-[300px] mx-auto p-4 sm:w-[600px] sm:p-none'>
            <div className="border-b-4 border-b-beige w-[341px] m-0 hidden  sm:flex" /> 
            <h1 className='text-xl text-beige w-full text-center m-0'>NUESTRA HISTORIA</h1>
            <div className="border-b-4 border-b-beige w-[341px] hidden sm:flex" /> 
        </div>
        <div className='flex flex-col justify-center gap-4 items-center mt-10  sm:flex-row max-w-screen'>
          <div className='flex flex-col justify-between items-center gap-4  md:flex-row  '>
        <Image src='/image 37.png' alt='imagen de cata' width={230} height={400} className=' w-[280px] h-[350px] rounded-md '/>
        
        <div className='min-w-60 max-w-[320px] text-justify flex flex-wrap'>
        <p className='text-secondary text-sm sm:py-10 md:py-0'>Renato Pagliano, creador de VinoVivo, tiene 38 años.  Casado y con un hijo, vivió en Almagro toda su vida, dedicándose al rubro desde pequeño por por herencia familiar. 
        Pasó casi toda su vida entre cocina y barra, interactuando con las personas y sus distintos paladares. Hace 5 años decidió estudiar enología para ampliar sus conocimientos vitivinícolas, y descubrió que ésta era su pasión. 
        Hoy tiene su propio emprendimiento gastronómico Vino Vivo donde comercializa los mejores vinos y
        donde realiza catas y maridajes personalizados.
        </p>
        </div>
        </div>
        <div className='hidden justify-between items-center gap-4  lg:flex lg:flex-row  '>
        <Image src='/image 54.png' alt='imagen de cata' width={230} height={260} className='object-cover w-[280px] h-[350px] rounded-md '/>
        <Image src='/image 68.png' alt='imagen de cata' width={260} height={260} className='object-cover w-[280px] h-[350px] rounded-md sm:w-[250px]'/>
        </div>
        </div>

      </section>
      <section className=' flex flex-col flex-wrap md:px-24 py-20 w-full sm:px-1 md:flex-row '>
      <div className='flex w-[300px] mx-auto p-4 sm:w-[600px] sm:p-none'>
            <div className="border-b-4 border-b-beige w-[341px] m-0 sm:hidden md:flex" /> 
            <h1 className='text-xl text-beige w-full text-center m-0'>LAS CATAS</h1>
            <div className="border-b-4 border-b-beige w-[341px] sm:hidden md:flex" /> 
        </div>
          <Carousel className='flex w-11/12 my-10 m-auto gap-4 py-10'>
            <CarouselContent>
              <CarouselItem className="basis-1/1 md:basis-1/4 sm:basis-1/2">
            <Image src='/cata-explicacion 1.png' alt='imagen de cata' width={260} height={260} className='object-cover  rounded-md'/></CarouselItem>
              <CarouselItem className="basis-1/1 md:basis-1/4 sm:basis-1/2">   
              <Image src='/serviciodecata-y-bodega 1.png' alt='imagen de cata' width={260} height={260} className='object-cover  rounded-md'/></CarouselItem>
              <CarouselItem className="basis-1/1 md:basis-1/4 sm:basis-1/2">
                <Image src='/serviciodecata-y-bodega 1.png' alt='imagen de cata' width={260} height={260} className='object-cover  rounded-md'/></CarouselItem>
              <CarouselItem className="basis-1/1 md:basis-1/4 sm:basis-1/2">        
              <Image src='/bodega 2.png' alt='imagen de cata' width={260} height={260} className='object-cover  rounded-md'/></CarouselItem>
              <CarouselItem className="basis-1/1 md:basis-1/4 sm:basis-1/2">
            <Image src='/cata-explicacion 1.png' alt='imagen de cata' width={260} height={260} className='object-cover  rounded-md'/></CarouselItem>
            <CarouselItem className="basis-1/1 md:basis-1/4 sm:basis-1/2">        
              <Image src='/bodega 2.png' alt='imagen de cata' width={260} height={260} className='object-cover  rounded-md'/></CarouselItem>
              <CarouselItem className="basis-1/1 md:basis-1/4 sm:basis-1/2">        
              <Image src='/bodega 2.png' alt='imagen de cata' width={260} height={260} className='object-cover  rounded-md'/></CarouselItem>
            </CarouselContent>
            
               <CarouselPrevious />
                <CarouselNext />
          </Carousel>

           
           
    
      
        <div className='flex justify-between'>
         
        
       
        </div>
      </section>
 
      <section className=' px-0 md:px-24 py-10 w-full '>
       
        <div className='flex flex-col-reverse items-center justify-evenly mt-10 m-auto  gap-10 md:flex-row'>
       
        <Image src='/cata-amigos 1.png' alt='imagen de cata' width={300} height={260} className='object-cover min-w-80 max-w-[350px] rounded-md '/>
        
        <div className='w-[320px] flex-col  '>
            <div className="border-b-4 border-b-violeta w-full " />
            <p className='text-secondary my-4 text-justify w-full'>'Vení a conocer nuestro espacio que con un estilo vanguardista no pierde la elegancia y 
            privacidad que vos y tus amigos necesitan para vivir esta experiencia única.'
            </p>
            <div className="border-b-4 border-b-violeta w-full" />
            <p className='text-violeta text-xl font-bold my-10 text-center'>¿QUERÉS RESEVAR UNA CATA?</p>
            <Button className='bg-violeta hover:bg-primary w-full '>CONTACTANOS</Button>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Concept