import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';




const cardProduct = ({product}:{product:Product}) => {
  return (
   <Card>
    <CardHeader>
        <CardTitle>
            {product.name}
        </CardTitle>
       
    </CardHeader>
    <CardContent>
    {product.image}
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

export default cardProduct