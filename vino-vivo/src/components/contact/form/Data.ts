import { z } from "zod";

export const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Nombre debe tener al menos 2 caracteres.",
  }),
  usercellphone: z
    .string({ message: "Ingrese un numero valido" })
    .regex(/^([0-9])+$/, { message: "Ingrese un numero valido" })
    .min(10, {
      message: "Celular debe tener al menos 10 numeros.",
    }),
  useremail: z.string().email({
    message: "Ingrese un correo valido",
  }),
  message: z.string(),
});

export function onSubmit(values: z.infer<typeof FormSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  alert("Ya nos pondremos en contacto");
}
