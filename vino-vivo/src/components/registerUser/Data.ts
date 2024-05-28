import { z } from "zod";
export type userData = {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  password: string;
  confirmPassword: string;

  dni: string;
  phone: string;
  state: string;
  city: string;
  address: string;
  observation?: string;
};
export const initialData: userData = {
  firstName: "",
  lastName: "",
  avatar: "",
  email: "",
  password: "",
  confirmPassword: "",

  dni: "",
  phone: "",
  state: "",
  city: "",
  address: "",
  observation: "",
};
export const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(3, {
        message: "Nombre debe tener al menos 3 caracteres.",
      })
      .regex(/(^[A-Za-z]{1,10})([ ]{0,1})([A-Za-z]{2,16})/, {
        message: "Ingrese un nombre valido",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Apellido debe tener al menos 3 caracteres.",
      })
      .regex(/(^[A-Za-z]{1,10})/, {
        message: "Ingrese un apellido valido",
      }),
    email: z
      .string()
      .email({
        message: "Ingrese un correo valido",
      })
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: "Ingrese un correo valido.",
      }),
    avatar: z.string().optional(),
    password: z
      .string()
      .min(8, {
        message: "Contraseña debe tener al menos 8.",
      })
      .regex(/^(?=.*\d)(?=.*[A-Za-z])(?=.*[a-zA-Z]).{8,12}$/, {
        message: "Ingrese una contraseña valida de 8 a 12 caracteres",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Contraseña debe tener al menos 8.",
      })
      .regex(/^(?=.*\d)(?=.*[A-Za-z])(?=.*[a-zA-Z]).{8,12}$/, {
        message: "Ingrese una contraseña valida de 8 a 12 caracteres",
      }),
    dni: z
      .string({ message: "Ingrese un dni valido" })
      .regex(/^([0-9])+$/, { message: "Ingrese un dni valido" })
      .min(8, {
        message: "Celular debe tener al menos 8 digitos.",
      }),
    phone: z
      .string({ message: "Ingrese un numero valido" })
      .regex(/^([0-9])+$/, { message: "Ingrese un numero valido" })
      .min(10, {
        message: "Celular debe tener al menos 10 numeros.",
      }),
    state: z
      .string({ message: "Ingrese un numero valido" })
      .regex(/^([0-9])+$/, { message: "Ingrese un numero valido" })
      .min(10, {
        message: "Celular debe tener al menos 10 numeros.",
      }),
    city: z
      .string({ message: "Ingrese un numero valido" })
      .regex(/^([0-9])+$/, { message: "Ingrese un numero valido" })
      .min(10, {
        message: "Celular debe tener al menos 10 numeros.",
      }),
    addres: z
      .string({ message: "Ingrese un numero valido" })
      .regex(/^([0-9])+$/, { message: "Ingrese un numero valido" })
      .min(10, {
        message: "Celular debe tener al menos 10 numeros.",
      }),
    observation: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
