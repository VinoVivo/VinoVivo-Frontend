'use client'
import React, { FC, useState } from 'react'
import Link from 'next/link';
import { ICardProduct } from '@/types/products/products.types';
import DialogeMessage from '../product/register/DialogeMessage';


const CardProduct: FC<ICardProduct> = ({ product, textButton, icon, href, deleteProduct}) => {
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"Success" | "Error" | "Alert">('Alert');
  const [alert, setAlert]=useState(false)
 
  const handelAlert = ()=>{
    setDialogType('Alert');

     setAlert(true)
      setDialogMessage(`¿Seguro quiere eliminar ${product?.name}?`);
 
   
  
    }


  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
     
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div key={product.id} className="bg-card rounded-lg border border-gray-200 p-6 w-full sm:w-64">
      <div className="min-h-[40px] min-w-[40px]  flex justify-end">
        {icon && <button onClick={handelAlert} className='text-2xl text-destructive hover:text-primary '>{icon}</button>}
      </div>
      <Link href={`/detail/${product.id}`}>
        <img src={product.image} alt="no Image" width={200} height={200} className="w-full h-auto transform transition-transform duration-300 hover:scale-105" />
      </Link>
      <div className="flex flex-col items-center mt-2">
        <p className="text-md font-bold text-black h-12 text-center">{product.name}</p>
        <p className="text-sm text-black mt-2">{product.nameVariety}</p>
        <p className="text-md font-semibold text-black">${product.price}</p>
      </div>
      <Link href={`/${href}/${product.id}`}>
      <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-2 py-1.5 px-4 rounded w-full">
        {textButton}
      </button>
      </Link>
      <div className="flex w-20 gap-2">

   <DialogeMessage open={alert}  onOpenChange={setAlert} type={dialogType} message={dialogMessage} textButtonOne="Cancelar" textButtonThree="Eliminar" onClick={handleDelete} styleButton3='bg-destructive hover:bg-violeta   border-2 '/>
   </div>
    </div>
  )
}

export default CardProduct;

