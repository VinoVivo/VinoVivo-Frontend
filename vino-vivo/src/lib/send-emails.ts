import { FormValues } from "@/components/contact/form/Data";

export function sendEmail(data: FormValues) {
    const apiEndpoint = '/api/email';
  
    fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
          console.log('email enviado')
      })
      .catch((error) => {
         console.log('el email no se envió')
      });
  }