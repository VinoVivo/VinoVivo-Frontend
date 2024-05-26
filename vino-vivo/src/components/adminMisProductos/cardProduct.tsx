import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';


const CardProduct = ({product}:{product:Product}) => {
   
  return (
   <Card className=' bg-background  rounded-lg border border-gray-200 p-6 w-full sm:w-64'>
    
    <CardContent>
    <Link href={`/product/register`}>
    <Image
    src={product.image} 
    width={200}
      height={200}
      alt="Picture of the author"
      className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
      ></Image>             
    </Link>
     <div className="flex flex-col items-center mt-2">
       <p className="text-md font-bold text-black h-12 text-center">{product.name}</p>
       <p className="text-sm text-black mt-2">{product.idVariety}</p>
       <p className="text-md font-semibold text-black">${product.price}</p>
     </div>
   
    </CardContent>
    <CardFooter>
    <Link href="/product/register" className='w-full'>
        <Button className='hover:bg-violeta font-bold mt-2 py-1.5 px-4 rounded w-full'>
            Editar
        </Button>
    </Link>
    </CardFooter>

   </Card>
  )
}

export default CardProduct