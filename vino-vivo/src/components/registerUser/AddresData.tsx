"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";

export const AddresData = () => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="shadow-lg rounded-md bg-background p-4">
        <div className="grid grid-rows-4 ">
          <FormField
            control={control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Dni
                </FormLabel>
                <FormControl>
                  <input
                    type="tel"
                    {...field}
                    id="dni"
                    maxLength={20}
                    placeholder="44.562.895"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Celular
                </FormLabel>
                <FormItem>
                  <FormControl>
                    <input
                      type="tel"
                      {...field}
                      maxLength={20}
                      placeholder="54 32 65984522"
                      id="phone"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </FormControl>
                </FormItem>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Provincia
                </FormLabel>
                <FormControl>
                  <input
                    id="state"
                    type="text"
                    {...field}
                    placeholder="Provincia"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Ciudad
                </FormLabel>
                <FormControl>
                  <input
                    id="city"
                    type="text"
                    {...field}
                    placeholder="Ciudad"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Domicilio
                </FormLabel>
                <FormControl>
                  <input
                    id="address"
                    type="text"
                    {...field}
                    maxLength={50}
                    placeholder="Calle 123"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={control}
            name="observation"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Observacion
                </FormLabel>
                <FormControl>
                  <input
                    id="observation"
                    type="text"
                    {...field}
                    placeholder="Mensaje del usuario"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
        </div>
      </div>

      {/* </Form> */}
    </>
  );
};
