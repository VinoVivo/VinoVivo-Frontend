import { Button } from '@/components/ui/button'
import React from 'react'
import { IoLogoInstagram } from "react-icons/io"
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="bg-card border-t-2 border-primary mt-4 py-2">

            
                <div className="flex flex-col justify-center items-center md:flex-row md:justify-evenly md:py-[8px]">

                    <div className="m-2 space-y-2 flex flex-col justify-center items-center sm:col-start-1 sm:col-span-2">
                        <p className="text-secondary text-sm">Vino Vivo @Copyright</p>
                        <p className=" text-secondary text-sm">Desarrollo por Grupo4_DH</p>
                        <p className="text-secondary text-sm">Diseño gráfico por CA</p>
                    </div>

                    <div className="m-2 flex flex-col ">
                        <div className='self-center mb-2 md:self-start'>
                            <h1 className="max-w-lg  text-sm font-semibold tracking-tight text-grisCarbon ">
                                NEWSLETTER
                            </h1>
                        </div>
                        <div className="flex  ">
                            <input id="email"
                                type="text"
                                className="px-2 py-1 border border-grisCarbon  bg-background  rounded-md text-primary text-sm focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-gray-300"
                                placeholder="Ingresá aquí tu email"
                            />

                            <button className='bg-grisCarbon text-xs text-white px-2 active:bg-gray-250 hover:bg-gris rounded-l-none rounded-r-[1px]'>SUSCRIBETE</button>
                        </div>

                        <div className="self-center flex items-center justify-between mt-3">
                            <div className="flex -mx-2">
                           
                                <a href="#" className="mx-2" aria-label="Facebook">
                                 <IoLogoFacebook className='text-grisCarbon text-[30px] hover:text-gris '/>
                                </a>
                                <a href="#" className="mx-2" aria-label="Facebook">
                                 <FaLinkedinIn className='text-grisCarbon text-[30px] hover:text-gris'/>
                                </a>
                                <a href="#" className="mx-2" aria-label="Facebook">
                                 <IoLogoTwitter className='text-grisCarbon text-[30px]  hover:text-gris'/>
                                </a>
                                <a href="#" className="mx-2" aria-label="Github">
                                 <IoLogoInstagram className='text-grisCarbon text-[30px] hover:text-gris' />
                                </a>
                             
                            </div>
                        </div>
                    </div>

                    <div className="m-2 flex flex-col justify-center items-center space-y-2 h-full ">
                        <a href="#" className="text-sm transition-colors duration-300 dark:text-gray-300 hover:underline">Políticas de privacidad</a>
                        <a href="#" className="text-sm transition-colors duration-300 dark:text-gray-300 hover:underline">Términos y condiciones</a>
                        <a href="#" className="text-sm transition-colors duration-300 dark:text-gray-300 hover:underline">Prensa</a>
                    </div>

                </div>

          
        </footer>
    )
}

export default Footer