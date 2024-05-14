export const Location = () => {
  return (
    <div className="grid grid-cols-1 items-center w-full p-4 sm:grid-cols-2">
      <div
        style={{
          backgroundColor: "rgba(239, 236, 231, 0.95)",
          height: "100%",
          textAlign: "center",
        }}
      >
        <p className="border-t border-b border-black pt-4 pb-4 text-pink-400 text-3xl m-4">
          MA
          <br />
          PA
        </p>
        <p className="mt-2 text-gray-500">
          Av Pres. Manuel Quintana 465
          <br />
          Ciudad Autónoma de Bs.As
          <br />
          Tel: +54 1162458967
        </p>
        <p className="mt-4 text-gray-500">Horarios de atención: 11 a 19hs</p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.6211916138313!2d-58.3894159!3d-34.5884504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaa3678ce617%3A0xa4c5a54e490683b8!2sAv.%20Pres.%20Manuel%20Quintana%20465%2C%20C1129ABA%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1715368753716!5m2!1sen!2sar"
        width="100%"
        height="300" //{450}
        loading="lazy"
      ></iframe>
    </div>
  );
};
