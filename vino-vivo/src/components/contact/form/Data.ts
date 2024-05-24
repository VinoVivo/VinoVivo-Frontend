import { z } from "zod";
export type FormValues = {
  username: string;
  usercellphone: string;
  useremail: string;
  message: string;
};
export const FormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Nombre debe tener al menos 3 caracteres.",
    })
    .regex(/(^[A-Za-z]{1,10})([ ]{0,1})([A-Za-z]{2,16})/, {
      message: "Ingrese un nombre valido",
    }),
  usercellphone: z
    .string({ message: "Ingrese un numero valido" })
    .regex(/^([0-9])+$/, { message: "Ingrese un numero valido" })
    .min(10, {
      message: "Celular debe tener al menos 10 numeros.",
    }),
  useremail: z
    .string()
    .email({
      message: "Ingrese un correo valido",
    })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Ingrese un correo valido.",
    }),
  message: z.string(),
});

export function onSubmit(values: z.infer<typeof FormSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  alert("Ya nos pondremos en contacto");
}
