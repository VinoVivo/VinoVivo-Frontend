import { Button } from '@/components/ui/button'
import React from 'react'
import { IoLogoInstagram } from "react-icons/io"
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="bg-card border-t-2 border-primary">

            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 py-7 ">

                    <div className="m-2 space-y-2 flex flex-col justify-center items-center sm:col-start-1 sm:col-span-2">
                        <p className="text-secondary text-sm">Vino Vivo @Copyright</p>
                        <p className=" text-secondary text-sm">Desarrollo por Grupo4_DH</p>
                        <p className="text-secondary text-sm">Diseño gráfico por CA</p>
                    </div>

                    <div className="m-2 sm:col-span-2  flex flex-col ">
                        <div >
                            <h1 className="max-w-lg text-sm font-semibold tracking-tight text-grisCarbon ">
                                NEWSLETTER
                            </h1>
                        </div>
                        <div className="flex flex-col border border-grisCarbon  mt-1 space-y-3 md:space-y-0 md:flex-row">
                            <input id="email"
                                type="text"
                                className="px-2 py-1 bg-background border rounded-md text-primary  focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                                placeholder="Ingresá aquí tu email"
                            />

                            <Button className='bg-grisCarbon active:bg-gray-250 hover:bg-gris w-full rounded-l-none'>SUSCRIBETE</Button>
                        </div>

                        <div className="self-center flex items-center justify-between mt-3">
                            <div className="flex -mx-2">
                           
                                <a href="#" className="mx-2 text-grisCarbon transition-colors duration-300 " aria-label="Facebook">
                                 <IoLogoFacebook className='text-grisCarbon text-[30px]'/>
                                </a>
                                <a href="#" className="mx-2 text-grisCarbon transition-colors duration-300 " aria-label="Facebook">
                                 <FaLinkedinIn className='text-grisCarbon text-[30px]'/>
                                </a>
                                <a href="#" className="mx-2 text-grisCarbon transition-colors duration-300 " aria-label="Facebook">
                                 <IoLogoTwitter className='text-grisCarbon text-[30px]'/>
                                </a>
                                <a href="#" className="mx-2 text-grisCarbon transition-colors duration-300 " aria-label="Github">
                                 <IoLogoInstagram className='text-grisCarbon text-[30px]' />
                                </a>
                             
                            </div>
                        </div>
                    </div>

                    <div className="m-2 flex flex-col justify-center items-center space-y-2 h-full sm:col-start-5 sm:col-span-2">
                        <a href="#" className="text-sm transition-colors duration-300 dark:text-gray-300 hover:underline">Políticas de privacidad</a>
                        <a href="#" className="text-sm transition-colors duration-300 dark:text-gray-300 hover:underline">Términos y condiciones</a>
                        <a href="#" className="text-sm transition-colors duration-300 dark:text-gray-300 hover:underline">Prensa</a>
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default Footer