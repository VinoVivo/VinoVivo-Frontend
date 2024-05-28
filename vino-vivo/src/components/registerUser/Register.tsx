"use client";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { PersonalData } from "./PersonalData";
import { AddresData } from "./AddresData";
import { FormSchema, initialData, userData } from "./Data";
import { z } from "zod";
import { Title } from "../Title/Title";

const steps = ["Personal information", "Address information"];

interface Props {
  onSubmit: (data: any) => void;
}

export const Register: FC<Props> = ({ onSubmit }) => {
  const {
    reset,
    handleSubmit,
    trigger,
    getFieldState,
    clearErrors,
    getValues,
    setError,
  } = useFormContext();
  const [step, setStep] = useState<number>(1);

  const [data, setData] = useState(initialData);
  console.log("data", data);

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleNextStep = async () => {
    trigger().then(() => {
      if (step === 1) {
        const firstName = getFieldState("firstName");
        const lastName = getFieldState("lastName");
        const email = getFieldState("email");
        const avatar = getFieldState("avatar");
        const password = getFieldState("password");
        const confirmPassword = getFieldState("confirmPassword");

        const inputs = [
          firstName,
          lastName,
          email,
          avatar,
          password,
          confirmPassword,
        ];

        const hasErrors = inputs.some((input) => input.error);

        if (hasErrors) {
          return;
        }

        const updatedData = {
          ...data,

          firstName: getValues("firstName"),
          lastName: getValues("lastName"),
          email: getValues("email"),
          avatar: getValues("avatar"),
          password: getValues("password"),
          confirmPassword: getValues("confirmPassword"),
        };
        setData(updatedData);
      }
      if (step === 2) {
        const dni = getFieldState("dni");
        const phone = getFieldState("phone");
        const state = getFieldState("state");
        const city = getFieldState("city");
        const address = getFieldState("address");
        const observation = getFieldState("observation");

        const inputs = [dni, phone, state, city, address, observation];

        const hasErrors = inputs.some((input) => input.invalid);
        if (hasErrors) {
          return;
        }
        const updatedData = {
          ...data,
          dni: getValues("dni"),
          phone: getValues("phone"),

          state: getValues("state"),
          city: getValues("city"),
          address: getValues("address"),
          observation: getValues("observation"),
        };
        setData(updatedData);
      }

      setStep(step + 1);
      clearErrors();
    });
  };
  useEffect(() => {
    console.log(data);
  }, [step]);
  return (
    <div className="mt-40 mx-auto">
      <div>
        <div>
          {steps.map((label) => (
            <div key={label}>
              <Title title={label} color="violeta" />
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {step == 1 && <PersonalData />}
            {step == 2 && <AddresData />}
            {step == 3 && <h6>Finalizar registro</h6>}

            <div>
              {step > 1 && (
                <button
                  color="primary"
                  style={{ margin: 2 }}
                  onClick={handlePrevStep}
                >
                  Anterior
                </button>
              )}
              {step <= 2 && (
                <button
                  type="submit"
                  color="primary"
                  style={{ margin: 2 }}
                  onClick={handleNextStep}
                >
                  Siguiente
                </button>
              )}
              {step == 3 && (
                <button type="submit" color="primary" style={{ margin: 2 }}>
                  Enviar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
