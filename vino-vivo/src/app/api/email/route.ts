import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';



export async function POST(request: NextRequest) {
  const { useremail, username, message, usercellphone  } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: 'administracion@vinovivo.work.gd',
    cc: 'vinovivo@gmail.com',
    subject: `Mensaje de ${username} (${useremail})`,
    text: `Este mensaje proviene del formulario de contacto de Vino Vivo\n\nNombre: ${username}\n\nEmail: (${useremail})\n\nTeléfono: ${usercellphone}\n\nMensaje: ${message}` ,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err:any) {
        if (!err) {
           
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email enviado' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}