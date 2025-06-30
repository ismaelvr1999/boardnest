import { Link } from "react-router-dom";
import type { CardProps } from "../boards.types";
import DeleteIcon from "../../../components/icons/deleteIcon";
import EditIcon from "../../../components/icons/editIcon";
const BoardCard = ({ board, handleDelete }: CardProps) => {
  return (
    <div className="border  h-40 p-4 rounded-lg grid grid-rows-[auto_1fr] gap-2 shadow-xl/15 shadow-white">
      <div className="flex">
        <h1 className="text-2xl">{board.name}</h1>
        <button onClick={() => handleDelete(board.id)} className="ml-auto mr-4 border rounded-lg p-1 text-red-300 cursor-pointer hover:text-red-400 hover:scale-105 transform transition-transform duration-200 ease-in-out">
          <DeleteIcon height={30} width={30} />
        </button>
        <Link to={board.id}>
      <button className="border rounded-lg p-1  text-blue-300 cursor-pointer hover:text-blue-400 hover:scale-105 transform transition-transform duration-200 ease-in-out ">
        <EditIcon height={30} width={30} />
      </button>
        </Link>
      </div>
      <div className="overflow-scroll text-[#B5B5B5]">
        <p>{board.description}</p>
      </div>
    </div>
  );
};

export default BoardCard;