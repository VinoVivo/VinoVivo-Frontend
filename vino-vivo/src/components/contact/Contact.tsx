import { Title } from "../Title/Title";
import { Location } from "./Location";
import { DataContact } from "./form/FormUser";

export const Contact = () => {
  return (
    <main className="mt-40 mx-auto">
      <div className="grid grid-cols-1 content-center items-center m-auto w-4/5 gap-x-8 gap-y-16 px-4 py-8  lg:grid-cols-2 ">
        <div className="p-4 border-solid border-2 border-[#5C284E]">
          <h2 className=" text-center text-2xl font-semibold w-full text-[#5C284E]">
            Contactanos
          </h2>
          <DataContact />
        </div>
        <div>
          <Title title="Donde estamos" />
          <Location />
        </div>
      </div>
    </main>
  );
};
