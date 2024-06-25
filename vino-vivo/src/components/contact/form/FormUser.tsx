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
import { FormSchema, FormValues } from "./Data";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { Modal } from "@/components/modal/Modal";
import { sendEmail } from "@/lib/send-emails";

export const DataContact: FC = () => {
  const [isValid, setisValid] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      useremail: "",
      usercellphone: "",
      message: "",
    },
  });

  // async function onSubmit(data: FormValues) {
  //   sendEmail(data)
  //   form.reset();
  //   setisValid(true);
  // }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    sendEmail(data);
    form.reset();
    setisValid(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" p-4">
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
                    type="text"
                    {...field}
                    id="name"
                    maxLength={50}
                    placeholder="Carlos Retamoso"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violetaDos sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs italic" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usercellphone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Celular
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    maxLength={20}
                    placeholder="54 9 3456895"
                    id="number"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violetaDos sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs italic" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="useremail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-semibold leading-6 text-gray-600">
                  Email
                </FormLabel>
                <FormControl>
                  <input
                    id="usermail"
                    type="text"
                    {...field}
                    placeholder="carlos@gmail.com"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violetaDos sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs italic" />
              </FormItem>
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
                    maxLength={300}
                    placeholder="Me gustaria..."
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violetaDos sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs italic" />
              </FormItem>
            )}
          />
          <div className="mt-6">
            <Button
              type="submit"
              className="border-solid border-violeta bg-violeta border-2 block w-full mt-4 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violetaDos hover:text-violeta"
            >
              ENVIAR
            </Button>
          </div>
        </div>
      </form>
      {isValid && (
        <Modal
          setValid={setisValid}
          title="Formulario enviado"
          description="Pronto nos pondremos en contacto!"
          condicion="success"
        />
      )}
    </Form>
  );
};
