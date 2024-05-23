"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSchema, onSubmit } from "./Data";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const DataContact = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      useremail: "",
      message: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadow-lg rounded-md bg-background p-4"
      >
        <div className="grid grid-rows-4 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Nombre
                </FormLabel>
                <FormControl>
                  <input
                    type="tel"
                    {...field}
                    id="name"
                    placeholder="Carlos Retamoso"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usercellphone"
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
                      placeholder="54 9 3456895"
                      id="number"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </FormControl>
                </FormItem>
                <FormMessage className="text-[#700515]" />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="useremail"
            render={({ field }) => (
              <div>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Email
                </FormLabel>
                <FormControl>
                  <input
                    id="usermail"
                    type="usermail"
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
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Dejanos tu mensaje
                </FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    id="message-user"
                    placeholder="Me gustaria..."
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-[#700515]" />
              </FormItem>
            )}
          />
          <div className="mt-6">
            <Button
              type="submit"
              className="border-solid border-violeta bg-violeta border-2 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enviar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
