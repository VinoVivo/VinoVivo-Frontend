import { Location } from "@/components/contact/Location";

export const Contact = () => {
  return (
    <main className="mt-40 mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-8  lg:max-w-7xl lg:grid-cols-2 ">
      <div>
        <h2 className="text-fuchsia-900 text-center text-2xl font-semibold">
          Donde estamos
        </h2>
        <Location />
      </div>
      <div>
        <h2 className="text-fuchsia-900 text-center text-2xl font-semibold">
          Contactanos
        </h2>
      </div>
    </main>
  );
};
