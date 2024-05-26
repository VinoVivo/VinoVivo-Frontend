import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Image from 'next/image';




const CardProduct = ({product}:{product:Product}) => {
  return (
   <Card>
    <CardHeader>
        <CardTitle>
            {product.name}
        </CardTitle>
       
    </CardHeader>
    <CardContent>
        
    <Image
    src={product.image} 
    width={500}
      height={500}
      alt="Picture of the author"></Image> 
    {product.description}
    </CardContent>
    <CardFooter>
        <Button>
           Editar
        </Button>
    </CardFooter>

   </Card>
  )
}

export default CardProduct