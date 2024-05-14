import { Location } from "@/components/contact/Location";
import { DataContact } from "@/components/contact/form/FormUser";

export const Contact = () => {
  return (
    <main className="mt-40 mx-auto">
      <div className="grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-8  lg:max-w-7xl lg:grid-cols-2 ">
        <div>
          <h2 className="text-fuchsia-900 text-center text-2xl font-semibold">
            Contactanos
          </h2>
          <DataContact />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="border-b-4 border-b-beige w-[341px]" />
            <h2
              style={{
                color: "rgba(92, 40, 78, 1)",
              }}
              className=" text-center text-2xl font-semibold w-full text-center"
            >
              Donde estamos
            </h2>

            <div className="border-b-4 border-b-beige w-[341px]" />
          </div>
          <Location />
        </div>
        {/* <img
          src="https://img.freepik.com/free-photo/vertical-shot-glass-red-wine-grapes-table_181624-57960.jpg?t=st=1715634198~exp=1715637798~hmac=5bef9633af8405521f6aa62646237ee3708f750212b746bc0dccc39bdddd01b8&w=360"
          alt=""
          className="aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 sm:none"
        /> */}
      </div>
    </main>
  );
};
