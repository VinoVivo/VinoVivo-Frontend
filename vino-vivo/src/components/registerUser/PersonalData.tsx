"use client";
import React, { useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
export const PersonalData = () => {
  const {
    control,
    setError,
    formState: { errors },
  } = useFormContext();
  const [eye, setEye] = useState(false);

  return (
    <>
      <div className="shadow-lg rounded-md bg-background p-4">
        <div className="grid grid-rows-4 ">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Nombre
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    id="firstName"
                    maxLength={50}
                    placeholder="Carlos"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Apellido
                </FormLabel>
                <FormItem>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      maxLength={20}
                      placeholder="Retamoso"
                      id="lastName"
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
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Email
                </FormLabel>
                <FormControl>
                  <input
                    id="email"
                    type="email"
                    {...field}
                    placeholder="carlos@gmail.com"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={control}
            name="avatar"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Foto
                </FormLabel>
                <FormControl>
                  <input
                    id="avatar"
                    type="file"
                    {...field}
                    placeholder="Elija un avatar"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Password
                </FormLabel>
                <FormControl>
                  <input
                    id="password"
                    type={eye ? "text" : "password"}
                    {...field}
                    placeholder="********"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Confirmar password
                </FormLabel>
                <FormControl>
                  <input
                    id="confirmPassword"
                    type={eye ? "text" : "password"}
                    {...field}
                    placeholder="********"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                {eye ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    onClick={() => setEye(!eye)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    onClick={() => setEye(!eye)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
                {errors.root?.message && <p>{errors.root.message}</p>}
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};
