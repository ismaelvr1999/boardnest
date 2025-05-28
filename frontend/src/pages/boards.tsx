export default function Boards() {
  return (
    <>
      <div className="h-full w-full  pt-7 grid grid-rows-[auto_1fr]">
        {/* Add and search */}
        <header className="border-b pb-7 flex items-center">
          <h1 className="text-4xl">My Boards</h1>
          <button className="cursor-pointer ml-auto mr-5 border text-3xl w-10 h-10 rounded-lg text-green-300">
            +
          </button>
          <div className="flex items-center">
            <button className="mr-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                ></path>
              </svg>
            </button>
            <input type="search" className="border rounded-lg p-1 "></input>
          </div>
        </header>
        {/* Cards */}
        <div className="pt-7 overflow-scroll">
          {/* Container */}
          <div className="flex flex-wrap gap-4">

            <div className="border w-sm h-40 p-4 rounded-lg grid grid-rows-[auto_1fr] gap-2">
              <div className="flex">
                <h1 className="text-2xl">Api</h1>
                <button className="ml-auto mr-4 border rounded-lg p-1 text-red-300 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                    ></path>
                  </svg>
                </button>
                <button className="border rounded-lg p-1 text-blue-300 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 19h1.098L16.796 8.302l-1.098-1.098L5 17.902zm-1 1v-2.52L17.18 4.288q.155-.137.34-.212T17.907 4t.39.064q.19.063.35.228l1.067 1.074q.165.159.226.35q.06.19.06.38q0 .204-.068.39q-.069.185-.218.339L6.519 20zM19.02 6.092l-1.112-1.111zm-2.782 1.67l-.54-.558l1.098 1.098z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="overflow-scroll text-[#B5B5B5]">
                <p>Description...</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
