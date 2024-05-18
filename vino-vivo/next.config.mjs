// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['imagenes-proyecto-vino.s3.amazonaws.com'],
//     },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'imagenes-proyecto-vino.s3.amazonaws.com',
          // Si lo deseas, también puedes especificar el protocolo
          // protocol: 'https'
        }
      ],
    },
  };
  
  export default nextConfig;