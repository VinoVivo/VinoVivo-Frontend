import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';



interface ProductCard {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    idVariety: string;
}


const cardProduct = ({product}:{product:ProductCard}) => {
  return (
   <Card>
    <CardHeader>
        <CardTitle>
            {product.name}
        </CardTitle>
       
    </CardHeader>
    <CardContent>
    {product.description}
    </CardContent>
    <CardFooter>
        <Button>
           


           
        </Button>
    </CardFooter>

   </Card>
  )
}

export default cardProduct