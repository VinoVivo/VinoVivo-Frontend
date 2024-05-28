"use client";
import { FormSchema, userData } from "@/components/registerUser/Data";
import { Register } from "@/components/registerUser/Register";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export default function RegisterUser() {
  const methods = useForm<userData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  const onSubmit = (values: SubmitHandler<userData>) => {
    console.log(values);
  };
  return (
    <>
      <FormProvider {...methods}>
        <Register onSubmit={onSubmit} />
      </FormProvider>
    </>
  );
}
