export const DataContact = () => {
  return (
    <>
      <form className="shadow-lg rounded-md bg-white  p-4">
        <div className="grid grid-rows-4 ">
          <div>
            <label
              aria-details="name"
              className="block text-sm font-semibold leading-6 text-gray-600"
            >
              Name
            </label>
            <input
              type="tel"
              name="name"
              id="name"
              placeholder="Carlos Retamoso"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label
              aria-details="number"
              className="block text-sm font-semibold leading-6 text-gray-600"
            >
              Celular
            </label>
            <input
              type="tel"
              name="number"
              placeholder="54 3 8956452"
              id="number"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label
              aria-details="email"
              className="block text-sm font-semibold leading-6 text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="carlos@gmail.com"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label
              aria-details="message-user"
              className="block text-sm font-semibold leading-6 text-gray-600"
            >
              Message user
            </label>
            <textarea
              name="message-user"
              id="message-user"
              placeholder="Message cliente..."
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
