import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'

const Concept = () => {
  return (
    <div className='flex-col space-between  w-full px-10'>
      <section className=' px-24  w-full mt-60 '>
        <div className='flex w-2/4 mx-auto p-4'>
            <div className="border-b-4 border-b-beige w-[341px]" /> 
            <h1 className=' text-beige w-full text-center'>NUESTRA HISTORIA</h1>
            <div className="border-b-4 border-b-beige w-[341px]" /> 
        </div>
        <div className='flex justify-between mt-10'>
        <Image src='/image 37.png' alt='imagen de cata' width={230} height={400} className='object-cover rounded-md'/>
        
        <div className='w-[350px] text-justify flex items-center '>
        <p className='text-secondary '>Renato Pagliano, creador de VinoVivo, tiene 38 años.  Casado y con un hijo, vivió en Almagro toda su vida, dedicándose al rubro desde pequeño por por herencia familiar. 
        Pasó casi toda su vida entre cocina y barra, interactuando con las personas y sus distintos paladares. Hace 5 años decidió estudiar enología para ampliar sus conocimientos vitivinícolas, y descubrió que ésta era su pasión. 
        Hoy tiene su propio emprendimiento gastronómico Vino Vivo donde comercializa los mejores vinos y
        donde realiza catas y maridajes personalizados.
        </p>
        </div>
        <Image src='/image 54.png' alt='imagen de cata' width={230} height={260} className='object-cover rounded-md'/>
        <Image src='/image 68.png' alt='imagen de cata' width={260} height={260} className='object-cover rounded-md'/>
        </div>

      </section>
      <section className=' px-24 py-20 w-full '>
        <div className='flex w-2/4 mx-auto p-4'>
            <div className="border-b-4 border-b-beige w-[341px]" /> 
            <h1 className=' text-beige w-full text-center'>LAS CATAS</h1>
            <div className="border-b-4 border-b-beige w-[341px]" /> 
        </div>
        <div className='flex justify-between mt-10 '>
        <Image src='/cata-explicacion 1.png' alt='imagen de cata' width={260} height={260} className='object-cover rounded-md'/>
        <Image src='/cata-experiencia 1.png' alt='imagen de cata' width={260} height={260} className='object-cover rounded-md'/>
        <Image src='/serviciodecata-y-bodega 1.png' alt='imagen de cata' width={260} height={260} className='object-cover rounded-md'/>
        <Image src='/bodega 2.png' alt='imagen de cata' width={260} height={260} className='object-cover rounded-md'/>
        </div>
      </section>
 
      <section className=' px-24 py-20 w-full '>
       
        <div className='flex items-center justify-evenly mt-10 '>
       
        <Image src='/cata-amigos 1.png' alt='imagen de cata' width={300} height={260} className='object-fill rounded-md '/>
        
        <div className='w-[450px] flex-col  '>
            <div className="border-b-4 border-b-violeta w-full " />
            <p className='text-secondary my-4 text-justify '>'Vení a conocer nuestro espacio que con un estilo vanguardista no pierde la elegancia y 
            privacidad que vos y tus amigos necesitan para vivir esta experiencia única.'
            </p>
            <div className="border-b-4 border-b-violeta w-full" />
            <p className='text-violeta text-xl font-bold my-10 text-center'>¿QUERÉS RESEVAR UNA CATA?</p>
            <Button className='self-center hover:bg-violeta w-full '>CONTACTANOS</Button>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Concept