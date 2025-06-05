import { useParams } from "react-router-dom";
import Column from "../features/board/components/column";
import { useEffect, useState } from "react";
import { getBoard } from "../features/board/board.api";
import { toast } from "react-toastify";

const Board = () => {
  const { id } = useParams<string>();
  const [board, setBoard] = useState();
  useEffect(() => {
    if (typeof id === "undefined") return;
    const fetchBoard = async () => {
      const data = await getBoard(id);
      setBoard(data);
    };
    try{
      fetchBoard();
    }catch(error){
      toast.error((error as Error).message);
    }
    
  }, []);
  return (
    <div className="h-full w-full pt-7 grid grid-rows-[auto_1fr]">
      <header className="border-b pb-7 flex items-center">
        <h1 className="text-4xl font-bold">My board</h1>
        <button className="cursor-pointer ml-auto border rounded-lg p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={35}
            height={35}
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
              <path
                fill="currentColor"
                d="M18 4a1 1 0 1 0-2 0v1H4a1 1 0 0 0 0 2h12v1a1 1 0 1 0 2 0V7h2a1 1 0 1 0 0-2h-2zM4 11a1 1 0 1 0 0 2h2v1a1 1 0 1 0 2 0v-1h12a1 1 0 1 0 0-2H8v-1a1 1 0 0 0-2 0v1zm-1 7a1 1 0 0 1 1-1h12v-1a1 1 0 1 1 2 0v1h2a1 1 0 1 1 0 2h-2v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1-1-1"
              ></path>
            </g>
          </svg>
        </button>
      </header>

      <div className="flex gap-4 py-4 h-full overflow-x-auto">
        <Column />
      </div>
    </div>
  );
};

export default Board;
