import Line from "./Line";

const TitleSection = () => {
    return (
        <div className="flex flex-col px-4 pb-0 justify-between place-content-center">
        <div className="flex flex-row justify-between w-full  mb-2">
            <h2 className="text-lg font-semibold">PRODUCTOS</h2>
            <h2 className="text-lg font-semibold">SUBTOTAL</h2>
        </div>
        <Line />
        </div>
    );
};

export default TitleSection;
